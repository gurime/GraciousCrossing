'use client'
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import React, { useEffect, useRef, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { auth } from '../../Config/firebase';

export default function AdminEdit({ comment,  onCancel }) {

  const [articleId, setArticleId] = useState("");  

const [isSignedIn, setIsSignedIn] = useState(false);
const [tourTime, setTourTime] = useState(comment ? comment.tourTime : "");

const [content, setContent] = useState(comment ? comment.content : "");
const [title, setTitle] = useState(comment ? comment.title : "");
const [owner, setOwner] = useState(comment ? comment.owner : "");
const [price, setPrice] = useState(comment ? comment.price : "");


const [priceextra, setPriceextra] = useState(comment ? comment.priceextra : "");
const [billingFrequency, setBillingFrequency] = useState(comment ? comment.billingFrequency : 'Monthly');
const [billingFrequency2, setBillingFrequency2] = useState(comment ? comment.billingFrequency2 : 'Monthly');

const [bedrooms, setBedrooms] = useState(comment ? comment.bedrooms : "1");
const [bathrooms, setBathrooms] = useState(comment ? comment.bathrooms : "1");
const [square, setSquare] = useState(comment ? comment.square : "");

const [address, setAddress] = useState(comment ? comment.address : "");
const [city, setCity] = useState(comment ? comment.city : "");
  const [state, setState] = useState(comment ? comment.state : "");
  const [zip, setZip] = useState(comment ? comment.zip : "");
const [isLoading, setIsLoading] = useState(false);
const [cable, setCable] = useState(comment ? comment.cable :false);
const [laundry, setLaundry] = useState(comment ? comment.laundry :false);
const [lights, setLights] = useState(comment ? comment.lights :false);
const [water, setWater] = useState(comment ? comment.water : false);
const [heating, setHeating] = useState(comment ? comment.heating : false);
const [pool, setPool] = useState(comment ? comment.pool : false);
const [airConditioning, setAirConditioning] = useState(comment ? comment.airConditioning : false);
const [wifi, setWifi] = useState(comment ? comment.wifi : false);
const [gym, setGym] = useState(comment ? comment.gym :false);
const [parking, setParking] = useState(comment ? comment.parking: false);
const [ceiling, setCeiling] = useState(comment ? comment.ceiling: false);
const [smoke, setSmoke] = useState(comment ? comment.smoke :false);
const [sprink, setSprink] = useState(comment ? comment.sprink: false);
const [tub, setTub] = useState(comment ? comment.tub:false);
const [stoorage, setStoorage] = useState(comment ? comment.stoorage : false);
const [dish, setDish] = useState(comment ? comment.dish :false);
const [wheel, setWheel] = useState(comment ? comment.wheel : false);
const [frame, setFrame] = useState(comment ? comment.frame : false);
const [disposal, setDisposal] = useState(comment? comment.disposal : false);
const [stainless, setStainless] = useState(comment ? comment.stainless : false);
const [island, setIsland] = useState(comment ? comment.island :false);
const [kitchen, setKitchen] = useState(comment ? comment.kitchen : false);
const [phone, setPhone] = useState(comment ? comment.phone : "");
const [units, setUnits] = useState(comment ? comment.units : '');
const [apartprice, setApartPrice] = useState(comment ? comment.apartprice : '');
const [apartavailability, setApartAvailability] = useState(comment ? comment.apartavailability : '');
const [apartsquare, setApartSquare] = useState(comment ? comment.apartsquare : '');
const [apartbillingFrequency2, setApartBillingFrequency2] = useState(comment ? comment.apartbillingFrequency2 : '');
const [aparttourTime, setApartTourTime] = useState(comment ? comment.aparttourTime : "");
const [apartbathrooms, setApartBathrooms] = useState(comment ? comment.apartbathrooms : '');
  const [apartbedrooms, setApartBedrooms] = useState(comment ? comment.apartbedrooms : "");
const [authpicFile, setAuthPicFile] = useState(comment ? comment.authpic : "" );  
const [coverImageFile, setCoverImageFile] = useState(comment ? comment.cover_image   : "" );
const [showcase1File, setShowcase1File] = useState(comment ? comment.cover_showcase1 : ""  );
const [showcase2File, setShowcase2File] = useState(comment ? comment.cover_showcase2 : ""  );
const [showcase3File, setShowcase3File] = useState(comment ? comment.cover_showcase3 : ""  );
const [showcase4File, setShowcase4File] = useState(comment ? comment.cover_showcase4 : ""   );  
const [showcase5File, setShowcase5File] = useState(comment ? comment.cover_showcase5 : ""   );  
const [showcase6File, setShowcase6File] = useState(comment ? comment.cover_showcase6 : ""   );  
const [showcase7File, setShowcase7File] = useState(comment ? comment.cover_showcase7 : ""   );  
const [showcase8File, setShowcase8File] = useState(comment ? comment.cover_showcase8 : ""   );   
const [showcase9File, setShowcase9File] = useState(comment ? comment.cover_showcase9 : ""   );   
const [showcase10File, setShowcase10File] = useState(comment ? comment.cover_showcase10 : ""   );   
const [showcase11File, setShowcase11File] = useState(comment ? comment.cover_showcase11 : ""   );   
const [showcase12File, setShowcase12File] = useState(comment ? comment.cover_showcase12 : ""   );   
const [selectedCollection, setSelectedCollection] = useState(comment ? comment.propertyType : "Featured Houses");
const [successMessage, setSuccessMessage] = useState("");

const [errorMessage, setErrorMessage] = useState('');


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
        content,
        opentime,
        title,
        owner,
        phone,
        price,
        priceextra,
        bedrooms,
        bathrooms,
        square,
        billingFrequency,
        billingFrequency2,
        units,
        apartavailability,
        apartbillingFrequency2,
        apartprice,
        apartsquare,
        apartbathrooms,
        apartbedrooms,
        aparttourTime,
        lights,
        cable,
        laundry,
        airConditioning,
        heating,
        pool,
        wifi,
        address,
        city,
        state,
        zip,
        gym,
        parking,
        ceiling,
        disposal,
        smoke,
        sprink,
        tub,
        wheel,
        frame,
        stoorage,
        dish,
        stainless,
        kitchen,
        island,
        tourTime,
        timestamp: new Date(),
        userEmail: user.email,
        authpic,
        cover_image,
        cover_showcase1,
        cover_showcase1,
        cover_showcase2,
        cover_showcase3,
        cover_showcase4,
        cover_showcase5,
        cover_showcase6,
        cover_showcase7,
        cover_showcase8,
        cover_showcase9,
        cover_showcase10,
        cover_showcase11,
        cover_showcase12,
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

    
  
  
  const handleTourTimeChange = (e) => {
    setTourTime(e.target.value);
  };
  
 
  const timeOptions = [
    "9:00 AM", "9:30 AM", "9:40 AM", "10:00 AM", "10:30 AM", "10:40 AM",
    "11:00 AM", "11:30 AM", "11:40 AM", "12:00 PM", "12:30 PM", "12:40 PM",
    "1:00 PM", "1:30 PM", "1:40 PM", "2:00 PM", "2:30 PM", "2:40 PM",
    "3:00 PM", "3:30 PM", "3:40 PM", "4:00 PM", "4:30 PM", "4:40 PM",
    
  ];

  const handleApartTourTimeChange = (e) => {
    setApartTourTime(e.target.value);
  };
  
  const timeRanges = [
    { start: "9:00 AM", end: "10:00 AM" },
    { start: "10:30 AM", end: "12:00 PM" },
    { start: "1:00 PM", end: "4:00 PM" },
  
  ];



  const handleApartOpenTimeChange = (e) => {
    setOpentime(e.target.value);
  };
  
  const openTimeRanges = [
    { day: "Monday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Saturday", open: "10:00 AM", close: "4:00 PM" },
    { day: "Sunday", open: "11:00 AM", close: "3:00 PM" }
  ];
  
return (
<>
<div className='adminform_bg'>
<form className="adminform" onSubmit={handleSubmit}>
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Select the type of property you are interested in:</h2>
</div>
<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="selectedCollection">Property Type:</label>
    <select
      name="selectedCollection"
      value={selectedCollection}
      onChange={(e) => setSelectedCollection(e.target.value)}
      required
      className='billingselect'
    >
      <option value="FeaturedHouse">Featured Houses</option>
      <option value="Featured Apartments">Featured Apartments</option>
      <option value="Houses">Houses</option>
      <option value="Apartments">Apartments</option>
      <option value="Motel">Motel</option>
      <option value="NewConstruction">New Construction</option>
      <option value="GreenHomes">Green Homes</option>
      <option value="HistoricHomes">Historic Homes</option>
    </select>
  </div>
</div>
   <hr />
     {/* property information starts here */}

<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Provide Your Contact Information</h2>
</div>

<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="property-name">Property Name:</label>
<input
type="text"
id="property-name"
name="title"
value={title}
onChange={(e) => setTitle(e.target.value)}
required
/>
</div>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="owner-name">Owner Name:</label>
<input
type="text"
id="owner-name"
name="owner"
value={owner}
onChange={(e) => setOwner(e.target.value)}
required
/>
</div>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="phone-number">Phone Number:</label>
<input
type="tel"
id="phone-number"
name="phone"
value={phone}
onChange={(e) => setPhone(e.target.value)}
required
/>
</div>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="tourTime">Days you are open</label>
  <select
    id="tourTime"
    name="tourTime"
    value={opentime}
    onChange={handleApartOpenTimeChange}
  >
    <option value="" disabled>Select opening hours</option>
    {openTimeRanges.map((range) => (
      <option key={range.day} value={` ${range.open} ${range.close}`}>
        {range.day}: {range.open} - {range.close}
      </option>
    ))}
  </select>
</div>
</div>
{/* property contact information stops here */}

<hr />
{/* property information starts here */}

<div style={{ color: '#fff', textAlign: 'center' }}>
<h2>Housing & Information Provider: Motels, Homes, New Construction, Green Homes, Historic Homes</h2>
</div>

<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="price">Property Price:</label>
    <input
      type="text"
      id="price"
      name="price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
  </div>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="billingFrequency">Payment Frequency:</label>
    <select
      name="billingFrequency"
      value={billingFrequency}
      onChange={(e) => setBillingFrequency(e.target.value)}
      
      className='billingselect'
    >
            <option value="">Select Payment Frequency</option>

      <option value="Monthly">Monthly</option>
      <option value="Weekly">Weekly</option>
      <option value="Rent">Rent</option>
      <option value="For Sale">For Sale</option>
    </select>
  </div>



<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="bedrooms">Bedrooms:</label>
<input
type="number"
name="bedrooms"
value={bedrooms}
onChange={(e) => setBedrooms(e.target.value)}

/>
  </div>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>

<label htmlFor="bathrooms">Bathrooms:</label>
<input
type="number"
name="bathrooms"
value={bathrooms}
onChange={(e) => setBathrooms(e.target.value)}

/>
</div>


<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>

<label htmlFor="square">Property Size:</label>
<input
type="text"
id="square"
name="square"
value={square}
onChange={(e) => setSquare(e.target.value)}
/> 
</div>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="tourTime">Tour Time</label>
<select
id="tourTime"
name="tourTime"
value={tourTime}
onChange={handleTourTimeChange}
>
<option value="" disabled>Select tour time</option>
{timeOptions.map((option) => (
<option key={option} value={option}>{option}</option>
))}
</select>
</div>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="priceextra">Financing Price: </label>
    <input
      type="text"
      name="priceextra"
      value={priceextra}
      onChange={(e) => setPriceextra(e.target.value)}
    />
    <label htmlFor="billingFrequency2">Financing Type:</label>
    <select
      style={{ marginLeft: '1px' }}
      name="billingFrequency2"
      value={billingFrequency2}
      onChange={(e) => setBillingFrequency2(e.target.value)}
      className='billingselect'
    >
      <option value="">Select Payment Frequency</option>
      <option value="Monthly">Monthly</option>
      <option value="Weekly">Weekly</option>
      <option value="RentToOwn">Rent to Own</option>
      <option value="For Sale">For Sale</option>
    </select>
  </div>

</div>
{/* Housing property information stops here */}
<hr />


<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Provide Apartment Information</h2>
</div>

<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>

<label htmlFor="unitnumbers">Unit:</label>
    <select
      name="unitnumbers"
      value={units}
      onChange={(e) => setUnits(e.target.value)}
      className='billingselect'
    >
      <option value="">Select Unit #</option>

      <option value="BUC-1018">BUC-1018</option>
      <option value="BUC-1818">BUC-1818</option>
     
    </select>
  </div>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="apartprice">Unit Price:</label>
    <input
      type="text"
      id="apartprice"
      name="apartprice"
      value={apartprice}
      onChange={(e) => setApartPrice(e.target.value)}
    />
  </div>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
  
    <label htmlFor="apartbillingFrequency2">Financing Type:</label>
    <select
      style={{ marginLeft: '1px' }}
      name="apartbillingFrequency2"
      value={apartbillingFrequency2}
      onChange={(e) => setApartBillingFrequency2(e.target.value)}
      className='billingselect'
    >
      <option value="Monthly">Monthly</option>
   
    </select>
  </div>
  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>

<label htmlFor="apartsquare">Unit Size:</label>
<input
type="text"
id="apartsquare"
name="apartsquare"
value={apartsquare}
onChange={(e) => setApartSquare(e.target.value)}
/> 
</div>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="apartbedrooms">Bedrooms:</label>
<input
type="number"
name="apartbedrooms"
value={apartbedrooms}
onChange={(e) => setApartBedrooms(e.target.value)}
/>
  </div>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>

<label htmlFor="apartbathrooms">Bathrooms:</label>
<input
type="number"
name="apartbathrooms"
value={apartbathrooms}
onChange={(e) => setApartBathrooms(e.target.value)}
/>
</div>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>

<label htmlFor="Availability">Availability:</label>
<input
type="text"
id="Availability"
name="Availability"
value={apartavailability}
onChange={(e) => setApartAvailability(e.target.value)}
/> 
</div>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="tourTime">Tour Time</label>
  <select
    id="tourTime"
    name="tourTime"
    value={aparttourTime}
    onChange={handleApartTourTimeChange}
  >
    <option value="" disabled>Select tour time range</option>
    {timeRanges.map((range) => (
      <option key={range.start + range.end} value={`${range.start}-${range.end}`}>
        {range.start} - {range.end}
      </option>
    ))}
  </select>
</div>



</div>
<hr />



{/* amenities information starts here */}

<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Select Highlights</h2>
</div>
<div className='sm-adminform sm-adminform-checkbox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>

<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="lights" >Lights:</label>
<input
type="radio"
id="lights"
name="lights"
checked={lights}
onChange={(e) => setLights(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="cable" >Cable:</label>
<input
type="radio"
id="cable"
name="cable"
checked={cable}
onChange={(e) => setCable(e.target.value)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="laundry" >laundry:</label>
<input
type="radio"
id="laundry"
name="laundry"
checked={laundry}
onChange={(e) => setLaundry(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="airConditioning" >AC:</label>
<input
type="radio"
id="airConditioning"
name="airConditioning"
checked={airConditioning}
onChange={(e) => setAirConditioning(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="heating" >Heating:</label>
<input
type="radio"
id="heating"
name="heating"
checked={heating}
onChange={(e) => setHeating(e.target.checked)}
/>
</div>

<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="wifi" >Wifi:</label>
<input
type="radio"
id="wifi"
name="wifi"
checked={wifi}
onChange={(e) => setWifi(e.target.checked)}
/>
</div>


<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="parking" >Parking:</label>
  <input
    type="radio"
    id="parking"
    name="parking"
    checked={parking}
    onChange={(e) => setParking(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="ceiling" >Ceiling Fans:</label>
  <input
    type="radio"
    id="ceiling"
    name="ceiling"
    checked={ceiling}
    onChange={(e) => setCeiling(e.target.checked)}
  />
</div>


</div>

<hr />
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Select Highlights</h2>
</div>
<div className='sm-adminform sm-adminform-checkbox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>



<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="smoke free" >Smoke Free:</label>
  <input
    type="radio"
    id="smoke free"
    name="smoke free"
    checked={smoke}
    onChange={(e) => setSmoke(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="storage" >Storage Space:</label>
  <input
    type="radio"
    id="storage"
    name="storage"
    checked={stoorage}
    onChange={(e) => setStoorage(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="tub" >Tub/Shower:</label>
  <input
    type="radio"
    id="tub"
    name="tub"
    checked={tub}
    onChange={(e) => setTub(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="sprink" >Sprinkler System:</label>
  <input
    type="radio"
    id="sprink"
    name="sprink"
    checked={sprink}
    onChange={(e) => setSprink(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="frame" >Framed Mirrors:</label>
  <input
    type="radio"
    id="frame"
    name="frame"
    checked={frame}
    onChange={(e) => setFrame(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="wheel" >Wheelchair Accessible:</label>
  <input
    type="radio"
    id="wheel"
    name="wherl"
    checked={wheel}
    onChange={(e) => setWheel(e.target.checked)}
  />
</div>

</div>

<hr />
{/* amenities information stops here */}
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Kitchen Features & Appliances
</h2>
</div>
<div className='sm-adminform sm-adminform-checkbox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>


<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="dish" >Dishwasher:</label>
  <input
    type="radio"
    id="dish"
    name="dish"
    checked={dish}
    onChange={(e) => setDish(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="disposal" >Disposal:</label>
  <input
    type="radio"
    id="disposal"
    name="disposal"
    checked={disposal}
    onChange={(e) => setDisposal(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="stainless" >Stainless Steel Appliances:</label>
  <input
    type="radio"
    id="stainless"
    name="stainless"
    checked={stainless}
    onChange={(e) => setStainless(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="island" >Island Kitchen:</label>
  <input
    type="radio"
    id="island"
    name="island"
    checked={island}
    onChange={(e) => setIsland(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="kitc" >Kitchen:</label>
  <input
    type="radio"
    id="kitc"
    name="kitc"
    checked={kitchen}
    onChange={(e) => setKitchen(e.target.checked)}
  />
</div>


</div>
<hr />
{/* amenities information stops here */}
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Community Activities
</h2>
</div>
<div className='sm-adminform sm-adminform-checkbox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>


<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="pool" >Swimming Pool:</label>
  <input
    type="radio"
    id="pool"
    name="pool"
    checked={pool}
    onChange={(e) => setPool(e.target.checked)}
  />
</div>


<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="gym" >Fitness Center:</label>
  <input
    type="radio"
    id="gym"
    name="gym"
    checked={gym}
    onChange={(e) => setGym(e.target.checked)}
  />
</div>



</div>
<hr />
{/* property images information starts here */}

<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Property Images</h2>
</div>
<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="authpic">Property Logo:</label>
<input
type="file"
id="authpic"
name="authpic"
accept="image/*"
onChange={handleAuthPicChange}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="cover_image">Property Featured Image:</label>
<input
type="file"
id="cover_image"
name="cover_image"
accept="image/*"


onChange={handleCoverImageChange}
/>
</div> 
<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase1">Property Showcase Image 1: </label>
<input
  type="file"
  id="showcase1"
  name="showcase1"
  accept="image/*"
  onChange={handleShowcase1Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase2">Property Showcase Image 2: </label>
<input
  type="file"
  id="showcase2"
  name="showcase2"
  accept="image/*"
  onChange={handleShowcase2Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase3">Property Showcase Image 3: </label>
<input
  type="file"
  id="showcase3"
  name="showcase3"
  accept="image/*"
  onChange={handleShowcase3Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase4">Property Showcase Image 4: </label>
<input
  type="file"
  id="showcase4"
  name="showcase4"
  accept="image/*"
  onChange={handleShowcase4Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase5">Property Showcase Image 5: </label>
<input
  type="file"
  id="showcase5"
  name="showcas5"
  accept="image/*"
  onChange={handleShowcase5Change}
/>
</div>

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase6">Property Showcase Image 6: </label>
<input
  type="file"
  id="showcase6"
  name="showcas6"
  accept="image/*"
  onChange={handleShowcase6Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase7">Property Showcase Image 7: </label>
<input
  type="file"
  id="showcase7"
  name="showcas7"
  accept="image/*"
  onChange={handleShowcase7Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase8">Property Showcase Image 8: </label>
<input
  type="file"
  id="showcase8"
  name="showcas8"
  accept="image/*"
  onChange={handleShowcase8Change}
/>
</div>

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase9">Property Showcase Image 9: </label>
<input
  type="file"
  id="showcase9"
  name="showcas9"
  accept="image/*"
  onChange={handleShowcase9Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase10">Property Showcase Image 10: </label>
<input
  type="file"
  id="showcase10"
  name="showcas10"
  accept="image/*"
  onChange={handleShowcase10Change}
/>
</div> 

<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase11">Property Showcase Image 11: </label>
<input
  type="file"
  id="showcase11"
  name="showcas11"
  accept="image/*"
  onChange={handleShowcase11Change}
/>
</div> 
<div style={{ display: 'grid', gap: '1rem',marginBottom:'10rem' }}>
<label htmlFor="showcase12">Property Showcase Image 12: </label>
<input
  type="file"
  id="showcase12"
  name="showcas12"
  accept="image/*"
  onChange={handleShowcase12Change}
/>
</div> 
</div>
{/* property images information stops here */}

<hr />

{/* property location information starts here */}

<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Property Location</h2>
</div>
<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="address">Address:</label>
    <input
      type="text"
      id="address"
      name="address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      
    />
  </div>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="city">City:</label>
    <input
      type="text"
      id="city"
      name="city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      
    />
  </div>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="state">State:</label>
<select
id="state"
name="state"
value={state}
onChange={(e) => setState(e.target.value)}
>
<option value="">Select a state</option> 
<option value="Alabama">Alabama</option> 
<option value="Alaska">Alaska</option> 
<option value="Arizona">Arizona</option> 
<option value="Arkansas">Arkansas</option> 
<option value="California">California</option> 
<option value="Colorado">Colorado</option> 
<option value="Connecticut">Connecticut</option> 
<option value="Delaware">Delaware</option> 
<option value="Florida">Florida</option> 
<option value="Georgia">Georgia</option> 
<option value="Hawaii">Hawaii</option> 
<option value="Idaho">Idaho</option> 
<option value="Illinois">Illinois</option> 
<option value="Indiana">Indiana</option> 
<option value="Iowa">Iowa</option> 
<option value="Kansas">Kansas</option> 
<option value="Kentucky">Kentucky</option> 
<option value="Louisiana">Louisiana</option> 
<option value="Maine">Maine</option> 
<option value="Maryland">Maryland</option> 
<option value="Massachusetts">Massachusetts</option> 
<option value="Michigan">Michigan</option> 
<option value="Minnesota">Minnesota</option> 
<option value="Mississippi">Mississippi</option> 
<option value="Missouri">Missouri</option> 
<option value="Montana">Montana</option> 
<option value="Nebraska">Nebraska</option> 
<option value="Nevada">Nevada</option> 
<option value="New Hampshire">New Hampshire</option> 
<option value="New Jersey">New Jersey</option> 
<option value="New Mexico">New Mexico</option> 
<option value="New York">New York</option> 
<option value="North Carolina">North Carolina</option> 
<option value="North Dakota">North Dakota</option> 
<option value="Ohio">Ohio</option> 
<option value="Oklahoma">Oklahoma</option> 
<option value="Oregon">Oregon</option> 
<option value="Pennsylvania">Pennsylvania</option> 
<option value="Rhode Island">Rhode Island</option> 
<option value="South Carolina">South Carolina</option> 
<option value="South Dakota">South Dakota</option> 
<option value="Tennessee">Tennessee</option> 
<option value="Texas">Texas</option> 
<option value="Utah">Utah</option> 
<option value="Vermont">Vermont</option> 
<option value="Virginia">Virginia</option> 
<option value="Washington">Washington</option> 
<option value="West Virginia">West Virginia</option> 
<option value="Wisconsin">Wisconsin</option> 
<option value="Wyoming">Wyoming</option>
</select>
</div>

  <div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
    <label htmlFor="zip">ZIP Code:</label>
    <input
      type="text"
      id="zip"
      name="zip"
      value={zip}
      onChange={(e) => setZip(e.target.value)}
      
    />
  </div>

</div>
{/* property location information starts here */}

<hr />

<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Property Details</h2>
</div>
<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
  <div  style={{ display: 'grid', gap: '1rem', width: '100%' }}>
    <textarea
      rows="10"
      id="propertyDescription"
      placeholder='E.g., A charming two-bedroom apartment with scenic views...'
      
      value={content}
      onChange={(e) => setContent(e.target.value)}
    ></textarea>
  </div>
</div>


<button
type="submit"
disabled={!isSignedIn || !content || !selectedCollection || !address || !zip || !state || !city   ||  isLoading}
style={{
cursor: !isSignedIn || !content || !selectedCollection || !address || !zip || !state || !city  || isLoading ?  'none' : 'pointer',
backgroundColor: !isSignedIn || !content || !selectedCollection || !address || !zip || !state || !city  || isLoading ? '#9e9e9e' : '#00a8ff',
color: !isSignedIn || !content || !selectedCollection  || !address || !zip || !state || !city  || isLoading ? 'grey' : '#fff',

}}
  
>
{isLoading ? <BeatLoader color='blue' /> : 'Submit'}
</button>
</form>
</div>
</>
)
}
