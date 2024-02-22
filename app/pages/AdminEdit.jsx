'use client'
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { auth } from '../Config/firebase';

export default function AdminEdit({ comment,  onCancel }) {
const [isSignedIn, setIsSignedIn] = useState(false);
const [content, setContent] = useState(comment ? comment.content : "");
const [title, setTitle] = useState(comment ? comment.title : "");
const [owner, setOwner] = useState(comment ? comment.owner : "");
const [price, setPrice] = useState(comment ? comment.price : "");
const [priceextra, setPriceextra] = useState(comment ? comment.priceextra : "");
const [billingFrequency, setBillingFrequency] = useState(comment ? comment.billingFrequency : 'Monthly');
const [billingFrequency2, setBillingFrequency2] = useState(comment ? comment.billingFrequency2 : 'Monthly');

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
const [wifi, setWifi] = useState(comment ? comment.wifi : "");
const [phone, setPhone] = useState(comment ? comment.phone : "");
const [authpicFile, setAuthPicFile] = useState(comment ? comment.authpic : comment.authpic );  

const [coverImageFile, setCoverImageFile] = useState(comment ? comment.cover_image : comment.cover_image );
const [showcase1File, setShowcase1File] = useState(comment ? comment.cover_showcase1 : comment.cover_showcase1  );
const [showcase2File, setShowcase2File] = useState(comment ? comment.cover_showcase2  : comment.cover_showcase2  );
const [showcase3File, setShowcase3File] = useState(comment ? comment.cover_showcase3 : comment.cover_showcase3  );
const [showcase4File, setShowcase4File] = useState(comment ? comment.cover_showcase4 : comment.cover_showcase4   );  
const [showcase5File, setShowcase5File] = useState(comment ? comment.cover_showcase5 : comment.cover_showcase5   );  
const [showcase6File, setShowcase6File] = useState(comment ? comment.cover_showcase6 : comment.cover_showcase6   );  
const [showcase7File, setShowcase7File] = useState(comment ? comment.cover_showcase7 : comment.cover_showcase7   );  
const [showcase8File, setShowcase8File] = useState(comment ? comment.cover_showcase8 : comment.cover_showcase8   );  

const [selectedCollection, setSelectedCollection] = useState(comment ? comment.propertyType : "Featured Houses");
const [successMessage, setSuccessMessage] = useState("");
const [autoFocus, setAutoFocus] = useState(true);
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
setAuthPicFile(userData.authpic ? userData.authpic : null);
setCoverImageFile(userData.cover_image ? userData.cover_image : '');
setShowcase1File(userData.cover_showcase1 ? userData.cover_showcase1 : '');
setShowcase2File(userData.cover_showcase2 ? userData.cover_showcase2 : '');
setShowcase3File(userData.cover_showcase3 ? userData.cover_showcase3 : '');
setShowcase4File(userData.cover_showcase4 ? userData.cover_showcase4 : '');
setShowcase5File(userData.cover_showcase5 ? userData.cover_showcase5 : '');
setShowcase6File(userData.cover_showcase6 ? userData.cover_showcase6 : '');
setShowcase7File(userData.cover_showcase7 ? userData.cover_showcase7 : '');
setShowcase8File(userData.cover_showcase8 ? userData.cover_showcase8 : '');
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
  
const handleAuthPicChange = (e) => {
  // Set the selected cover image file to state
  const file = e.target.files[0];
  setAuthPicFile(file);
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
  
const handleShowcase4Change = (e) => {
const file = e.target.files[0];
setShowcase4File(file ? file : comment.cover_showcase4);
};
  
const handleShowcase5Change = (e) => {
  const file = e.target.files[0];
  setShowcase5File(file ? file : comment.cover_showcase5);
  };

  const handleShowcase6Change = (e) => {
    const file = e.target.files[0];
    setShowcase6File(file ? file : comment.cover_showcase6);
    };
    const handleShowcase7Change = (e) => {
    const file = e.target.files[0];
    setShowcase7File(file ? file : comment.cover_showcase7);
    };
    const handleShowcase8Change = (e) => {
    const file = e.target.files[0];
    setShowcase8File(file ? file : comment.cover_showcase8);
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
const isUpdate = !!comment.id;




const deleteFile = async (filePath) => {
try {
const storageRef = ref(storage, filePath);
await deleteObject(storageRef);
} catch (error) {
}
};

// Delete existing images if updating
if (isUpdate && comment.id && selectedCollection) {
        console.log('Deleting existing images...');

await deleteFile(`images/${comment.id}_authpic.jpg`);
await deleteFile(`images/${comment.id}_cover_image.jpg`);
await deleteFile(`images/${comment.id}_cover_showcase1.jpg`);
await deleteFile(`images/${comment.id}_cover_showcase2.jpg`);
await deleteFile(`images/${comment.id}_cover_showcase3.jpg`);
await deleteFile(`images/${comment.id}_cover_showcase4.jpg`);
await deleteFile(`images/${comment.id}_cover_showcase5.jpg`);
await deleteFile(`images/${comment.id}_cover_showcase6.jpg`);
await deleteFile(`images/${comment.id}_cover_showcase7.jpg`);
await deleteFile(`images/${comment.id}_cover_showcase8.jpg`);
console.log('Existing images deleted successfully.');

}



const authpic = authpicFile ? await handleFileUpload(authpicFile, `images/${comment.id}_authpic.jpg`) : null;
const cover_image = coverImageFile ? await handleFileUpload(coverImageFile, `images/${comment.id}_cover_image.jpg`) : null;
const cover_showcase1 = showcase1File ? await handleFileUpload(showcase1File, `images/${comment.id}_cover_showcase1.jpg`) : null;
const cover_showcase2 = showcase2File ? await handleFileUpload(showcase2File, `images/${comment.id}_cover_showcase2.jpg`) : null;
const cover_showcase3 = showcase3File ? await handleFileUpload(showcase3File, `images/${comment.id}_cover_showcase3.jpg`) : null;
const cover_showcase4 = showcase4File ? await handleFileUpload(showcase4File, `images/${comment.id}_cover_showcase4.jpg`) : null;
const cover_showcase5 = showcase5File ? await handleFileUpload(showcase5File, `images/${comment.id}_cover_showcase5.jpg`) : null;
const cover_showcase6 = showcase6File ? await handleFileUpload(showcase6File, `images/${comment.id}_cover_showcase6.jpg`) : null;
const cover_showcase7 = showcase7File ? await handleFileUpload(showcase7File, `images/${comment.id}_cover_showcase7.jpg`) : null;
const cover_showcase8 = showcase8File ? await handleFileUpload(showcase8File, `images/${comment.id}_cover_showcase8.jpg`) : null;
console.log('New images uploaded successfully.');

const db = getFirestore();
if (isUpdate && comment.id && selectedCollection) {
const docRef = doc(db, selectedCollection, comment.id);
await updateDoc(docRef, {
timestamp: new Date(),
content: content,
title: title,
owner: owner,
price: price,
priceextra: priceextra,
bedrooms: bedrooms,
bathrooms: bathrooms,
billingFrequency: billingFrequency,
billingFrequency2: billingFrequency2,
water: water,
lights: lights,
cable: cable,
laundry: laundry,
airConditioning: airConditioning,
heating: heating,
pool: pool,
phone:phone,
wifi:wifi,
authpic: authpic,
address: address,
timestamp: new Date(),
cover_image: cover_image,
cover_showcase1: cover_showcase1,
cover_showcase2: cover_showcase2,
cover_showcase3: cover_showcase3,
cover_showcase4: cover_showcase4,
cover_showcase5: cover_showcase5,
cover_showcase6: cover_showcase6,
cover_showcase7: cover_showcase7,
cover_showcase8: cover_showcase8,
});


window.location.reload()
} else {
setErrorMessage('Error: Cannot add a new document without articleId.');
}
} catch (error) {
if (error.code === 'permission-denied') {
setErrorMessage('Permission denied: You may not have the necessary permissions.');
} else if (error.code === 'not-found') {
setErrorMessage('Document not found: The specified document does not exist.');
} else {
setErrorMessage('Unexpected error occurred. Please try again later.');
}
}

};
  
const formatPrice = (input,) => {
const numericValue = input.replace(/[^0-9.]/g, '').trim();
const formattedNumericValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
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
const formattedPhone = inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3').trim().slice(0,12);
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
  
return (
<>
<div style={{position: 'relative'}}>
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
onChange={handleAuthPicChange}
/>
</div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center',borderBottom:'solid 1px',marginBottom:'1rem' }}><label htmlFor="number">Phone Number</label>
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
  style={{ marginLeft: '1px' }}
  name="billingFrequency"
  value={billingFrequency}
  onChange={(e) => setBillingFrequency(e.target.value)}
  required
  className='billingselect'
>
  <option value="Monthly">Monthly</option>
  <option value="Weekly">Weekly</option>
  <option value="For Sale">For Sale</option>
  <option value="Sold">Sold</option>
</select>

</div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="price">Financing Price </label>
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
  style={{ marginLeft: '1px' }}
  name="billingFrequency2"
  value={billingFrequency2}
  onChange={(e) => setBillingFrequency2(e.target.value)}
  required
  className='billingselect'
>
  <option value="Monthly">Monthly</option>
  <option value="Weekly">Weekly</option>
</select>
</div>


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

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center',borderBottom:'solid 1px',marginBottom:'1rem' }}><label htmlFor="bedrooms">Bedrooms</label>
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
<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', margin: '1rem 0', borderBottom: 'solid 1px ' }}>
<input
type="checkbox"
id="wifi"
name="wifi"
checked={wifi}
onChange={(e) => setWifi(e.target.checked)}
/>
<label htmlFor="wifi">Wifi</label>
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

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase3">Showcase Image </label>
<input
type="file"
id="showcase3"
name="showcase3"
accept="image/*"
onChange={handleShowcase3Change}
/></div>


<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase4">Showcase Image </label>
<input
type="file"
id="showcase4"
name="showcase4"
accept="image/*"
onChange={handleShowcase4Change}
/></div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase5">Showcase Image </label>
<input
type="file"
id="showcase5"
name="showcase5"
accept="image/*"
onChange={handleShowcase5Change}
/></div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase6">Showcase Image </label>
<input
type="file"
id="showcase6"
name="showcase6"
accept="image/*"
onChange={handleShowcase6Change}
/></div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="showcase7">Showcase Image </label>
<input
type="file"
id="showcase7"
name="showcase7"
accept="image/*"
onChange={handleShowcase7Change}
/></div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center',borderBottom:'solid 1px',marginBottom:'1rem' }}><label htmlFor="showcase8">Showcase Image </label>
<input
type="file"
id="showcase8"
name="showcase8"
accept="image/*"
onChange={handleShowcase8Change}
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
rows="10"
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
margin:'1rem 0',
cursor: !isSignedIn || !content || !selectedCollection || isLoading ? 'none' : 'pointer',
backgroundColor: !isSignedIn || !content || !selectedCollection || isLoading ? '#9e9e9e' : '#00a8ff',
color: !isSignedIn || !content || !selectedCollection || isLoading ? 'grey' : '#fff',
}}
  
>
{isLoading ? <BeatLoader color='blue' /> : 'Update'}
</button>
<button style={{backgroundColor:'red'}} onClick={handleCancel}>Cancel</button>

{/* {errorMessage && <p className="error">{errorMessage}</p>}
{successMessage && <p className="success">{successMessage}</p>} */}

</form>
</div>
</>
)
}
