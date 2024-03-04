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
const [wifi, setWifi] = useState(comment ? comment.wifi : "");
const [phone, setPhone] = useState(comment ? comment.phone : "");
const [square, setSquare] = useState(comment ? comment.square : "");
const [tourTime, setTourTime] = useState(comment ? comment.tourTime : "");
const [authpicFile, setAuthPicFile] = useState(comment ? null : comment.authpic);  

const [coverImageFile, setCoverImageFile] = useState(comment ? comment.cover_image : null  );
const [showcase1File, setShowcase1File] = useState(comment ? comment.cover_showcase1 : null );
const [showcase2File, setShowcase2File] = useState(comment ? comment.cover_showcase2  : null );
const [showcase3File, setShowcase3File] = useState(comment ? comment.cover_showcase3 : null  );
const [showcase4File, setShowcase4File] = useState(comment ? comment.cover_showcase4 : null  );  

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
const isUpdate = !!comment.id;
      // Upload files to Firebase Storage if they exist
      const authpic = authpicFile ? await handleFileUpload(authpicFile, `images/${comment.id}_authpic.jpg`) : null;
const cover_image = coverImageFile ? await handleFileUpload(coverImageFile, `images/${comment.id}_cover_image.jpg`) : null;
const cover_showcase1 = showcase1File ? await handleFileUpload(showcase1File, `images/${comment.id}_cover_showcase1.jpg`) : null;
const cover_showcase2 = showcase2File ? await handleFileUpload(showcase2File, `images/${comment.id}_cover_showcase2.jpg`) : null;
const cover_showcase3 = showcase3File ? await handleFileUpload(showcase3File, `images/${comment.id}_cover_showcase3.jpg`) : null;
const cover_showcase4 = showcase4File ? await handleFileUpload(showcase4File, `images/${comment.id}_cover_showcase4.jpg`) : null;
  
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
tourTime: tourTime,
square:square,
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
cover_showcase4: cover_showcase4
});
window.location.reload()
      window.scrollTo(0, 0); // Scroll to the top of the page

      setUpdatedData(updatedData); // Set the updated data in the state
setUpdatedData(updatedData); // Set the updated data in the state
} else {
setErrorMessage('Error: Cannot add a new document without articleId.');
}
} catch (error) {
if (error.code === 'permission-denied') {
setErrorMessage('Permission denied: You may not have the necessary permissions.');
} else if (error.code === 'not-found') {
setErrorMessage('Document not found: The specified document does not exist.');
}
} finally {
setIsLoading(false); // Reset loading state
}

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
<div style={{position:'relative'}}>
<form style={{margin:'auto'}} className="postform" onSubmit={handleSubmit}>

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
onChange={(e) => setPhone(e.target.value)}
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
onChange={(e) => setPrice(e.target.value)}
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

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}><label htmlFor="bedrooms">Bedrooms</label>
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
<label htmlFor="authpic">Property Size</label>
<input
type="number"
id="square"
name="square"

onChange={(e) => setSquare(e.target.value)}
required/>
     


  

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
<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', margin: '1rem 0', borderBottom: 'solid 1px grey' }}>
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
