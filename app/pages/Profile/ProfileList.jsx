'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import gcpm from '../../img/gcpm.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '@/app/Config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import cbg_camera from '../../img/camera_icon.png'
import ModalForm from './ModalForm';
export default function ProfileList() {
const [fetchError, setFetchError] = useState(null);
const [loading, setLoading] = useState(true);
const [useArticle, setUseArticle] = useState([]);
const [isSignedIn, setIsSignedIn] = useState(false);
const [successMessage, setSuccessMessage] = useState();
const [errorMessage, setErrorMessage] = useState('');
const [coverImageFile, setCoverImageFile] = useState(null);
const [ isLoading, setIsLoading] = useState(false)
const [articleId, setArticleId] = useState("");  
const [profileData, setProfileData] = useState("");  
const [backgroundImageFile, setBackgroundImageFile] = useState(null);
const [editMode, setEditMode] = useState(false);
const [editModalOpen, setEditModalOpen] = useState(false);
const [editingComment, setEditingComment] = useState(null);
const [comments, setComments] = useState([]);
const [selectedCollection, setSelectedCollection] = useState([]);
const [collectionName, setCollectionName] = useState(''); // Initialize with an appropriate default value

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
const getUserProfileData = async (userId) => {
  try {
    const docSnapshot = await getDoc(doc(db, 'users', userId));
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      console.error('User profile not found for user ID:', userId);
      return null; // or handle the absence of profile data in a different way
    }
  } catch (error) {
    console.error('Error fetching user profile data:', error);
    throw error;
  }
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const profileData = await getUserProfileData(user.uid);

        // Define an array of possible collections
        const possibleCollections = ['Houses', 'Apartments'];

        // Dynamically fetch articles based on the selected collection or use all collections
        const selectedCollection = profileData?.selectedCollection || possibleCollections;
        const userSelectedCollection = profileData?.selectedCollection || possibleCollections;

        // Set the selected collection in the state
        setSelectedCollection(userSelectedCollection);
        setSelectedCollection(userSelectedCollection);
        setCollectionName(userSelectedCollection[0]);
        // Fetch data from all selected collections
        const fetchPromises = selectedCollection.map(async (collectionName) => {
          const querySnapshot = await getDocs(collection(getFirestore(), collectionName));
          const articles = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((article) => article.userId === user.uid); // Compare with user's UID
        
          return articles;
        });

        // Wait for all fetch operations to complete
        const articlesArrays = await Promise.all(fetchPromises);

        // Flatten the array of arrays into a single array of articles
        const articles = articlesArrays.flat();

        setUseArticle(articles);
        setProfileData(profileData);
      } else {
        setUseArticle([]); // User is not authenticated, clear the articles
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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
const handleEdit = (userId, comments, collectionName) => {
  const commentToEdit = comments.find((comment) => comment.id === userId);
  if (commentToEdit) {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.uid === commentToEdit.userId) {
      setEditingComment(commentToEdit);
      setEditModalOpen(true);
    } else {
      setErrorMessage('Unauthorized to edit this listing.');
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
  const handleEditModalSave = async (userId, editedContent, collectionName) => {
    try {
      console.log('Before updateComment:', userId, editedContent, collectionName);
      await updateComment(userId, editedContent, collectionName);
      console.log('After updateComment:', userId, editedContent, collectionName);
      setEditModalOpen(false);
      return true;
    } catch (error) {
      console.error('Error during update:', error);
      console.error('Error details:', error.message); // Log the error message
      setErrorMessage('Error updating listing. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return false;
    }
  };
  
  
  
  // handleEditModalSave stops here
  
  const handleEditModalCancel = () => {
  setEditModalOpen(false);
  };





  // handleEditModalCancel stops here
  const updateComment = async (userId, editedContent, collectionName) => {
    try {
      console.log('Before Firestore update:', postId, editedContent, collectionName);
  
      const db = getFirestore();
      const commentRef = doc(db, collectionName, userId); // Assuming postId is the document ID
      await updateDoc(commentRef, editedContent);
  
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === userId ? { ...comment, ...editedContent } : comment
        )
      );
  
      setSuccessMessage('Listing updated successfully');
  
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrorMessage('Error updating Listing. Please try again.');
  
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };
  
  

const handleDelete = async (collectionName, userId) => {
try {
const auth = getAuth();
const currentUser = auth.currentUser;
const isAuthenticated = await userIsAuthenticated();
      
if (currentUser) {
if (currentUser.uid === userId) {
const db = getFirestore();
const commentDoc = await getDoc(doc(db, collectionName, userId));
if (commentDoc.exists()) {
await deleteDoc(doc(db, collectionName, userId));
// Update the state to remove the deleted article
setUseArticle((prevArticles) => prevArticles.filter((article) => article.id !== userId));
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
      
const handleCancel = () => {
  // Reset any changes made in edit mode
  setCoverImageFile(null);
  setEditMode(false);
};

const handleCoverImageChange = (e) => {
  const file = e.target.files[0];
  console.log('Selected file:', file); // Add this line for debugging
  setCoverImageFile(file);
  setBackgroundImageFile(file); // Initialize the backgroundImageFile
};

  const storage = getStorage(); // Initialize Firebase Storage

const handleFileUpload = async (file, storagePath) => {
  try {
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};
















const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    setIsLoading(true);
    const uniqueArticleId = uuidv4();
    setArticleId(uniqueArticleId);

    // Upload files to Firebase Storage if they exist
    const background_image = backgroundImageFile
      ? await handleFileUpload(backgroundImageFile, `images/${uniqueArticleId}_background_image.jpg`)
      : null;

    console.log('Uploaded background image:', background_image);

    const db = getFirestore();

    // Update Firestore with the new background image in the existing user document
    await updateDoc(doc(db, 'users', user.uid), {
      backgroundImage: background_image,
    });

    // Set the new background image in the local state
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      backgroundImage: background_image,
    }));

    // Add a new document to the collection (if needed)
    const docRef = await addDoc(collection(db, 'listings'), {
      articleId: uniqueArticleId,
      userId: user.uid,
      timestamp: new Date(),
      userName: user.displayName,
      userEmail: user.email,
      backgroundImage: background_image,
    });

    // Reset the state after a successful upload
    setCoverImageFile(null);
    setEditMode(false);
  } catch (error) {
    console.error('Error during handleSubmit:', error);
    setErrorMessage('Error. Please try again.');
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  } finally {
    setIsLoading(false);
  }
};
  

return (
<>
<div style={{position:'relative',marginBottom:'1rem'}}>
{profileData && (
<div
style={{ 
display: 'flex',
justifyContent: 'flex-end',
backgroundImage: `url(${profileData.backgroundImage})`,
height:'400px',
backgroundPosition:'center',
backgroundSize:'cover',
}}>
<form style={{
position: 'absolute',
top: '264px',
}} onSubmit={handleSubmit}>
<button
className='ApartmentArticleHero-button'
onClick={() => router.push('/pages/PropertyForm')}
disabled={!isSignedIn}
style={{
cursor: !isSignedIn ? 'not-allowed' : 'pointer',
backgroundColor: !isSignedIn ? '#d3d3d3' : '#007bff',
color: !isSignedIn ? '#a9a9a9' : '#fff',
margin:'5px 0'
}}>Add a Listing
</button>  <label htmlFor="cover_image" className="camera-icon-label" style={{ cursor: 'pointer' }} onClick={() => setEditMode(true)}>
<input
type="file"
id="cover_image"
name="cover_image"
accept="image/*"
onChange={handleCoverImageChange}
style={{ display: 'none' }} />

<Image src={cbg_camera} alt='...'/>
{editMode ? 'Upload' : 'Edit Cover Image'}
</label>

{editMode && (
<>
<button style={{ marginLeft: '165px' }} className='edit-btn' type="submit">Upload</button>
<button className='edit-btn' onClick={handleCancel} type="button">Cancel</button>
</>
)}
</form>
{errorMessage && <div>{errorMessage}</div>}
 </div>
)}
{!profileData && <p>Loading...</p>}
</div>


<div className='profile'>
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
          {/* <p className='property-description'>{blog.content.slice(0, 100)}...</p> */}
        </div>
        <div className='property-address'>{blog.address}</div>
        <div className='property-owner_name'>Listing by {blog.userName}</div>
      </Link>
      {blog.userId === auth.currentUser?.uid && (
        <div className="edit-delBlock">
          {/* Corrected onClick for ModalForm */}
          <button className='edit-btn' onClick={() => handleEdit(blog.id, blog.userId, useArticle)}>
  Edit
</button>
          <button className='delete-btn' onClick={() => handleDelete( blog.id, blog.userId)}>Delete</button>
        </div>
      )}
    </div>
  ))}
</div>
{editModalOpen && (
  <ModalForm
    comment={editingComment}
    onSave={(postId, editedContent) => handleEditModalSave(postId, editedContent, collectionName)}
    onCancel={handleEditModalCancel}
  />
)}


</>
);
}
