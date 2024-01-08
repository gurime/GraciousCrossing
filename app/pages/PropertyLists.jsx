'use client'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react'
import { auth, db } from '@/app/Config/firebase';

import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, updateDoc, where } from 'firebase/firestore';
import EditModalForm from './EditModalForm';


async function getArticles(orderBy) {
const querySnapshot = await getDocs(collection(db, "Houses"));
const data = [];

querySnapshot.forEach((doc) => {
data.push({ id: doc.id, ...doc.data() });
});
return data;
}


export default function PropertyLists() {
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
const commentsRef = collection(db, 'Houses');
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

const editPost = (postId, userId) => {
  const listingToEdit = useArticle.find((listing) => listing.id === postId);

  if (listingToEdit) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser && currentUser.uid === listingToEdit.userId) {
      setEditingComment(listingToEdit);
      setEditModalOpen(true);
    } else {
      setErrorMessage('Unauthorized to edit this Listing.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  } else {
    setErrorMessage('Listing not found');
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }
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

    setEditModalOpen(false); // Close the modal after updating
  } catch (error) {
    setErrorMessage('Error saving Listing. Please try again.');
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
const commentDoc = await getDoc(doc(db, 'Houses', postId));
if (commentDoc.exists()) {
await deleteDoc(doc(db, 'Houses', postId));
setUseArticle((prevArticles) =>prevArticles.filter((article) => article.id !== postId)
);
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
setErrorMessage('Error deleting Listing. Please try again.');
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
          const user = auth.currentUser; // Retrieve the current user
          // Filter the listings to show only those belonging to the current user
          const userArticles = data.filter(article => article.userId === user.uid);
          // Combine the user's listings with other listings
          const combinedListings = userArticles.concat(data.filter(article => article.userId !== user.uid));
          setUseArticle(combinedListings);
          // Store user's listings separately if needed
          setUserListings(userArticles);
        } catch (error) {
          setFetchError('Error fetching data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
    
      const checkAuthState = async (user) => {
        setIsSignedIn(!!user);
        if (user) {
          fetchData();
        }
      };
    
      const unsubscribe = auth.onAuthStateChanged(checkAuthState);
    
      return () => {
        unsubscribe();
      };
    }, [auth]);
    
  
return (
<>



<div className='PropertyArticleHero'>
<div>
  <h1>Homes For Sale & Rent</h1>

  {!isSignedIn && (
    <p>Please sign in or register to add listings.</p>
  )}

  <button
    onClick={() => router.push('/pages/PropertyForm')}
    disabled={!isSignedIn}
    style={{
      cursor: !isSignedIn ? 'not-allowed' : 'pointer',
      backgroundColor: !isSignedIn ? '#d3d3d3' : '#007bff',
      color: !isSignedIn ? '#a9a9a9' : '#fff',
    }}
  >
    Add a Listing
  </button>
  
</div>

</div>
{editModalOpen && (
  <EditModalForm
    comment={editingComment}
    onSave={handleEditModalSave}
    onCancel={() => setEditModalOpen(false)}
  />
)}

<div className='property-grid'>
{useArticle.map((blog) => (
<Link key={blog.id} href={`/pages/Articles/${blog.id}`}>
<div ref={commentsRef}  className='property-card'>
<img src={blog.cover_image} alt="" className='property-image' />
<div className='property-details'>
<div className='property-price'>${blog.price} <small>{blog.billingFrequency}</small></div>
<div className='property-type'>
<div style={{ marginRight: 'auto' }}>{blog.bathrooms}bds | {blog.bedrooms}ba</div>
<div>{blog.propertyType}</div>
</div>
{/* <p className='property-description'>{blog.content.slice(0, 100)}...</p> */}
</div>
<div className='property-address'>{blog.address}</div>

<div className='property-owner_name'>Listing by {blog.userName}</div>
<div className="edit-delBlock">
  <button className="edit-btn" onClick={(e) => { e.preventDefault(); editPost(blog.id, blog.userId); }} type="button">
    Edit
  </button>
  <button className="delete-btn" onClick={(e) => { e.preventDefault(); deletePost(blog.id, blog.userId); }} type="button">
    Delete
  </button>
</div>
{errorMessage && <p className="error">{errorMessage}</p>}
{successMessage && <p className="success">{successMessage}</p>}
</div>
</Link>
))}

</div>



</>
)
}