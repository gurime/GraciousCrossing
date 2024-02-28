'use client'
import { auth } from '@/app/Config/firebase';
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

export default function AdminForm() {
const [isSignedIn, setIsSignedIn] = useState(false);
const [content, setContent] = useState("");
const [title, setTitle] = useState("");
const [owner, setOwner] = useState("");
const [phone, setPhone] = useState("");
const [price, setPrice] = useState("");
const [tourTime, setTourTime] = useState("");
const [priceextra, setPriceextra] = useState("");
const [billingFrequency, setBillingFrequency] = useState('Monthly');
const [billingFrequency2, setBillingFrequency2] = useState('Monthly');
const [bedrooms, setBedrooms] = useState("1");
const [bathrooms, setBathrooms] = useState("1");
const [square, setSquare] = useState( "");

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
const [showcase5File, setShowcase5File] = useState(null);  
const [showcase6File, setShowcase6File] = useState(null);  
const [showcase7File, setShowcase7File] = useState(null);  
const [showcase8File, setShowcase8File] = useState(null);  
const [showcase9File, setShowcase9File] = useState(null);  
const [showcase10File, setShowcase10File] = useState(null   );   
const [showcase11File, setShowcase11File] = useState(null   );   
const [showcase12File, setShowcase12File] = useState(null   );   
const [authpicFile, setAuthPicFile] = useState(null);  
const [articleId, setArticleId] = useState("");  
const [ selectedCollection, setSelectedCollection] = useState("Featured Houses")
const [successMessage, setSuccessMessage] = useState("");

const [names, setNames] = useState([]);
const [errorMessage, setErrorMessage] = useState('');
const router = useRouter();
  
useEffect(() => {
const unsubscribe = auth.onAuthStateChanged(async (user) => {
const getUserData = async (userId) => {
try {
const db = getFirestore();
const userDocRef = doc(db, 'adminusers', userId);
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
const handleShowcase5Change = (e) => {
const file = e.target.files[0];
setShowcase5File(file);
};
const handleShowcase6Change = (e) => {
const file = e.target.files[0];
setShowcase6File(file);
};
const handleShowcase7Change = (e) => {
const file = e.target.files[0];
setShowcase7File(file);
};
const handleShowcase8Change = (e) => {
const file = e.target.files[0];
setShowcase8File(file);
};
const handleShowcase9Change = (e) => {
const file = e.target.files[0];
setShowcase9File(file);
};

const handleShowcase10Change = (e) => {
  const file = e.target.files[0];
  setShowcase10File(file);
  };
  const handleShowcase11Change = (e) => {
  const file = e.target.files[0];
  setShowcase11File(file);
  };
  const handleShowcase12Change = (e) => {
  const file = e.target.files[0];
  setShowcase12File(file);
  };
  
const storage = getStorage(); // Initialize Firebase Storage
const handleFileUpload = async (file, storagePath) => {
try {
const storageRef = ref(storage, storagePath);
await uploadBytesResumable(storageRef, file);
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
const authpic = authpicFile ? await handleFileUpload(authpicFile, `images/${uniqueArticleId}authpic.jpg`, uniqueArticleId) : null;


const cover_image = coverImageFile ? await handleFileUpload(coverImageFile, `images/${uniqueArticleId}cover_image.jpg`) : null;

const cover_showcase1 = showcase1File ? await handleFileUpload(showcase1File, `images/${uniqueArticleId}cover_showcase1.jpg`) : null;
const cover_showcase2 = showcase2File ? await handleFileUpload(showcase2File, `images/${uniqueArticleId}cover_showcase2.jpg`) : null;
const cover_showcase3 = showcase3File ? await handleFileUpload(showcase3File, `images/${uniqueArticleId}cover_showcase3.jpg`) : null;
const cover_showcase4 = showcase4File ? await handleFileUpload(showcase4File, `images/${uniqueArticleId}cover_showcase4.jpg`) : null; 
const cover_showcase5 = showcase5File ? await handleFileUpload(showcase5File, `images/${uniqueArticleId}cover_showcase5.jpg`) : null;
const cover_showcase6 = showcase6File ? await handleFileUpload(showcase6File, `images/${uniqueArticleId}cover_showcase6.jpg`) : null;
const cover_showcase7 = showcase7File ? await handleFileUpload(showcase7File, `images/${uniqueArticleId}cover_showcase7.jpg`) : null;
const cover_showcase8 = showcase8File ? await handleFileUpload(showcase8File, `images/${uniqueArticleId}cover_showcase8.jpg`) : null;
const cover_showcase9 = showcase9File ? await handleFileUpload(showcase9File, `images/${uniqueArticleId}cover_showcase9.jpg`) : null;
const cover_showcase10 = showcase10File ? await handleFileUpload(showcase10File, `images/${uniqueArticleId}cover_showcase10.jpg`) : null;
const cover_showcase11 = showcase11File ? await handleFileUpload(showcase11File, `images/${uniqueArticleId}cover_showcase11.jpg`) : null;
const cover_showcase12 = showcase12File ? await handleFileUpload(showcase12File, `images/${uniqueArticleId}cover_showcase12.jpg`) : null;

      
  
const db = getFirestore();
const docRef = await addDoc(collection(db, selectedCollection), {
userId: user.uid,
content: content,
title: title,
owner: owner,
phone:phone,
price: price,
priceextra: priceextra,
bedrooms: bedrooms,
bathrooms: bathrooms,
square: square,
billingFrequency: billingFrequency,
billingFrequency2: billingFrequency2,
water: water,
lights: lights,
cable: cable,
laundry: laundry,
airConditioning: airConditioning,
heating: heating,
pool: pool,
wifi: wifi,
address: address,
tourTime: tourTime,
timestamp: new Date(),
userEmail: user.email,
authpic: authpic,
cover_image: cover_image,
cover_showcase1: cover_showcase1,
cover_showcase2: cover_showcase2,
cover_showcase3: cover_showcase3,
cover_showcase4: cover_showcase4,
cover_showcase5: cover_showcase5,
cover_showcase6: cover_showcase6,
cover_showcase7: cover_showcase7,
cover_showcase8: cover_showcase8,
cover_showcase9: cover_showcase9,
cover_showcase10: cover_showcase10,
cover_showcase11: cover_showcase11,
cover_showcase12: cover_showcase12,
propertyType: selectedCollection,  
});
  
if (selectedCollection === "FeaturedHouse" || "FeaturedApartment") {
router.push('/');
} else {
const formattedPageName = selectedCollection.charAt(0).toUpperCase() + selectedCollection.slice(1);
router.push(`/pages/${formattedPageName}`);
}
} catch (error) {
      console.error("Error:", error);

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
  
const formatPrice1 = (input,) => {
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
const handlePriceChange1 = (e) => {
const inputValue = e.target.value;
const formattedPrice = formatPrice1(inputValue);
setPriceextra(formattedPrice);
};

const handleTourTimeChange = (e) => {
  setTourTime(e.target.value);
};


const timeOptions = [
  "9:00 AM", "9:30 AM", "9:40 AM", "10:00 AM", "10:30 AM", "10:40 AM",
  "11:00 AM", "11:30 AM", "11:40 AM", "12:00 PM", "12:30 PM", "12:40 PM",
  "1:00 PM", "1:30 PM", "1:40 PM", "2:00 PM", "2:30 PM", "2:40 PM",
  "3:00 PM", "3:30 PM", "3:40 PM", "4:00 PM", "4:30 PM", "4:40 PM",
  
];



return (
    <>
<div className="property-hero">
  
<form className="postform" onSubmit={handleSubmit}>
  <h1 style={{padding:'0 1rem'}}>Admin Form</h1>
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
required
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
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center',borderBottom:'solid 1px',marginBottom:'1rem' }}><label htmlFor="billingFrequency ">Billing Frequency</label>
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
<option value="For Sale">For Sale</option>
</select></div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center', }}><label htmlFor="price">Financing Price </label>
<input
type="text" 
name="price"
value={priceextra}
onChange={handlePriceChange1}
required
/>
</div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center',borderBottom:'solid 1px',marginBottom:'1rem' }}><label htmlFor="billingFrequency2 ">Seller Financing</label>
<select
style={{marginLeft:'1px'}}
name="billingFrequency2"
value={billingFrequency2}
onChange={(e) => setBillingFrequency2(e.target.value)}
required
className='billingselect'
>
<option value="Monthly">Monthly</option>
<option value="Weekly">Weekly</option>
</select></div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="selectedCollection">Property Category</label>

<select
name="selectedCollection"
value={selectedCollection}
onChange={(e) => setSelectedCollection(e.target.value)}
required
>  
<option value="FeaturedHouse">Featured Houses</option>
<option value="FeaturedApartment">Featured Apartments</option>
<option value="Houses">Houses</option>
<option value="Apartments">Apartments</option>
<option value="NewConstruction">New Construction</option>
</select></div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center',marginBottom:'1rem' }}><label htmlFor="bedrooms">Bedrooms</label>
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

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center',marginBottom:'1rem' }}>
<label htmlFor="square">Property Size</label>
<input
  type="number"
  id="square"
  required

  name="square"
  onChange={(e) => setSquare(e.target.value)}
/> 


  

</div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center', borderBottom: 'solid 1px' }}>
        <label htmlFor="tourTime">Tour Time</label>
        <select
          id="tourTime"
          name="tourTime"
          value={tourTime}
          onChange={handleTourTimeChange}
          required
        >
          <option value="" disabled>Select tour time</option>
          {timeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

<div style={{overflow:'auto'}}>
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
<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', margin: '1rem 0'}}>
<input
type="checkbox"
id="pool"
name="pool"
checked={pool}
onChange={(e) => setPool(e.target.checked)}
/>
<label htmlFor="pool">Pool</label>
</div>
<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', marginBottom: '1rem', borderBottom: 'solid 1px ' }}>
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
required

onChange={handleCoverImageChange}
/>
</div>


<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase1">Showcase Image </label>
<input
type="file"
id="showcase1"
name="showcase1"
accept="image/*"
required

onChange={handleShowcase1Change}
/></div>


<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase2">Showcase Image </label>
<input
type="file"
id="showcase2"
name="showcase2"
accept="image/*"
required

onChange={handleShowcase2Change}
/></div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase3">Showcase Image </label>
<input
type="file"
id="showcase3"
name="showcase3"
accept="image/*"
required

onChange={handleShowcase3Change}
/></div>


<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase4">Showcase Image </label>
<input
type="file"
id="showcase4"
name="showcase4"
accept="image/*"
required

onChange={handleShowcase4Change}
/></div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase5">Showcase Image </label>
<input
type="file"
id="showcase5"
name="showcase5"
accept="image/*"
required

onChange={handleShowcase5Change}
/></div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase6">Showcase Image </label>
<input
type="file"
id="showcase6"
name="showcase6"
accept="image/*"
required

onChange={handleShowcase6Change}
/></div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase7">Showcase Image </label>
<input
type="file"
id="showcase7"
name="showcase7"
accept="image/*"
required

onChange={handleShowcase7Change}
/></div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center', }}><label htmlFor="showcase8">Showcase Image </label>
<input
type="file"
id="showcase8"
name="showcase8"
accept="image/*"
required

onChange={handleShowcase8Change}
/></div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center'  }}><label htmlFor="showcase8">Showcase Image </label>
<input
type="file"
id="showcase9"
name="showcase9"
accept="image/*"
required

onChange={handleShowcase9Change}
/></div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase10">Showcase Image </label>
<input
type="file"
id="showcase10"
name="showcase10"
accept="image/*"
required

onChange={handleShowcase10Change}
/>

</div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center'}}><label htmlFor="showcase11">Showcase Image </label>
<input
type="file"
id="showcase11"
name="showcase11"
accept="image/*"
required

onChange={handleShowcase11Change}
/>

</div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center',marginBottom:'1rem' }}><label htmlFor="showcase12">Showcase Image </label>
<input
type="file"
id="showcase12"
name="showcase12"
accept="image/*"
required

onChange={handleShowcase12Change}
/>

</div>

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
rows="10"
cols="50"
placeholder='Describe your property'
required
value={content}
onChange={(e) => setContent(e.target.value)}

></textarea>

<button
type="submit"
disabled={!isSignedIn || !content || !selectedCollection  ||  isLoading}
style={{
margin:'1rem 0',
cursor: !isSignedIn || !content || !selectedCollection ||  isLoading ?  'none' : 'pointer',
backgroundColor: !isSignedIn || !content || !selectedCollection ||  isLoading ? '#9e9e9e' : '#00a8ff',
color: !isSignedIn || !content || !selectedCollection  || isLoading ? 'grey' : '#fff',

}}
  
>
{isLoading ? <BeatLoader color='blue' /> : 'Submit'}
</button>

{errorMessage && <p className="error">{errorMessage}</p>
/* {successMessage && <p className="success">{successMessage}</p>} */}

</form>
</div>
</>
);
}    