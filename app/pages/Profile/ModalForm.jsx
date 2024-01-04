'use client'
import React, { useState } from 'react';

export default function ModalForm({  comment, onSave, onCancel  }) {
    // Initialize state with existingData or an empty object
    const [editedContent, setEditedContent] = useState(comment.content,comment.address);
    const handleSave = () => {
    onSave(comment.id, editedContent);
    };
    const [title, setTitle] = useState(comment.title || '');
    const [owner, setOwner] = useState(comment.owner || '');
    const [price, setPrice] = useState(comment.price || '');
    const [address, setAddress] = useState(comment.address || '');
    const [water, setWater] = useState(comment.water || '');
    const [lights, setLights] = useState(comment.lights || '');
    const [cable, setCable] = useState(comment.cable || '');
    const [pool, setPool] = useState(comment.pool || '');
    const [billingFrequency, setBillingFrequency] = useState(comment.billingFrequency || '');
    const [bathrooms, setBathrooms] = useState(comment.bathrooms || '');
    const [bedrooms, setBedrooms] = useState(comment.bedrooms || '');
    const [laundry, setLaundry] = useState(comment.laundry || '');
    const [heating, setHeating] = useState(comment.heating || '');
    const [airConditioning, setAirConditioning] = useState(comment.airConditioning || '');
    // ... (initialize other state variables)
  
    // Placeholder for functions
    const handleCoverImageChange = (e) => {
      // Implement your logic here
    };
  
    const handleShowcase1Change = (e) => {
      // Implement your logic here
    };
  
    const handleShowcase2Change = (e) => {
      // Implement your logic here
    };
  
    const handleShowcase3Change = (e) => {
      // Implement your logic here
    };

    return (
<>
{/* post form start here here */}
<div className="property-hero">
<form className="postform" onSubmit={handleSubmit}>
{isSignedIn ? (
<div className="commentreg-box">
{names.length === 2 && (
<>
<div className='navinfo-box'>
<span  className="navinfo">{names[0]}</span>
<span  className="navinfo">{names[1]}</span>
</div>
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
</div>
</>
    );
}
