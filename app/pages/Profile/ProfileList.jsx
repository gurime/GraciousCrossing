'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import gcpm from '../../img/gcpm.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore,  updateDoc } from 'firebase/firestore';
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
const [comments, setComments] = useState([]);
const [selectedCollection, setSelectedCollection] = useState([]);
const [collectionName, setCollectionName] = useState('Houses'); // Initialize with an appropriate default value

const router = useRouter();

const getArticles = async (collectionName, userId) => {
const auth = getAuth();
const user = auth.currentUser;
if (!user) {router.push('/pages/Login')}
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
return null; // or handle the absence of profile data in a different way
}
} catch (error) {
throw error;
}
};

const fetchData = async () => {
  try {
    const user = auth.currentUser;

    if (user) {
      const profileData = await getUserProfileData(user.uid);
      const possibleCollections = ['Houses', 'Apartments'];

      const selectedCollection = profileData?.selectedCollection || possibleCollections;

      const fetchPromises = selectedCollection.map(async (collectionName) => {
        const querySnapshot = await getDocs(collection(getFirestore(), collectionName));
        const articles = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((article) => article.userId === user.uid);

        return articles;
      });

      const articlesArrays = await Promise.all(fetchPromises);
      const articles = articlesArrays.flat();

      setUseArticle(articles);
      setProfileData(profileData);
    } else {
      setUseArticle([]);
    }
  } catch (error) {
    setFetchError('Error fetching data. Please try again later.');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    setIsSignedIn(!!user);
    if (user) {
      fetchData(); // Only one call to fetchData
    } else {
      setUseArticle([]); // User is not authenticated, clear the articles
      setLoading(false);
    }
  });

  return () => {
    unsubscribe();
  };
}, [fetchData]); 

useEffect(() => {
  setComments([]); 
}, [collectionName]);


  const userIsAuthenticated = async () => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        const isAuthenticated = !!user;
        resolve(isAuthenticated);
      }, (error) => {
        reject(error);
      });
    });
  };
  const handleDelete = async (collectionName, articleId, userId) => {
    try {
      const isAuthenticated = await userIsAuthenticated();
  
      if (isAuthenticated) {
        const docRef = doc(getFirestore(), collectionName, articleId);
        console.log('Deleting document:', docRef.path);
        console.log('isAuthenticated:', isAuthenticated);

        // Check if the userId matches before deleting
        const snapshot = await getDoc(docRef);
        console.log('Document exists:', snapshot.exists());
        
        if (snapshot.exists() && snapshot.data().userId === userId) {
          // Continue with deletion
          await deleteDoc(docRef);
          console.log('Document deleted successfully.');
        
          // Update state after deletion
          setUseArticle((prevArticles) =>
            prevArticles.filter((article) => article.id !== articleId)
          );
        } else {
          console.error('Document not found or user does not have permission to delete.');
          setErrorMessage('Error deleting listing. Please try again.');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      } else {
        console.error('User is not authenticated. Unable to delete listing.');
        setErrorMessage('Authentication error. Please log in and try again.');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      setErrorMessage('Error deleting listing. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  const handleEdit = async (collectionName, userId, updatedData) => {
    try {
      const isAuthenticated = await userIsAuthenticated();

      await updateDoc(doc(getFirestore(), collectionName, userId), updatedData);
      setUseArticle((prevArticles) =>
        prevArticles.map((article) => (article.id === userId ? { ...article, ...updatedData } : article))
      );
    } catch (error) {
      console.error('Error editing listing:', error);
      setErrorMessage('Error. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };
     

  
// profile background img
const handleSubmit = async (e) => {
e.preventDefault();
try {
const auth = getAuth();
const user = auth.currentUser;
setIsLoading(true);
const uniqueArticleId = uuidv4();
setArticleId(uniqueArticleId);
const background_image = backgroundImageFile ? await handleFileUpload(backgroundImageFile, `images/${uniqueArticleId}_background_image.jpg`) : null;
const db = getFirestore();
await updateDoc(doc(db, 'users', user.uid), {backgroundImage: background_image,});
setProfileData((prevProfileData) => ({...prevProfileData,backgroundImage: background_image,}));
const docRef = await addDoc(collection(db, 'listings'), {
articleId: uniqueArticleId,
userId: user.uid,
timestamp: new Date(),
userName: user.displayName,
userEmail: user.email,
backgroundImage: background_image,
});
setCoverImageFile(null);
setEditMode(false);} catch (error) {
setErrorMessage('Error. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
} finally {
setIsLoading(false);
}
};


const handleCancel = () => {
setCoverImageFile(null);
setEditMode(false);
};

const handleCoverImageChange = (e) => {
const file = e.target.files[0];
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
// profile background img

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
    {/* Pass the correct postId to handleEdit */}
    <button className='edit-btn' onClick={() => handleEdit(blog.id, blog.userId)}>
      Edit
    </button>

    {/* Pass the correct postId and collectionName to handleDelete */}
    <button className='delete-btn' onClick={() => handleDelete(blog.id, collectionName)}>
      Delete
    </button>
  </div>
)}
    </div>
  ))}
</div>
{editMode && <ModalForm onEdit={handleEdit} />}

</>
);
}
