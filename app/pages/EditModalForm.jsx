'use client'
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { auth } from '../Config/firebase';

export default function EditModalForm({ comment, onCancel }) {
const [articleId, setArticleId] = useState("");  
const [isSignedIn, setIsSignedIn] = useState(false);
const [aboutcontent, setAboutContent] = useState(comment ? comment.aboutcontent : "");
const [title, setTitle] = useState(comment ? comment.title : "");
const [owner, setOwner] = useState(comment ? comment.owner : "");
const [price, setPrice] = useState(comment ? comment.price : "");
const [billingFrequency, setBillingFrequency] = useState(comment ? comment.billingFrequency : 'Monthly');
const [primaryBedroomFeatures, setPrimaryBedroomFeatures] = useState(comment ?. primaryBedroomFeatures || []);
const [primaryBedroom, setPrimaryBedroom] = useState(comment ? comment.primaryBedroom : []);
const [primaryBath, setPrimaryBath] = useState(comment ? comment.primaryBath : []);
const [primaryBathFeatures, setPrimaryBathFeatures] = useState(comment ?. primaryBathFeatures || []);
const [garage, setGarage] = useState(comment ? comment.garage : []);
const [garageFeatures, setGarageFeatures] = useState(comment ?. garageFeatures || []);
const [basement, setBasement] = useState(comment ? comment.basement : []);
const [basementFeatures, setBasementFeatures] = useState(comment ?. basementFeatures || []);
const [bedrooms, setBedrooms] = useState(comment ? comment.bedrooms : "1");
const [bathrooms, setBathrooms] = useState(comment ? comment.bathrooms : "1");
const [square, setSquare] = useState(comment ? comment.square : "");
const [address, setAddress] = useState(comment ? comment.address : "");
const [city, setCity] = useState(comment ? comment.city : "");
const [state, setState] = useState(comment ? comment.state : "");
const [canadaState, setcanadaState] = useState(comment ? comment.canadaState : "");
const [mexicoState, setMexicoState] = useState(comment ? comment.mexicoState : "");
const [zip, setZip] = useState(comment ? comment.zip : "");
const [isLoading, setIsLoading] = useState(false);
const [cable, setCable] = useState(comment ? comment.cable :false);
const [laundry, setLaundry] = useState(comment ? comment.laundry :false);
const [lights, setLights] = useState(comment ? comment.lights :false);
const [water, setWater] = useState(comment ? comment.water : false);
const [heating, setHeating] = useState(comment ? comment.heating : false);
const [airConditioning, setAirConditioning] = useState(comment ? comment.airConditioning : false);
const [wifi, setWifi] = useState(comment ? comment.wifi : false);
const [parking, setParking] = useState(comment ? comment.parking : false);
const [fireplace, setFireplace] = useState(comment ? comment.fireplace : false);
const [disposal, setDisposal] = useState(comment ? comment.disposal : false);
const [dishwasher, setDishwasher] = useState(comment ? comment.dishwasher : false);
const [island, setIsland] = useState(comment ? comment.island : false);
const [kitchen, setKitchen] = useState(comment ? comment.kitchen : false);
const [microwave, setMicrowave] = useState(comment ? comment.microwave : false);
const [manager, setManager] = useState(comment ? comment.manager : false);
const [pet, setPet] = useState(comment ? comment.pet : false);
const [oven, setOven] = useState(comment ? comment.oven : false);
const [play, setPlay] = useState(comment ? comment.play : false);
const [club, setClub] = useState(comment ? comment.club : false);
const [fridge, setFridge] = useState(comment ? comment.fridge : false);
const [freezer, setFreezer] = useState(comment ? comment.freezer : false);
const [sprink, setSprink] = useState(comment ? comment.sprink : false);
const [tub, setTub] = useState(comment ? comment.tub :false);
const [smoke, setSmoke] = useState(comment ? comment.smoke : false);
const [stoorage, setStoorage] = useState(comment ? comment.stoorage : false);
const [framme, setFramme] = useState(comment ? comment.framme :false);
const [wheel, setWheel] = useState(comment ? comment.wheel :false);
const [ceiling, setCeiling] = useState(comment ? comment.ceiling : false);
const [walkin, setWalkin] = useState(comment ? comment.walkin : false);
const [balcony, setBalcony] = useState(comment ? comment.balcony : false);
const [elevator, setElevator] = useState(comment ? comment.elevator : false);
const [concierge, setConcierge] = useState(comment ? comment.concierge : false);
const [phone, setPhone] = useState(comment ? comment.phone : "");
const [units, setUnits] = useState(comment ? comment.units : '');
const [apartprice, setApartPrice] = useState(comment ? comment.apartprice : '');
const [apartavailability, setApartAvailability] = useState(comment ? comment.apartavailability : '');
const [apartsquare, setApartSquare] = useState(comment ? comment.apartsquare : '');
const [apartbillingFrequency2, setApartBillingFrequency2] = useState(comment ? comment.apartbillingFrequency2 : '');
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
const [selectedCollection, setSelectedCollection] = useState(comment ? comment.propertyType : "");


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
  onCancel();

};



const storage = getStorage(); 
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
  const handleFileUpload = async (file, storagePath, uniqueId) => {
    try {
      const storageRef = ref(storage, `${storagePath}${uniqueId}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      handleError(error);
      throw error; // Rethrow the error for the caller to handle
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
    const isUpdate = !!comment.id;
    
    const authpic = authpicFile ? await handleFileUpload(authpicFile, `images/${uniqueArticleId}authpic.jpg`, uniqueArticleId) : null;
    const cover_image = coverImageFile ? await handleFileUpload(coverImageFile, `images/${uniqueArticleId}cover_image.jpg`) : null;
    const cover_showcase1 = showcase1File ? await handleFileUpload(showcase1File, `images/${uniqueArticleId}cover_showcase1.jpg`) : null;
    const cover_showcase2 = showcase2File ? await handleFileUpload(showcase2File, `images/${uniqueArticleId}cover_showcase2.jpg`) : null;
    const cover_showcase3 = showcase3File ? await handleFileUpload(showcase3File, `images/${uniqueArticleId}cover_showcase3.jpg`) : null;
    const cover_showcase4 = showcase4File ? await handleFileUpload(showcase4File, `images/${uniqueArticleId}cover_showcase4.jpg`) : null;
    const cover_showcase5 = showcase5File ? await handleFileUpload(showcase5File, `images/${uniqueArticleId}cover_showcase5.jpg`) : null;
    const cover_showcase6 = showcase6File ? await handleFileUpload(showcase6File, `images/${uniqueArticleId}cover_showcase6.jpg`) : null;
   

    const db = getFirestore();

    const updateData = {
      userId: user.uid,
      aboutcontent: aboutcontent ?? "",
      title: title ?? "",
      owner: owner ?? "",
      phone: phone ?? "",
      price: price ?? "",
      priceextra: priceextra ?? "",
      bedrooms: bedrooms ?? "",
      bathrooms: bathrooms ?? "",
      square: square ?? "",
      billingFrequency: billingFrequency ?? "",
      units: units ?? "",
      apartavailability: apartavailability ?? "",
      apartbillingFrequency2: apartbillingFrequency2 ?? "",
      apartprice: apartprice ?? "",
      apartsquare: apartsquare ?? "",
      apartbathrooms: apartbathrooms ?? "",
      apartbedrooms: apartbedrooms ?? "",
      water: water ?? "",
      lights: lights ?? "",
      cable: cable ?? "",
      laundry: laundry ?? "",
      elevator: elevator ?? "",
      play: play ?? "",
      concierge: concierge ?? "",
      club: club ?? "",
      fireplace: fireplace ?? "",
      airConditioning: airConditioning ?? "",
      heating: heating ?? "",
      sprink: sprink ?? "",
      tub: tub ?? "",
      walkin: walkin ?? "",
      smoke: smoke ?? "",
      stoorage: stoorage ?? "",
      wheel: wheel ?? "",
      disposal: disposal ?? "",
      dishwasher: dishwasher ?? "",
      island: island ?? "",
      kitchen: kitchen ?? "",
      microwave: microwave ?? "",
      oven: oven ?? "",
      fridge: fridge ?? "",
      freezer: freezer ?? "",
      framme: framme ?? "",
      ceiling: ceiling ?? "",
      wifi: wifi ?? "",
      address: address ?? "",
      city: city ?? "",
      state: state ?? "",
      canadaState: canadaState ?? "",
      mexicoState: mexicoState ?? "",
  
      zip: zip ?? "",
      pet: pet ?? "",
      primaryBedroomFeatures: primaryBedroomFeatures ?? "",
      primaryBedroom: primaryBedroom ?? "",
      primaryBath: primaryBath ?? "",
      primaryBathFeatures: primaryBathFeatures ?? "",
      manager: manager ?? "",
      parking: parking ?? "",
      balcony: balcony ?? "",
      garage: garage ?? "",
      garageFeatures: garageFeatures ?? "",
      basement: basement ?? "",
      basementFeatures: basementFeatures ?? "",
      timestamp: new Date(),
      userEmail: user.email,
      authpic: authpic ?? null,
      cover_image: cover_image ?? null,
      cover_showcase1: cover_showcase1 ?? null,
      cover_showcase2: cover_showcase2 ?? null,
      cover_showcase3: cover_showcase3 ?? null,
      cover_showcase4: cover_showcase4 ?? null,
      cover_showcase5: cover_showcase5 ?? null,
      cover_showcase6: cover_showcase6 ?? null,
      propertyType: selectedCollection ?? "",
    };

    if (isUpdate && comment.id && selectedCollection) {
      const docRef = doc(db, selectedCollection, comment.id);
      await updateDoc(docRef, updateData);
      window.location.reload();
      window.scrollTo(0, 0);
    } else {
      setErrorMessage('Error: Cannot add a new document without articleId.');
    }
  } catch (error) {
    console.log(error);
    if (error.code === 'permission-denied') {
      setErrorMessage('Permission denied: You may not have the necessary permissions.');
    } else if (error.code === 'not-found') {
      setErrorMessage('Document not found: The specified document does not exist.');
    }
  } finally {
    setIsLoading(false); // Reset loading state
  }
};


  
  
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
 

      <option value="Houses">Houses</option>
      <option value="Apartments">Apartments</option>
      <option value="Motel">Motel</option>
      <option value="New Construction">New Construction</option>
      <option value="Green Homes">Green Homes</option>
      <option value="Historic Homes">Historic Homes</option>
      <option value="Luxury Homes">Luxury Homes</option>
      <option value="Vacation Rentals">Vacation Rentals</option>
      <option value="Condominiums">Condominiums</option>
      <option value="Fore closures">Fore closures</option>
      <option value="Senior Housing">Senior Housing</option>
      <option value="Canada">Canada</option>
      <option value="Mexico">Mexico</option>
      <option value="Caribbean">Caribbean</option>
      <option value="Europe">Europe</option>
      <option value="United Kingdom">United Kingdom</option>
      <option value="Australia">Australia</option>
      <option value="Asia">Asia</option>
      <option value="Middle East">Middle East</option>
      <option value="South America">South America</option>
      <option value="Africa">Africa</option>
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




</div>
{/* property contact information stops here */}

<hr />
{/* property information starts here */}

<div style={{ color: '#fff', textAlign: 'center' }}>
<h2>Residential Properties</h2>
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
    <label htmlFor="billingFrequency">Payment:</label>
    <select
      name="billingFrequency"
      value={billingFrequency}
      onChange={(e) => setBillingFrequency(e.target.value)}
      
      className='billingselect'
    >
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



</div>
{/* Housing property information stops here */}
<hr />
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Interior Features</h2>
</div>
<div className='sm-adminform' style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="primaryBedroom">Primary Bedroom:</label>
<select
id="primaryBedroom"
value={primaryBedroom}
onChange={(e) => setPrimaryBedroom(e.target.value)}>

<option value="">Select Primary Bedroom Type</option>
<option value="Large">Master Bedroom</option>
<option value="Double Master Bedroom">Double Master Bedroom</option>
<option value="standard">Standard Size</option>
{/* Add more options as needed */}
</select>

<label>Primary Bedroom Features:</label>
<div style={{display:'grid'}}>
<label>
<input
type="checkbox"
checked={primaryBedroomFeatures.includes('ensuiteBathroom')}
onChange={(e) => setPrimaryBedroomFeatures(e.target.checked ? [...primaryBedroomFeatures, 'ensuiteBathroom'] : primaryBedroomFeatures.filter((f) => f !== 'ensuiteBathroom')
)
}
/>En-suite Bathroom
</label>




{/* Add more checkboxes as needed */}
</div>
</div>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
      <label htmlFor="primaryBath">Primary Bath:</label>
      <select
        id="primaryBath"
        value={primaryBath}
        onChange={(e) => setPrimaryBath(e.target.value)}
>
<option value="">Select Primary Bath Type</option>
<option value="doubleVanity">Double Vanity</option>
<option value="singleVanity">Single Vanity</option>
{/* Add more options as needed */}
</select>

      {/* Additional checkboxes for primary bath features */}
<label>Primary Bath Features:</label>
<div style={{display:'grid'}}>
<label>
<input
type="checkbox"
checked={primaryBathFeatures.includes('separateShower')}
onChange={(e) =>
setPrimaryBathFeatures(e.target.checked ? [...primaryBathFeatures, 'separateShower']
: primaryBathFeatures.filter((f) => f !== 'separateShower')
)
}
/>
Separate Shower
</label>
<label>
<input
type="checkbox"
checked={primaryBathFeatures.includes('dualSinks')}
onChange={(e) =>setPrimaryBathFeatures(e.target.checked ? [...primaryBathFeatures, 'dualSinks']
: primaryBathFeatures.filter((f) => f !== 'dualSinks')
)
}
/>
Dual Sinks
</label>


{/* Add more checkboxes as needed */}
</div>
</div>




<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
      {/* Garage options */}
      <label htmlFor="garage">Garage:</label>
      <select
        id="garage"
        value={garage}
        onChange={(e) => setGarage(e.target.value)}
      >
        <option value="">Select Garage Type</option>
        <option value="attachedGarage">Attached Garage</option>
        <option value="detachedGarage">Detached Garage</option>
        {/* Add more options as needed */}
      </select>

      {/* Additional checkboxes for garage features */}
      <label>Garage Features:</label>
<div style={{ display: 'grid' }}>
  <label>
    <input
      type="checkbox"
      checked={garageFeatures.includes('automaticDoor')}
      onChange={(e) =>
        setGarageFeatures(
          e.target.checked
            ? [...garageFeatures, 'automaticDoor']
            : garageFeatures.filter((f) => f !== 'automaticDoor')
        )
      }
    />
    Automatic Garage Door
  </label>





</div>
</div>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>

{/* Basement options */}
<label htmlFor="basement">Basement:</label>
<select
id="basement"
value={basement}
onChange={(e) => setBasement(e.target.value)}
>
<option value="">Select Basement Type</option>
<option value="finished">Finished Basement</option>
<option value="unfinished">Unfinished Basement</option>
</select>

<label>Basement Features:</label>
<div style={{ display: 'grid' }}>


<label>
<input
type="checkbox"
checked={basementFeatures.includes('fininshedbath')}
onChange={(e) =>setBasementFeatures(
e.target.checked? [...basementFeatures, 'fininshedbath']
: basementFeatures.filter((f) => f !== 'fininshedbath')
)
}
/>
Finished Bath
</label>
<label>
<input
type="checkbox"
checked={basementFeatures.includes('exteriorentry')}
onChange={(e) =>setBasementFeatures(
e.target.checked? [...basementFeatures, 'exteriorentry']
: basementFeatures.filter((f) => f !== 'exteriorentry')
)
}
/>
Exterior Entry
</label>

<label>
<input
type="checkbox"
checked={basementFeatures.includes('daylight')}
onChange={(e) =>setBasementFeatures(
e.target.checked? [...basementFeatures, 'daylight']
: basementFeatures.filter((f) => f !== 'daylight')
)
}
/>
Daylight
</label>
{/* Add more checkboxes as needed */}
</div>


</div>


</div>


<hr />

<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Apartment Listings</h2>
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
      <option value="">Select Unit#</option>

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
      <option value="">Select Payment Method</option>
      <option value="Monthly">Monthly</option>
      <option value="Weekly">Weekly</option>
   
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

</div>
<hr />



{/* amenities information starts here */}




<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Select Highlights</h2>
</div>
<div className='sm-adminform sm-adminform-checkbox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>

<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="lights" >Sprinkler:</label>
<input
type="checkbox"
id="sprink"
name="sprink"
checked={sprink}
onChange={(e) => setSprink(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="cable" >Cable:</label>
<input
type="checkbox"
id="cable"
name="cable"
checked={cable}
onChange={(e) => setCable(e.target.value)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="tub" >Tub/Shower:</label>
<input
type="checkbox"
id="tub"
name="tub"
checked={tub}
onChange={(e) => setTub(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="smoke" >Smoke Free</label>
<input
type="checkbox"
id="smoke"
name="smoke"
checked={smoke}
onChange={(e) => setSmoke(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="framme" >Framed Windows:</label>
<input
type="checkbox"
id="framme"
name="framme"
checked={framme}
onChange={(e) => setFramme(e.target.checked)}
/>
</div>

<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="wifi" >Wifi:</label>
<input
type="checkbox"
id="wifi"
name="wifi"
checked={wifi}
onChange={(e) => setWifi(e.target.checked)}
/>
</div>


<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="parking" >Parking:</label>
  <input
    type="checkbox"
    id="parking"
    name="parking"
    checked={parking}
    onChange={(e) => setParking(e.target.checked)}
  />
</div>

<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="wheel" >Wheelchair Accessible:</label>
  <input
   type="checkbox"
    id="wheel"
    name="wheel"
    checked={wheel}
    onChange={(e) => setWheel(e.target.checked)}
  />
</div>



</div>

<hr />
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Select Highlights</h2>
</div>
<div className='sm-adminform sm-adminform-checkbox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>



<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="storage" >Storage Space:</label>
  <input
    type="checkbox"
    id="storage"
    name="storage"
    checked={stoorage}
    onChange={(e) => setStoorage(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="ceiling" >Ceiling Fans:</label>
  <input
   type="checkbox"
    id="ceiling"
    name="ceiling"
    checked={ceiling}
    onChange={(e) => setCeiling(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="walkin" >Walk-In Shower:</label>
  <input
    type="checkbox"
    id="walkin"
    name="walkin"
    checked={walkin}
    onChange={(e) => setWalkin(e.target.checked)}
  />
</div>

<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="fireplace" >Fire Place:</label>
  <input
    type="checkbox"
    id="fireplace"
    name="fireplace"
    checked={fireplace}
    onChange={(e) => setFireplace(e.target.checked)}
  />
</div>

<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="heating" >Heating:</label>
  <input
   type="checkbox"
    id="heating"
    name="heating"
    checked={heating}
    onChange={(e) => setHeating(e.target.checked)}
  />
</div>

</div>
<hr />
{/* amenities information stops here */}
<div style={{ color: '#fff', textAlign: 'center' }}>
        <h2>Kitchen Appliances</h2>
      </div>
      <div
        className="sm-adminform sm-adminform-checkbox"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label htmlFor="disposal">Disposal:</label>
          <input
            type="checkbox"
            id="disposal"
            name="disposal"
            checked={disposal}
            onChange={(e) => setDisposal(e.target.checked)}
          />
        </div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label htmlFor="dishwasher">Dishwasher:</label>
          <input
            type="checkbox"
            id="dishwasher"
            name="dishwasher"
            checked={dishwasher}
            onChange={(e) => setDishwasher(e.target.checked)}
          />
        </div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label htmlFor="island">Island:</label>
          <input
           type="checkbox"
            id="island"
            name="island"
            checked={island}
            onChange={(e) => setIsland(e.target.checked)}
          />
        </div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label htmlFor="kitchen">Kitchen:</label>
          <input
           type="checkbox"
            id="kitchen"
            name="kitchen"
            checked={kitchen}
            onChange={(e) => setKitchen(e.target.checked)}
          />
        </div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label htmlFor="microwave">Microwave:</label>
          <input
            type="checkbox"
            id="microwave"
            name="microwave"
            checked={microwave}
            onChange={(e) => setMicrowave(e.target.checked)}
          />
        </div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label htmlFor="oven">Oven:</label>
          <input
            type="checkbox"
            id="oven"
            name="oven"
            checked={oven}
            onChange={(e) => setOven(e.target.checked)}
          />
        </div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label htmlFor="fridge">Fridge:</label>
          <input
          type="checkbox"
            id="fridge"
            name="fridge"
            checked={fridge}
            onChange={(e) => setFridge(e.target.checked)}
          />
        </div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label htmlFor="freezer">Freezer:</label>
          <input
            type="checkbox"
            id="freezer"
            name="freezer"
            checked={freezer}
            onChange={(e) => setFreezer(e.target.checked)}
          />
        </div>
      </div>
<hr />

<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Select Amenties</h2>
</div>
<div className='sm-adminform sm-adminform-checkbox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="water"
>Water:</label>
<input
type="checkbox"
id="water"
name="water"
checked={water}
onChange={(e) => setWater(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="lights" >Lights:</label>
<input
type="checkbox"
id="lights"
name="lights"
checked={lights}
onChange={(e) => setLights(e.target.checked)}
/>
</div>

<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="laundry" >laundry:</label>
<input
type="checkbox"
id="laundry"
name="laundry"
checked={laundry}
onChange={(e) => setLaundry(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="airConditioning" >AC:</label>
<input
type="checkbox"
id="airConditioning"
name="airConditioning"
checked={airConditioning}
onChange={(e) => setAirConditioning(e.target.checked)}
/>
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="elevator" >Elevator:</label>
<input
type="checkbox"
id="elevator"
name="elevator"
checked={elevator}
onChange={(e) => setElevator(e.target.checked)}
/>
</div>

<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="concierge" >Concierge:</label>
<input
type="checkbox"
id="concierge"
name="concierge"
checked={concierge}
onChange={(e) => setConcierge(e.target.checked)}
/>
</div>

<div style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="play" >Playground:</label>
<input
type="checkbox"
id="play"
name="play"
checked={play}
onChange={(e) => setPlay(e.target.checked)}
/>
</div>




</div>
 <hr />
<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>Select Amenties</h2>
</div>
<div className='sm-adminform sm-adminform-checkbox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>




<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="pet" >Pet Friendly:</label>
  <input
    type="checkbox"
    id="pet"
    name="pet"
    checked={pet}
    onChange={(e) => setPet(e.target.checked)}
  />
</div>
<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="manager" >On-Site Manager:</label>
  <input
    type="checkbox"
    id="manager"
    name="manager"
    checked={manager}
    onChange={(e) => setManager(e.target.checked)}
  />
</div>

<div style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="balcony" >Balcony:</label>
  <input
    type="checkbox"
    id="balcony"
    name="balcony"
    checked={balcony}
    onChange={(e) => setBalcony(e.target.checked)}
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
<label htmlFor="authpic">Property Logo/Personal Picture:</label>
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
    <label htmlFor="zip">ZIP Code:</label>
    <input
      type="text"
      id="zip"
      name="zip"
      value={zip}
      onChange={(e) => setZip(e.target.value)}
      
    />
  </div>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
<label htmlFor="state">United States:</label>
<select
id="state"
name="state"
value={state}
onChange={(e) => setState(e.target.value)}
>
<option value="">Select State</option> 
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
  <label htmlFor="province">Canada:</label>
  <select id="province" name="province" value={canadaState} onChange={(e) => setcanadaState(e.target.value)}>
    <option value="">Province/Territory</option>
    <option value="Alberta">Alberta</option>
    <option value="British Columbia">British Columbia</option>
    <option value="Manitoba">Manitoba</option>
    <option value="New Brunswick">New Brunswick</option>
    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
    <option value="Northwest Territories">Northwest Territories</option>
    <option value="Nova Scotia">Nova Scotia</option>
    <option value="Nunavut">Nunavut</option>
    <option value="Ontario">Ontario</option>
    <option value="Prince Edward Island">Prince Edward Island</option>
    <option value="Quebec">Quebec</option>
    <option value="Saskatchewan">Saskatchewan</option>
    <option value="Yukon">Yukon</option>
  </select>
</div>

<div className='sm-adminform-input' style={{ display: 'grid', gap: '1rem' }}>
  <label htmlFor="state">México:</label>
  <select id="state" name="state" value={mexicoState} onChange={(e) => setMexicoState(e.target.value)}>
    <option value="">Estado</option>
    <option value="Aguascalientes">Aguascalientes</option>
    <option value="Baja California">Baja California</option>
    <option value="Baja California Sur">Baja California Sur</option>
    <option value="Campeche">Campeche</option>
    <option value="Cancun">Cancun</option>
    <option value="Chiapas">Chiapas</option>
    <option value="Chihuahua">Chihuahua</option>
    <option value="Coahuila">Coahuila</option>
    <option value="Colima">Colima</option>
    <option value="Durango">Durango</option>
    <option value="Guanajuato">Guanajuato</option>
    <option value="Guerrero">Guerrero</option>
    <option value="Hidalgo">Hidalgo</option>
    <option value="Jalisco">Jalisco</option>
    <option value="México">México</option>
    <option value="Michoacán">Michoacán</option>
    <option value="Morelos">Morelos</option>
    <option value="Nayarit">Nayarit</option>
    <option value="Nuevo León">Nuevo León</option>
    <option value="Oaxaca">Oaxaca</option>
    <option value="Puebla">Puebla</option>
    <option value="Querétaro">Querétaro</option>
    <option value="Quintana Roo">Quintana Roo</option>
    <option value="San Luis Potosí">San Luis Potosí</option>
    <option value="Sinaloa">Sinaloa</option>
    <option value="Sonora">Sonora</option>
    <option value="Tabasco">Tabasco</option>
    <option value="Tamaulipas">Tamaulipas</option>
    <option value="Tlaxcala">Tlaxcala</option>
    <option value="Veracruz">Veracruz</option>
    <option value="Yucatán">Yucatán</option>
    <option value="Zacatecas">Zacatecas</option>
    <option value="Ciudad de México">Ciudad de México</option>
  </select>
</div>

</div>
{/* property location information starts here */}

<hr />


<div style={{ color: '#fff', textAlign: 'center' }}>
  <h2>About Your Property</h2>
</div>
<div className='sm-adminform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
  <div  style={{ display: 'grid', gap: '1rem', width: '100%' }}>
    <textarea
      rows="10"
      id="aboutDescription"
      placeholder='E.g., provide a brief description of yourself and property...'
      
      value={aboutcontent}
      onChange={(e) => setAboutContent(e.target.value)}
    ></textarea>
  </div>
</div>


<button
type="submit"
disabled={!isSignedIn ||  !selectedCollection ||  isLoading}
style={{
cursor: !isSignedIn ||  !selectedCollection  ||  isLoading ?  'none' : 'pointer',
backgroundColor: !isSignedIn ||  !selectedCollection  || isLoading ? '#9e9e9e' : '#00a8ff',
color: !isSignedIn ||  !selectedCollection   || isLoading ? 'grey' : '#fff',

}} >

{isLoading ? <BeatLoader color='blue' /> : 'Update'}
</button> 
<button style={{backgroundColor:'red'}} onClick={handleCancel}>Cancel</button>

</form>
</div>
</>
)
}
