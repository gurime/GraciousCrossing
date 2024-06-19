'use client'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react'
import { auth, db } from '@/app/Config/firebase';

import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, updateDoc, where } from 'firebase/firestore';
import EditModalForm from '../EditModalForm';
import { BeatLoader } from 'react-spinners';
import AdminEdit from '../AdminEdit/AdminEdit';
import { IoCloseSharp } from 'react-icons/io5';


async function getArticles(orderBy) {
const querySnapshot = await getDocs(collection(db, "Green Homes"));
const data = [];

querySnapshot.forEach((doc) => {
data.push({ id: doc.id, ...doc.data() });
});
return data;
}


export default function GreenHomeListings() {
const [fetchError, setFetchError] = useState(null);
const [loading, setLoading] = useState(true);
const [useArticle, setUseArticle] = useState([]);
const [isSignedIn, setIsSignedIn] = useState(false);
const [comments, setComments] = useState([]);
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState();
const [editModalOpen, setEditModalOpen] = useState(false);
const [editingComment, setEditingComment] = useState(null);
const [unauthorizedModalOpen, setUnauthorizedModalOpen ] = useState(false)
const [isAdminUser, setIsAdminUser] = useState(false);
const router = useRouter()
const commentsRef = useRef(null);

const fetchComments = async (articleId) => {
try {
const db = getFirestore();
const commentsRef = collection(db, 'Green Homes"');
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
const editPost = async (postId) => {
  const listingToEdit = useArticle.find((listing) => listing.id === postId);
  if (listingToEdit) {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      if (currentUser.uid === listingToEdit.userId) {
        // Check if the user is an admin user
        const adminUserDoc = await getDoc(doc(db, 'adminusers', currentUser.uid));
        const isAdminUser = adminUserDoc.exists();

        setEditingComment(listingToEdit);
        setEditModalOpen(true);
        setIsAdminUser(isAdminUser); // Set the isAdminUser state
      } else {
        // Show modal or error message for unauthorized access
        setUnauthorizedModalOpen(true);
      }
    } else {
      // User is not authenticated
      // Show modal or error message for unauthorized access
      setUnauthorizedModalOpen(true);
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
const commentDoc = await getDoc(doc(db, 'Green Homes"', postId));
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
          setUseArticle(data);
        } catch (error) {
          setFetchError('Error fetching data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
    
      const checkAuthState = async (user) => {
        setIsSignedIn(!!user);
      };
    
      const unsubscribe = auth.onAuthStateChanged(checkAuthState);
    
      fetchData(); // Always fetch the listings
    
      return () => {
        unsubscribe();
      };
    }, [auth]);
return (
<>



<div className='GreenArticleHero'>
<div>
  <h1>ECO Friendly Homes For Sale & Rent</h1>

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
{loading && useArticle.length === 0 && isSignedIn ? (
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
paddingTop: '56.25%', // 16:9 aspect ratio for responsive height
width: '100%'
}}
></div>
<div className='property-details'>
<div className='property-price'>
{blog.apartprice || blog.price} <small>{blog.apartbillingFrequency2 || blog.billingFrequency}</small>
</div>
<div className='property-type'>
<div className='sm-houlo' >
  {blog.bathrooms || blog.apartbathrooms ? `${blog.bathrooms || blog.apartbathrooms}ba` : ''}
  {blog.bathrooms || blog.apartbathrooms ? ' | ' : ''}
  {blog.bedrooms || blog.apartbedrooms ? `${blog.bedrooms || blog.apartbedrooms}bds` : ''}
  {blog.bathrooms || blog.apartbathrooms || blog.bedrooms || blog.apartbedrooms ? ' | ' : ''}
</div>
<div className='sm-houlo' >
  {blog.square || blog.apartsquare ? `${blog.square || blog.apartsquare} sqft  ` : ''}
  {blog.square || blog.apartsquare || blog.square || blog.apartsquare ? ' | ' : ''}

</div>

<div className='sm-houlo' >{blog.propertyType}</div>

</div>

</div>
<address className='property-address'>{blog.address}, {blog.city}, {blog.state[0]}{blog.state.slice(-1)}, {blog.zip}</address>
<address className='property-owner_name'>Listing by {blog.owner}</address>
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


{unauthorizedModalOpen && (
  <div className="modal">
    <div className="modal-content" style={{width:'30%'}}>
      <span className="close" onClick={() => setUnauthorizedModalOpen(false)}>
      <IoCloseSharp style={{cursor:'pointer'}} />

      </span>
      <p>Unable to Edit Post.</p>
    </div>
  </div>
)}
{editModalOpen && (
  isAdminUser ? (
    <AdminEdit
      comment={editingComment}
      onSave={handleEditModalSave}
      onCancel={() => setEditModalOpen(false)}
    />
  ) : (
    <EditModalForm
      comment={editingComment}
      onSave={handleEditModalSave}
      onCancel={() => setEditModalOpen(false)}
    />
  )
)}



</>
)
}