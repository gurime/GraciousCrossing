'use client'
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { auth } from '../Config/firebase';

export default function EditModalForm({ comment, onSave, onCancel }) {
const [isSignedIn, setIsSignedIn] = useState(false);
const [content, setContent] = useState(comment ? comment.content : "");
const [title, setTitle] = useState(comment ? comment.title : "");
const [owner, setOwner] = useState(comment ? comment.owner : "");
const [price, setPrice] = useState(comment ? comment.price : "");
const [billingFrequency, setBillingFrequency] = useState(comment ? comment.billingFrequency : 'monthly');
const [bedrooms, setBedrooms] = useState(comment ? comment.bedrooms : "1");
const [bathrooms, setBathrooms] = useState(comment ? comment.bathrooms : "1");
const [cable, setCable] = useState(comment ? comment.cable : "");
const [laundry, setLaundry] = useState(comment ? comment.laundry : "");
const [lights, setLights] = useState(comment ? comment.lights : "");
const [water, setWater] = useState(comment ? comment.water : "");
const [heating, setHeating] = useState(comment ? comment.heating : "");
const [pool, setPool] = useState(comment ? comment.pool : "");
const [airConditioning, setAirConditioning] = useState(comment ? comment.airConditioning : "");
const [address, setAddress] = useState(comment ? comment.address : "");
const [isLoading, setIsLoading] = useState(false);
const [coverImageFile, setCoverImageFile] = useState(comment ? null : comment.cover_image);
const [showcase1File, setShowcase1File] = useState(comment ? null : comment.cover_showcase1);
const [showcase2File, setShowcase2File] = useState(comment ? null : comment.cover_showcase2);
const [showcase3File, setShowcase3File] = useState(comment ? null : comment.cover_showcase3);
const [selectedCollection, setSelectedCollection] = useState(comment ? comment.propertyType : "Houses");
const [successMessage, setSuccessMessage] = useState("");
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

const handleCancel = () => {
onCancel(); // Call the onCancel function passed as a prop
};
  

const handleCoverImageChange = (e) => {
const file = e.target.files[0];
// Check if a new file is selected, if not, use the existing image
setCoverImageFile(file ? file : comment.cover_image);
};
  
const handleShowcase1Change = (e) => {
const file = e.target.files[0];
setShowcase1File(file ? file : comment.cover_showcase1);
};
  
const handleShowcase2Change = (e) => {
const file = e.target.files[0];
setShowcase2File(file ? file : comment.cover_showcase2);
};
  
const handleShowcase3Change = (e) => {
const file = e.target.files[0];
setShowcase3File(file ? file : comment.cover_showcase3);
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

// Log relevant information for debugging

const handleSubmit = async (e) => {
e.preventDefault();
try {
      const auth = getAuth();
      const user = auth.currentUser;
      setIsLoading(true);
  
      // Check if it's an update or a new post

      // Check if it's an update or a new post
const isUpdate = !!comment.id;
      // Upload files to Firebase Storage if they exist
const cover_image = coverImageFile ? await handleFileUpload(coverImageFile, `images/${comment.id}_cover_image.jpg`) : null;
const cover_showcase1 = showcase1File ? await handleFileUpload(showcase1File, `images/${comment.id}_cover_showcase1.jpg`) : null;
const cover_showcase2 = showcase2File ? await handleFileUpload(showcase2File, `images/${comment.id}_cover_showcase2.jpg`) : null;
const cover_showcase3 = showcase3File ? await handleFileUpload(showcase3File, `images/${comment.id}_cover_showcase3.jpg`) : null;
  
const db = getFirestore();
if (isUpdate && comment.id && selectedCollection) {
const docRef = doc(db, selectedCollection, comment.id);
await updateDoc(docRef, {
content: content,
title: title,
owner: owner,
price: price,
bedrooms: bedrooms,
bathrooms: bathrooms,
billingFrequency: billingFrequency,
water: water,
lights: lights,
cable: cable,
laundry: laundry,
airConditioning: airConditioning,
heating: heating,
pool: pool,
address: address,
timestamp: new Date(),
cover_image: cover_image,
cover_showcase1: cover_showcase1,
cover_showcase2: cover_showcase2,
cover_showcase3: cover_showcase3,
});
setSuccessMessage('Listing updated successfully');
window.location.reload();
} else {
setErrorMessage('Error: Cannot add a new document without articleId.');
}
} catch (error) {
setErrorMessage('Error updating Listing. Please try again.');
} finally {
setIsLoading(false);
}
};
  
const formatPrice = (input) => {
  const numericValue = input.replace(/[^0-9]/g, '');
  
  // Use the provided regionCode, defaulting to 'en-US'
  const formattedValue = new Intl.NumberFormat(regionCode || 'en-US').format(numericValue);

  // Add the currency symbol based on the region
  const currencySymbol = new Intl.NumberFormat(regionCode || 'en-US', { style: 'currency', currency: 'USD' }).format(0).replace(/[0-9]/g, '').trim();
  
  const priceWithSymbol = `${currencySymbol}${formattedValue}`;
  return priceWithSymbol;
};

const handlePriceChange = (e) => {
  const inputValue = e.target.value;
  const formattedPrice = formatPrice(inputValue);

  // Call the existing setPrice function
  setPrice(formattedPrice);
};
return (
<>
<div style={{position:'relative'}}>
<form   className="postform" onSubmit={handleSubmit} >
{isSignedIn ? (
<div className="commentreg-box">


</div>
) : (
<div className="commentreg-box">

</div>
)}
{/* post form start here here */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', alignItems: 'center' }}>
<label htmlFor="title">Property Name</label>
<input
type="text"
name="title"
value={title}
onChange={(e) => setTitle(e.target.value)}
required/>

<label htmlFor="owner">Owner</label>
<input
type="text"
name="owner"
value={owner}
onChange={(e) => setOwner(e.target.value)}
required
/>

<label htmlFor="price">Price</label>
      <input
        type="text"
        name="price"
        value={price}
        onChange={handlePriceChange}
        required
        autoFocus={autoFocus}
      />

<select
style={{marginLeft:'1px'}}
name="billingFrequency"
value={billingFrequency}
onChange={(e) => setBillingFrequency(e.target.value)}
required
className='billingselect'
>
<option value="monthly">Monthly</option>
<option value="weekly">Weekly</option>
<option value="sale">Sale</option>
</select>

<label htmlFor="selectedCollection">Property Category</label>

<select
name="selectedCollection"
value={selectedCollection}
onChange={(e) => setSelectedCollection(e.target.value)}
required
>  
<option value="Houses">Houses</option>
{/* Add more options as needed */}
</select>

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

<label style={{ fontWeight: '600' }} htmlFor="amenities">Amenities</label>
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

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', margin: '1rem 0'}}>
<input
type="checkbox"
id="heating"
name="heating"
checked={heating}
onChange={(e) => setHeating(e.target.checked)}
/>
<label htmlFor="heating">Heating</label>
</div>
<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', margin: '1rem 0', borderBottom: 'solid 1px grey' }}>
<input
type="checkbox"
id="pool"
name="pool"
checked={pool}
onChange={(e) => setPool(e.target.checked)}
/>
<label htmlFor="pool">Pool</label>
</div>
<label htmlFor="cover_image">This will be your Headline Image</label>
<input
type="file"
id="cover_image"
name="cover_image"
accept="image/*"
onChange={handleCoverImageChange}
/>

<label htmlFor="showcase1">Showcase Image 1</label>
<input
type="file"
id="showcase1"
name="showcase1"
accept="image/*"
onChange={handleShowcase1Change}
/>

<label htmlFor="showcase2">Showcase Image 2</label>
<input
type="file"
id="showcase2"
name="showcase2"
accept="image/*"
onChange={handleShowcase2Change}
/>

<label htmlFor="showcase3">Shocase Image 3</label>
<input
type="file"
id="showcase3"
name="showcase3"
accept="image/*"
onChange={handleShowcase3Change}
/>

<label htmlFor="category">Address</label>
<input
type="address"
name="address"
value={address}
onChange={(e) => setAddress(e.target.value)}
required
/>

<textarea
rows="5"
cols="50"
placeholder='Describe your property'
required
value={content}
onChange={(e) => setContent(e.target.value)}
></textarea>

<button
    type="submit"
   
  >
    {isLoading ? <BeatLoader color='white' /> : 'Update'}
  </button>
<button style={{backgroundColor:'red'}} onClick={handleCancel}>Cancel</button>

</div>
</form>
</div>
</>
)
}
