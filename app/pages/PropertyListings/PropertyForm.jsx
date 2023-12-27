'use client'
import { auth } from '@/app/Config/firebase';
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore';
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
  const [ isLoading, setIsLoading] = useState(false)
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
  
  
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
  const auth = getAuth();
  const user = auth.currentUser;
  setIsLoading(true);
  const db = getFirestore();
  const docRef = await addDoc(collection(db, 'extended_stay'), {
  articleId:articleId,
  userId: user.uid,
  content: content,
  timestamp: new Date(),
  userName: user.displayName,
  userEmail: user.email,
  });
  setComments((prevComments) => [...prevComments,
  {
  id: docRef.id,
  userId: user.uid,
  content: content,
  timestamp: new Date(),
  userName: user.displayName,
  userEmail: user.email,
  },
  ]);
  setSuccessMessage('Comment created successfully');
  setTimeout(() => {
  setSuccessMessage('');
  }, 3000);
  setContent('');
  } catch (error) {
  setErrorMessage('Error submitting comment. Please try again.');
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
<div className="mortage-hero">
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

<div>
  <label htmlFor="price">Price</label>
<input
  type="text"
  name="price"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  required
/>
<label htmlFor="billingFrequency">Billing Frequency</label>
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



<label htmlFor="catogory">Catogory</label>
<input
  type="text"
  name="catogory"
  value={catogory}
  onChange={(e) => setCatogory(e.target.value)}
  required
/>

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














<label htmlFor="catogory">Address</label>
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
placeholder='Describe you property'
required
value={content}
onChange={(e) => setContent(e.target.value)}
autoFocus={autoFocus}>
</textarea>
<button
className={isSignedIn ? "submitbtn" : "submitbtn disabled"}
type="submit"
disabled={!isSignedIn || !content || isLoading}>
{isLoading ? <BeatLoader color='white' /> : 'Submit'}
</button>
{errorMessage && <p className="error">{errorMessage}</p>}
{successMessage && <p className="success">{successMessage}</p>}
</form>

</div>
</>
)
}
