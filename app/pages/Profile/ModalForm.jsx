'use client'
import React, { useState } from 'react'

export default function ModalForm() {
    const [isSignedIn, setIsSignedIn] = useState(false);
const [content, setContent] = useState("");
const [title, setTitle] = useState("");
const [owner, setOwner] = useState("");
const [price, setPrice] = useState("");
const [billingFrequency, setBillingFrequency] = useState('monthly');
const [bedrooms, setBedrooms] = useState("1");
const [bathrooms, setBathrooms] = useState("1");
const [cable, setCable] = useState("");
const [laundry, setLaundry] = useState("");
const [lights, setLights] = useState("");
const [water, setWater] = useState("");
const [heating, setHeating] = useState("");
const [pool, setPool] = useState("");
const [airConditioning, setAirConditioning] = useState("");
const [address, setAddress] = useState("");
const [ isLoading, setIsLoading] = useState(false)
const [coverImageFile, setCoverImageFile] = useState(null);
const [showcase1File, setShowcase1File] = useState(null);  
const [showcase2File, setShowcase2File] = useState(null);  
const [showcase3File, setShowcase3File] = useState(null);  
const [articleId, setArticleId] = useState("");  
const [ selectedCollection, setSelectedCollection] = useState("Houses")
const [successMessage, setSuccessMessage] = useState("");
const [names, setNames] = useState([]);
const [autoFocus, setAutoFocus] = useState(true);
const [errorMessage, setErrorMessage] = useState('');
const handleSave = async () => {
    try {
      // Implement logic to save the property details to the database
    } catch (error) {
      console.error('Error saving property details:', error);
      setErrorMessage('Error. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } finally {
      // Any cleanup or finalization code can be placed here
    }
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
        
return (
<>
<form className="postform" onSubmit={handleSave}>

{/* post form start here here */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', alignItems: 'center' }}>
<label htmlFor="title">Property Name</label>
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
/>

<label htmlFor="price">Price</label>
<input
type="text"
name="price"
value={price}
onChange={(e) => setPrice(e.target.value)}
required
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
<option value="Apartments">Apartments</option>
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
autoFocus={autoFocus}
></textarea>

<button
type="submit"
disabled={!isSignedIn || !content || !selectedCollection || isLoading}
style={{
cursor: !isSignedIn || !content || !selectedCollection || isLoading ? 'not-allowed' : 'pointer',
backgroundColor: !isSignedIn || !content || !selectedCollection || isLoading ? '#d3d3d3' : '#007bff',
color: !isSignedIn || !content || !selectedCollection || isLoading ? '#a9a9a9' : '#fff',
}}
>
{isLoading ? <BeatLoader color='white' /> : 'Submit'}
</button>

{errorMessage && <p className="error">{errorMessage}</p>}
{successMessage && <p className="success">{successMessage}</p>}
</div>
</form>

</>
)
}
