'use client'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react'
import { auth, db } from '@/app/Config/firebase';

import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';
import AdminEdit from '../AdminEdit/AdminEdit';
import { BeatLoader } from 'react-spinners';


async function getArticles(orderBy) {
const querySnapshot = await getDocs(collection(db, "Featured Apartments"));
const data = [];

querySnapshot.forEach((doc) => {
data.push({ id: doc.id, ...doc.data() });
});
return data;
}


export default function ApartmentListing() {
const [fetchError, setFetchError] = useState(null);
const [loading, setLoading] = useState(true);
const [useArticle, setUseArticle] = useState([]);
const [isSignedIn, setIsSignedIn] = useState(false);
const [comments, setComments] = useState([]);
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState();
const [editModalOpen, setEditModalOpen] = useState(false);
const [editingComment, setEditingComment] = useState(null);

const router = useRouter()
const commentsRef = useRef(null);

const fetchComments = async (articleId) => {
try {
const db = getFirestore();
const commentsRef = collection(db, 'Featured Apartments');
const queryRef = query(commentsRef, where('articleId', '==', articleId),   orderBy('timestamp', 'desc'));
const querySnapshot = await getDocs(queryRef);
const newComments = querySnapshot.docs.map((doc) => {
const commentData = doc.data();
return {id: doc.id,...commentData,timestamp: commentData.timestamp.toDate(),};});
setComments(newComments);
setLoading(false);
} catch (error) {
setErrorMessage('Error fetching Lisitng. Please try again.');
setLoading(false);
}
};

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



const editPost = (postId) => {
const listingToEdit = useArticle.find((listing) => listing.id === postId);
if (!listingToEdit) {
setErrorMessage('Listing not found');
setTimeout(() => {
setErrorMessage('');
}, 3000);
return;
}
const auth = getAuth();
const currentUser = auth.currentUser;
if (!currentUser || currentUser.uid !== listingToEdit.userId) {
setTimeout(() => {
setErrorMessage('');
}, 3000);
return;
}
setEditingComment(listingToEdit);
setEditModalOpen(true);
};


// EditPost stops here

const handleEditModalSave = async (postId, editedContent) => {
try {
await updateComment(postId, editedContent);
setUseArticle((prevArticles) =>
prevArticles.map((article) =>
article.id === postId ? { ...article, content: editedContent } : article
)
);
} catch (error) {
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
};

// updateComment stops here
const deletePost = async (postId, UserId) => {
try {
const auth = getAuth();
const currentUser = auth.currentUser;
const isAuthenticated = await userIsAuthenticated();
if (currentUser) {
if (currentUser.uid === UserId) {
const db = getFirestore();
const commentDoc = await getDoc(doc(db, 'Featured Apartments', postId));
if (commentDoc.exists()) {
await deleteDoc(doc(db, 'Featured Apartments', postId));
setUseArticle((prevArticles) =>prevArticles.filter((article) => article.id !== postId)
);
setSuccessMessage('Listing deleted successfully');
setTimeout(() => {
setSuccessMessage('');
}, 3000);
} else {
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
} else {
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
}
} catch (error) {
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
};
// deletepost stops here






useEffect(() => {
const fetchData = async () => {
try {
const data = await getArticles();
setUseArticle(data);
} catch (error) {
console.error('Error fetching articles:', error);
setFetchError('Error fetching articles. Please try again later.');
} finally {
setLoading(false); 
}
};
  
fetchData();
}, []);
return (
<>

{editModalOpen && (<AdminEdit comment={editingComment} onSave={handleEditModalSave} onCancel={() => setEditModalOpen(false)}/>)}

<div style={{ textAlign: 'center', color: 'blue', fontWeight: '300' }}>
  <h1>Featured Apartments</h1>
</div>

{loading ? (
  <div style={{ textAlign: 'center' }}>
    <BeatLoader color='blue' />
  </div>
) : (
  <div className='property-grid' style={{ borderBottom: 'solid 1px' }}>
    {useArticle.length === 0 ? (
      <p>No listings available.</p>
    ) : (
      useArticle.map((blog) => (
        <Link key={blog.id} href={`/pages/Articles/${blog.id}`}>
          <div ref={commentsRef} className='property-card'>
<div
style={{
backgroundImage: `url(${blog.cover_image})`,
backgroundSize: 'cover',
backgroundPosition: 'center',
height: '0',
paddingTop: '56.25%',
width: '100%'
}}
></div>
<div className='property-details'>
<div className='property-price'>
{blog.price} <small>{blog.billingFrequency}</small>
</div>
<div className='property-type'>
<div className='sm-houlo' style={{fontSize:'13px' }}>{blog.bathrooms}ba | {blog.bedrooms}bds |</div>
<div className='sm-houlo' style={{fontSize:'13px' }}> {blog.square} sqft |</div>

<div className='sm-houlo' style={{fontSize:'13px' }}>{blog.propertyType}</div>

</div>

</div>
<div className='property-address'>{blog.address}</div>
<div className='property-owner_name'>Listing by {blog.owner}</div>
<div className="edit-delBlock">
<button
className="edit-btn"
onClick={(e) => {
e.preventDefault();
editPost(blog.id, blog.userId);
}}
type="button"
>
Edit
</button>
<button
className="delete-btn"
onClick={(e) => {
e.preventDefault();
deletePost(blog.id, blog.userId);
}}
type="button"
>
Delete
</button>
</div>
</div>
        </Link>
      ))
    )}
  </div>
)}






</>
)
}