'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import gcpm from '../../img/gcpm.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { auth } from '@/app/Config/firebase';
import { getAuth } from 'firebase/auth';

export default function ProfileList() {
const [fetchError, setFetchError] = useState(null);
const [loading, setLoading] = useState(true);
const [useArticle, setUseArticle] = useState([]);
const [isSignedIn, setIsSignedIn] = useState(false);
const router = useRouter();

const getArticles = async (collectionName, userId) => {
const auth = getAuth();
const user = auth.currentUser;
console.log('Current user:', user);
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

return (
<>
<div style={{ display: 'grid', placeContent: 'center', placeItems: 'center' }}>
<Image src={gcpm} width={1000} alt='...' />
</div>

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
<button className='edit-btn' onClick={(e) => handleEdit(e, blog.userId)}>Edit</button>
<button className='delete-btn' onClick={(e) => handleDelete(e, blog.userId)}>Delete</button>
</div>
)}
</div>
))}
</div>


</>
);
}
