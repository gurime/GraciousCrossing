'use client'
import { auth } from '@/app/Config/firebase';
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

export default function PropertyForm() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [price, setPrice] = useState("");
  const [billingFrequency, setBillingFrequency] = useState("");
  const [catogory, setCatogory] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [cable, setCable] = useState("");
  const [laundry, setLaundry] = useState("");
  const [lights, setLights] = useState("");
  const [water, setWater] = useState("");
  const [heating, setHeating] = useState("");
  const [airConditioning, setAirConditioning] = useState("");
  const [address, setAddress] = useState("");
  const [authpicFile, setAuthpicFile] = useState(null);
  const [ isLoading, setIsLoading] = useState(false)
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [showcase1File, setShowcase1File] = useState(null);  // Add this line
  const [articleId, setArticleId] = useState("");  // Add this line

  const [comments, setComments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [names, setNames] = useState([]);
  const [autoFocus, setAutoFocus] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const router = useRouter();
  
  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
  const getUserData = async (userId) => {
  try {
  const db = getFirestore();
  const userDocRef = doc(db, 'users', userId);
  const userDocSnapshot = await getDoc(userDocRef);
  if (userDocSnapshot.exists()) {
  const userData = userDocSnapshot.data();
  return userData;
  } else {
  return null;
  }
  } catch (error) {
  throw error;
  }
  };
  setIsSignedIn(!!user);
  if (user) {
  try {
  const userData = await getUserData(user.uid);
  setNames([userData.firstName, userData.lastName]);
  } catch (error) {
  handleError(error);
  } finally {
  setIsLoading(false)
  }
  }
  });
  return () => unsubscribe();
  }, []);
  
  const handleError = (error) => {
  if (error.code === 'network-error') {
  setErrorMessage('Network error: Please check your internet connection.');
  } else if (error.code === 'invalid-content') {
  setErrorMessage('Invalid comment content. Please try again.');
  } else {
  setErrorMessage('Unexpected error occurred. Please try again later.');
  }
  };


  
  const handleCoverImageChange = (e) => {
    // Set the selected cover image file to state
    const file = e.target.files[0];
    setCoverImageFile(file);
  };
  const handleAuthpicChange = (e) => {
    // Set the selected cover image file to state
    const file = e.target.files[0];
    setAuthpicFile(file);
  };

  const handleShowcase1Change = (e) => {
    const file = e.target.files[0];
    setShowcase1File(file);
  };


  
  const storage = getStorage(); // Initialize Firebase Storage

  const handleFileUpload = async (file, storagePath) => {
    try {
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

// Log relevant information for debugging

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      setIsLoading(true);
      const uniqueArticleId = uuidv4();
    setArticleId(uniqueArticleId);
      // Upload files to Firebase Storage if they exist
const cover_image = coverImageFile ? await handleFileUpload(coverImageFile, `images/${uniqueArticleId}_cover_image.jpg`) : null;
const authpic = authpicFile ? await handleFileUpload(authpicFile, `images/${uniqueArticleId}_authpic.jpg`) : null;
const cover_showcase1 = showcase1File ? await handleFileUpload(showcase1File, `images/${uniqueArticleId}_cover_showcase1.jpg`) : null;
      
  
      // Add comment document to Firestore with file URLs
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'propertys'), {
        articleId: articleId,
        userId: user.uid,
        content: content,
        title: title,
        owner: owner,
        price: price,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        billingFrequency: billingFrequency,
        catogory: catogory,
        water: water,
        lights: lights,
        cable: cable,
        laundry: laundry,
        airConditioning: airConditioning,
        heating: heating,
        address: address,
        timestamp: new Date(),
        userName: user.displayName,
        userEmail: user.email,
        authpic: authpic, // Update to use the processed authpic data
        cover_image: cover_image,
        cover_showcase1: cover_showcase1,
        // ... Add other file URLs to your Firestore document ...
      });
  
      router.push('/pages/PropertyListings');
    } catch (error) {
      console.error('Error:', error);
      
      setErrorMessage('Error. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
    await auth.signOut();
    router.push('/pages/Login')
    } catch (error) {
    }
    };
return (
<>
<div className="property-hero">
<form className="postform" onSubmit={handleSubmit}>
{isSignedIn ? (
<div className="commentreg-box">
{names.length === 2 && (
<>
<div className='navinfo-box'><span className="navinfo">{names[0]}</span>
<span className="navinfo">{names[1]}</span></div>
</>
)}
<button
style={{
width: 'auto',
marginBottom: '4px',
}}
type="submit"
onClick={handleLogout}
>
Log out
</button>
</div>
) : (
<div className="commentreg-box">
<button
style={{
backgroundColor: 'blue',
width: 'auto',
margin: '10px',
}}
onClick={() => router.push('/pages/Login')}>
Login
</button>
<button
style={{
margin: '10px',
width: 'auto',
}}
onClick={() => router.push('/pages/Register')}>
Register
</button>
</div>
)}
{/* post form start here here */}
<div style={{display:'flex',placeItems:'center'}}>
  <label htmlFor="title">Title</label>
<input type="text"
name='title'
value={title} 
onChange={(e) => setTitle(e.target.value)}
required
/>
<label htmlFor="owner">Owner</label>
<input type="text"
name='owner'
value={owner} 
onChange={(e) => setOwner(e.target.value)}
required
/>
</div>

<div style={{display:'flex',placeItems:'center'}}>
  <label htmlFor="price">Price</label>
<input
  type="text"
  name="price"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  required
/>
<select
  name="billingFrequency"
  value={billingFrequency}
  onChange={(e) => setBillingFrequency(e.target.value)}
  required
  className='billingselect'
>
  <option value="monthly">Monthly</option>
  <option value="weekly">Weekly</option>
</select>
</div>

<div style={{display:'flex',placeItems:'center'}}>


<label htmlFor="catogory">Catogory</label>
<input
  type="text"
  name="catogory"
  value={catogory}
  onChange={(e) => setCatogory(e.target.value)}
  required
/>
</div>
<div style={{display:'flex',placeItems:'center'}}>


<label htmlFor="bedrooms">Bedrooms</label>
<input
  type="number"
  name="bedrooms"
  value={bedrooms}
  onChange={(e) => setBedrooms(e.target.value)}
  required
/>

<label htmlFor="bathrooms">Bathrooms</label>
<input
  type="number"
  name="bathrooms"
  value={bathrooms}
  onChange={(e) => setBathrooms(e.target.value)}
  required
/>
</div>

<label style={{fontWeight:'600'}} htmlFor="amenities">Amenities</label>

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
  <input
    type="checkbox"
    id="water"
    name="water"
    checked={water}
    onChange={(e) => setWater(e.target.checked)}
  />
  <label htmlFor="water">Water</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
  <input
    type="checkbox"
    id="lights"
    name="lights"
    checked={lights}
    onChange={(e) => setLights(e.target.checked)}
  />
  <label htmlFor="lights">Lights</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
  <input
    type="checkbox"
    id="cable"
    name="cable"
    checked={cable}
    onChange={(e) => setCable(e.target.checked)}
  />
  <label htmlFor="cable">Cable</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
  <input
    type="checkbox"
    id="laundry"
    name="laundry"
    checked={laundry}
    onChange={(e) => setLaundry(e.target.checked)}
  />
  <label htmlFor="laundry">Laundry</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
  <input
    type="checkbox"
    id="airConditioning"
    name="airConditioning"
    checked={airConditioning}
    onChange={(e) => setAirConditioning(e.target.checked)}
  />
  <label htmlFor="airConditioning">AC</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse',margin:'1rem 0', borderBottom:'solid 1px grey'  }}>
  <input
    type="checkbox"
    id="heating"
    name="heating"
    checked={heating}
    onChange={(e) => setHeating(e.target.checked)}
  />
  <label htmlFor="heating">Heating</label>
</div>



<label htmlFor="authpic">Picture</label>
<input
  type="file"
  id="authpic"
  name="authpic"
  accept="image/*"
  onChange={handleAuthpicChange}
/>
<label htmlFor="cover_image">Cover Image</label>
<input
  type="file"
  id="cover_image"
  name="cover_image"
  accept="image/*"
  onChange={handleCoverImageChange}
/>
<label htmlFor="showcase1"></label>
<input
  type="file"
  id="showcase1"
  name="showcase1"
  accept="image/*"
  onChange={handleShowcase1Change}
/>


<div style={{display:'flex',placeItems:'center'}}>
<label htmlFor="catogory">Address</label>
<input
  type="address"
  name="address"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  required
/>
</div>

<textarea
rows="5"
cols="50"
placeholder='Describe you property'
required
value={content}
onChange={(e) => setContent(e.target.value)}
autoFocus={autoFocus}>
</textarea>
<button
type="submit"
disabled={!isSignedIn || !content || isLoading}
style={{
cursor: !isSignedIn || !content || isLoading ? 'not-allowed' : 'pointer',
backgroundColor: !isSignedIn || !content || isLoading ? '#d3d3d3' : '#007bff',
color: !isSignedIn || !content || isLoading ? '#a9a9a9' : '#fff',
}}>
{isLoading ? <BeatLoader color='white' /> : 'Submit'}
</button>
{errorMessage && <p className="error">{errorMessage}</p>}
{successMessage && <p className="success">{successMessage}</p>}
</form>

</div>
</>
)
}
