'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import gcpm from '../../img/gcpm.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '@/app/Config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function ProfileList() {
const [fetchError, setFetchError] = useState(null);
const [loading, setLoading] = useState(true);
const [useArticle, setUseArticle] = useState([]);
const [isSignedIn, setIsSignedIn] = useState(false);
const [successMessage, setSuccessMessage] = useState();
const [errorMessage, setErrorMessage] = useState('');
const [coverImageFile, setCoverImageFile] = useState(null);
const [ selectedCollection, setSelectedCollection] = useState("Houses")
const [ isLoading, setIsLoading] = useState(false)
const [articleId, setArticleId] = useState("");  
const [profileData, setProfileData] = useState("");  
const [backgroundImageFile, setBackgroundImageFile] = useState(null);

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
          const profileData = await getUserProfileData(user.uid);
          setUseArticle([...housesData, ...apartmentsData]);
          setProfileData(profileData);
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
      

const getUserProfileData = async (userId) => {
    // Your implementation to fetch user profile data from Firestore
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
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      setIsLoading(true);
      const uniqueArticleId = uuidv4();
      setArticleId(uniqueArticleId);
  
      // Upload files to Firebase Storage if they exist
      const background_image = backgroundImageFile ? await handleFileUpload(backgroundImageFile, `images/${uniqueArticleId}_background_image.jpg`) : null;
  
      const db = getFirestore(); // Initialize Firestore instance
  
      // Update Firestore with the new background image in the existing user document
      await updateDoc(doc(db, 'users', user.uid), {
        backgroundImage: background_image,
      });
  
      // Add a new document to the collection (if needed)
      const docRef = await addDoc(collection(db, 'listings'), {
        articleId: uniqueArticleId,
        userId: user.uid,
        timestamp: new Date(),
        userName: user.displayName,
        userEmail: user.email,
        backgroundImage: background_image,
      });
    } catch (error) {
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
<div style={{  backgroundImage: `url(${profileData.backgroundImage})`,
}}>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="cover_image"
          name="cover_image"
          accept="image/*"
          onChange={handleCoverImageChange}
        />
        <button type="submit">Upload</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>

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
