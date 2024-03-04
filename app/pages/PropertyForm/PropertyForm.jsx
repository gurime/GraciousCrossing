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
const [phone, setPhone] = useState("");
const [price, setPrice] = useState("");
const [billingFrequency, setBillingFrequency] = useState('Monthly');
const [bedrooms, setBedrooms] = useState("1");
const [bathrooms, setBathrooms] = useState("1");
const [cable, setCable] = useState("");
const [laundry, setLaundry] = useState("");
const [lights, setLights] = useState("");
const [water, setWater] = useState("");
const [heating, setHeating] = useState("");
const [pool, setPool] = useState("");
const [wifi, setWifi] = useState("");
const [airConditioning, setAirConditioning] = useState("");
const [address, setAddress] = useState("");
const [ isLoading, setIsLoading] = useState(false)
const [coverImageFile, setCoverImageFile] = useState(null);
const [showcase1File, setShowcase1File] = useState(null);  
const [showcase2File, setShowcase2File] = useState(null);  
const [showcase3File, setShowcase3File] = useState(null);  
const [showcase4File, setShowcase4File] = useState(null);  
const [authpicFile, setAuthPicFile] = useState(null);  
const [articleId, setArticleId] = useState("");  
const [ selectedCollection, setSelectedCollection] = useState("Houses")
const [successMessage, setSuccessMessage] = useState("");

const [names, setNames] = useState([]);
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


  
const handleAuthPicChange = (e) => {
// Set the selected cover image file to state
const file = e.target.files[0];
setAuthPicFile(file);
};
const handleCoverImageChange = (e) => {
// Set the selected cover image file to state
const file = e.target.files[0];
setCoverImageFile(file);
};
  

const handleShowcase1Change = (e) => {
const file = e.target.files[0];
setShowcase1File(file);
};

const handleShowcase2Change = (e) => {
const file = e.target.files[0];
setShowcase2File(file);
};

const handleShowcase3Change = (e) => {
const file = e.target.files[0];
setShowcase3File(file);
};
const handleShowcase4Change = (e) => {
const file = e.target.files[0];
setShowcase4File(file);
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
const uniqueArticleId = uuidv4();
setArticleId(uniqueArticleId);
// Upload files to Firebase Storage if they exist
const authpic = authpicFile ? await handleFileUpload(authpicFile, `images/${uniqueArticleId}_authpic.jpg`) : null;

const cover_image = coverImageFile ? await handleFileUpload(coverImageFile, `images/${uniqueArticleId}_cover_image.jpg`) : null;

const cover_showcase1 = showcase1File ? await handleFileUpload(showcase1File, `images/${uniqueArticleId}_cover_showcase1.jpg`) : null;
      
const cover_showcase2 = showcase2File ? await handleFileUpload(showcase2File, `images/${uniqueArticleId}_cover_showcase2.jpg`) : null;
      
const cover_showcase3 = showcase3File ? await handleFileUpload(showcase3File, `images/${uniqueArticleId}_cover_showcase3.jpg`) : null;

const cover_showcase4 = showcase4File ? await handleFileUpload(showcase4File, `images/${uniqueArticleId}_cover_showcase4.jpg`) : null;

      
  
const db = getFirestore();
const docRef = await addDoc(collection(db, selectedCollection), {
articleId: articleId,
userId: user.uid,
content: content,
title: title,
owner: owner,
phone:phone,
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
wifi: wifi,
address: address,
timestamp: new Date(),
userName: user.displayName,
userEmail: user.email,
authpic: authpic,
cover_image: cover_image,
cover_showcase1: cover_showcase1,
cover_showcase2: cover_showcase2,
cover_showcase3: cover_showcase3,
cover_showcase4: cover_showcase4,
propertyType: selectedCollection,  
});
  
const formattedPageName = selectedCollection.charAt(0).toUpperCase() + selectedCollection.slice(1);
router.push(`/pages/${formattedPageName}`);
} catch (error) {
setErrorMessage('Error. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
} finally {
setIsLoading(false);
}
};

const formatPrice = (input,) => {
const numericValue = input.replace(/[^0-9.]/g, '').trim();
const formattedNumericValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas to the integer part
const priceWithSymbol = `$${formattedNumericValue}`;
return priceWithSymbol;
};
  


const handlePhoneChange = (e) => {
const inputValue = e.target.value;
const formattedPhone = inputValue
.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3').trim().slice(0,12);
setPhone(formattedPhone);
};
  
  
const handlePriceChange = (e) => {
const inputValue = e.target.value;
const formattedPrice = formatPrice(inputValue);
setPrice(formattedPrice);
};

return (
    <>
<div className="property-hero">
<form className="postform" onSubmit={handleSubmit}>
<h1 style={{padding:'0 1rem'}}>Propery Form</h1>
{/* post form start here here */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="title">Property Name</label>
<input
type="text"
name="title"
value={title}
onChange={(e) => setTitle(e.target.value)}
required
/>

<label htmlFor="owner">Owner</label>
<input
type="text"
name="owner"
value={owner}
onChange={(e) => setOwner(e.target.value)}
required
/></div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="authpic">Profile Picture</label>
<input
type="file"
id="authpic"
name="authpic"
accept="image/*"
onChange={handleAuthPicChange}
/>
</div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center',margin: '1rem 0', borderBottom: 'solid 1px'  }}><label htmlFor="number">Phone Number</label>
<input
type="text"
name="number"
value={phone}
onChange={handlePhoneChange}
inputMode="numeric"  
autoComplete="off"   
required
/>

</div>



<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="price">Price</label>
<input
type="text"  // Change the type to text to allow non-numeric characters
name="price"
value={price}
onChange={handlePriceChange}
required
/>
</div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center',margin: '1rem 0', borderBottom: 'solid 1px'  }}><label htmlFor="billingFrequency ">Billing Frequency</label>
<select
style={{marginLeft:'1px'}}
name="billingFrequency"
value={billingFrequency}
onChange={(e) => setBillingFrequency(e.target.value)}
required
className='billingselect'
>
<option value="Monthly">Monthly</option>
<option value="Weekly">Weekly</option>
<option value="Rent">Rent</option>
<option value="For Sale">For Sale</option>
</select></div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="selectedCollection">Property Category</label>

<select
name="selectedCollection"
value={selectedCollection}
onChange={(e) => setSelectedCollection(e.target.value)}
required
>  
<option value="Houses">Houses</option>
<option value="Apartments">Apartments</option>
<option value="NewConstruction">New Construction</option>
<option value="Motel">Motel</option>
</select></div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center',margin: '1rem 0', borderBottom: 'solid 1px'  }}><label htmlFor="bedrooms">Bedrooms</label>
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
/></div>


<div style={{ display: 'grid' }}>

<label style={{ fontWeight: '600' }} htmlFor="amenities">Amenities</label>
<div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-evenly',flexDirection: 'row-reverse' }}>
<input
type="checkbox"
id="water"
name="water"
checked={water}
onChange={(e) => setWater(e.target.checked)}
/>
<label htmlFor="water">Water</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-evenly',flexDirection: 'row-reverse' }}>
<input
type="checkbox"
id="lights"
name="lights"
checked={lights}
onChange={(e) => setLights(e.target.checked)}
/>
<label htmlFor="lights">Lights</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-evenly',flexDirection: 'row-reverse' }}>
<input
type="checkbox"
id="cable"
name="cable"
checked={cable}
onChange={(e) => setCable(e.target.checked)}
/>
<label htmlFor="cable">Cable</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-evenly',flexDirection: 'row-reverse' }}>
<input
type="checkbox"
id="laundry"
name="laundry"
checked={laundry}
onChange={(e) => setLaundry(e.target.checked)}
/>
<label htmlFor="laundry">Laundry</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-evenly',flexDirection: 'row-reverse' }}>
<input
type="checkbox"
id="airConditioning"
name="airConditioning"
checked={airConditioning}
onChange={(e) => setAirConditioning(e.target.checked)}
/>
<label htmlFor="airConditioning">AC</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-evenly',flexDirection: 'row-reverse'}}>
<input
type="checkbox"
id="heating"
name="heating"
checked={heating}
onChange={(e) => setHeating(e.target.checked)}
/>
<label htmlFor="heating">Heating</label>
</div>
<div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-evenly',flexDirection: 'row-reverse'}}>
<input
type="checkbox"
id="pool"
name="pool"
checked={pool}
onChange={(e) => setPool(e.target.checked)}
/>
<label htmlFor="pool">Pool</label>
</div>
<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', justifyContent:'space-evenly',marginBottom: '1rem', borderBottom: 'solid 1px ' }}>
<input
type="checkbox"
id="wifi"
name="wifi"
checked={wifi}
onChange={(e) => setWifi(e.target.checked)}
/>
<label htmlFor="wifi">Wifi</label>
</div>

</div>


<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="cover_image">Featured Image</label>
<input
type="file"
id="cover_image"
name="cover_image"
accept="image/*"
onChange={handleCoverImageChange}
/>
</div>


<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase1">Showcase Image </label>
<input
type="file"
id="showcase1"
name="showcase1"
accept="image/*"
onChange={handleShowcase1Change}
/></div>


<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase2">Showcase Image </label>
<input
type="file"
id="showcase2"
name="showcase2"
accept="image/*"
onChange={handleShowcase2Change}
/></div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase3">Shocase Image </label>
<input
type="file"
id="showcase3"
name="showcase3"
accept="image/*"
onChange={handleShowcase3Change}
/></div>


<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase3">Shocase Image </label>
<input
type="file"
id="showcase4"
name="showcase4"
accept="image/*"
onChange={handleShowcase4Change}
/></div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="category">Address</label>
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
placeholder='Describe your property'
required
value={content}
onChange={(e) => setContent(e.target.value)}

></textarea>

<button
type="submit"
disabled={!isSignedIn || !content || !selectedCollection || isLoading}
style={{
cursor: !isSignedIn || !content || !selectedCollection || isLoading ? 'none' : 'pointer',
backgroundColor: !isSignedIn || !content || !selectedCollection || isLoading ? '#9e9e9e' : '#00a8ff',
color: !isSignedIn || !content || !selectedCollection || isLoading ? 'grey' : '#fff',
}}
  
>
{isLoading ? <BeatLoader color='blue' /> : 'Submit'}
</button>

{errorMessage && <p className="error">{errorMessage}</p>}
{successMessage && <p className="success">{successMessage}</p>}

</form>
</div>
</>
);
}    