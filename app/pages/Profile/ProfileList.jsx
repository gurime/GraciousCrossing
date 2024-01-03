'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import gcpm from '../../img/gcpm.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { auth } from '@/app/Config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function ProfileList() {
const [fetchError, setFetchError] = useState(null);
const [loading, setLoading] = useState(true);
const [useArticle, setUseArticle] = useState([]);
const [isSignedIn, setIsSignedIn] = useState(false);
const [successMessage, setSuccessMessage] = useState();
const [errorMessage, setErrorMessage] = useState('');

const router = useRouter();

const getArticles = async (collectionName, userId) => {
const auth = getAuth();
const user = auth.currentUser;
if (!user) {
router.push('/pages/Login')
}
  
const querySnapshot = await getDocs(collection(getFirestore(), collectionName));
const data = querySnapshot.docs
.map((doc) => ({ id: doc.id, ...doc.data() }))
.filter((property) => property.userId === userId);
return data;
};
  
useEffect(() => {
const fetchData = async () => {
try {
const user = auth.currentUser;
if (user) {
const housesData = await getArticles('Houses', user.uid);
const apartmentsData = await getArticles('Apartments', user.uid);
setUseArticle([...housesData, ...apartmentsData]);
} else {
setUseArticle([]); // User is not authenticated, clear the articles
}
} catch (error) {
setFetchError('Error fetching data. Please try again later.');
} finally {
setLoading(false);
}
};

const unsubscribe = auth.onAuthStateChanged(async (user) => {
setIsSignedIn(!!user);
fetchData();
});

return () => {
unsubscribe();
};
}, []);

const userIsAuthenticated = async () => {
return new Promise((resolve) => {
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
const isAuthenticated = !!user;
resolve(isAuthenticated);
});
});
};
// userIsAuthenticated stops here

const handleDelete = async (collectionName, postId, userId) => {
try {
const auth = getAuth();
const currentUser = auth.currentUser;
const isAuthenticated = await userIsAuthenticated();
      
if (currentUser) {
if (currentUser.uid === userId) {
const db = getFirestore();
const commentDoc = await getDoc(doc(db, collectionName, postId));
if (commentDoc.exists()) {
await deleteDoc(doc(db, collectionName, postId));
// Update the state to remove the deleted article
setUseArticle((prevArticles) => prevArticles.filter((article) => article.id !== postId));
setSuccessMessage('Listing deleted successfully');
setTimeout(() => {
setSuccessMessage('');
}, 3000);
} else {
setErrorMessage('Listing not found');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
} else {
setErrorMessage('Unauthorized to delete this Listing.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
}
} catch (error) {
console.error('Error deleting Listing:', error);
setErrorMessage('Error deleting Listing. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
};
      


return (
<>
<div className='profile' style={{ display: 'grid', placeContent: 'center', placeItems: 'center' }}>
<Image src={gcpm} width={1000} alt='...' />
</div>
{errorMessage && errorMessage}
{successMessage && successMessage}
<div className='property-grid'>
{useArticle.map((blog) => (
<div className='property-card' key={blog.id}>
<Link href={`/pages/Articles/${blog.id}`}>
<img src={blog.cover_image} alt='' className='property-image' />
<div className='property-details'>
<div className='property-price'>
${blog.price} <small>{blog.billingFrequency}</small>
</div>
<div className='property-type'>
<div style={{ marginRight: 'auto' }}>{blog.bathrooms}bds | {blog.bedrooms}ba</div>
<div>{blog.propertyType}</div>
</div>
<p className='property-description'>{blog.content.slice(0, 100)}...</p>
</div>
<div className='property-address'>{blog.address}</div>
<div className='property-owner_name'>Listing by {blog.userName}</div>
</Link>
{blog.userId === auth.currentUser?.uid && (
  <div className="edit-delBlock">
    <button className='edit-btn' onClick={(e) => handleEdit(e, blog.id, blog.userId)}>Edit</button>
    <button className='delete-btn' onClick={() => handleDelete('Houses', blog.id, blog.userId)}>Delete</button>
  </div>
)}
</div>
))}
</div>


</>
);
}
