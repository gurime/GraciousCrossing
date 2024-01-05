'use client'
import React, { useEffect, useState } from 'react';

export default function ModalForm({  comment, onSave, onCancel  }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [ isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [showcase1File, setShowcase1File] = useState(null);  
  const [showcase2File, setShowcase2File] = useState(null);  
  const [showcase3File, setShowcase3File] = useState(null); 
    // Initialize state with existingData or an empty object
    const [editedContent, setEditedContent] = useState({
      title: comment.title || '',
      owner: comment.owner || '',
      price: comment.price || '',
      address: comment.address || '',
      water: comment.water || '',
      lights: comment.lights || '',
      cable: comment.cable || '',
      pool: comment.pool || '',
      billingFrequency: comment.billingFrequency || '',
      bathrooms: comment.bathrooms || '',
      bedrooms: comment.bedrooms || '',
      laundry: comment.laundry || '',
      heating: comment.heating || '',
      airConditioning: comment.airConditioning || '',
      selectedCollection: comment.selectedCollection || '',
      content: comment.content || '',
    });

    useEffect(() => {
      // If any additional properties are added to comment dynamically,
      // update the editedContent state accordingly in this useEffect.
      // For example:
      // setEditedContent(prevContent => ({ ...prevContent, newProperty: comment.newProperty || '' }));
    }, [comment]);


    const handleCheckboxChange = (propertyName) => {
      setEditedContent((prevContent) => ({ ...prevContent, [propertyName]: !prevContent[propertyName] }));
    };
  
    const handleInputChange = (propertyName, value) => {
      setEditedContent((prevContent) => ({ ...prevContent, [propertyName]: value }));
    };
  
    const handleSave = (e) => {
      e.preventDefault();
      onSave(comment.id, editedContent);
      // Reset the form or handle other logic as needed
    };
  
    // Placeholder for functions
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
{/* post form start here here */}
<form className="postform" onSubmit={handleSave}>

{/* post form start here here */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', alignItems: 'center' }}>
<label htmlFor="title">Property Name</label>
<input
type="text"
name="title"
value={editedContent.title}
onChange={(e) => handleInputChange('title', e.target.value)}
required
/>

<label htmlFor="owner">Owner</label>
<input
type="text"
name="owner"
value={editedContent.owner}
onChange={(e) => handleInputChange('owner', e.target.value)}
required
/>

<label htmlFor="price">Price</label>
<input
type="text"
name="price"
value={editedContent.price}
onChange={(e) => handleInputChange('price', e.target.value)}
required
/>

<select
style={{marginLeft:'1px'}}
name="billingFrequency"
value={editedContent.billingFrequency}
onChange={(e) => handleInputChange('billingFrequency', e.target.value)}
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
value={editedContent.selectedCollection}
onChange={(e) => handleInputChange('selectedCollection', e.target.value)}
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
value={editedContent.bedrooms}
onChange={(e) => handleInputChange('bedrooms', e.target.value)}
required
/>

<label htmlFor="bathrooms">Bathrooms</label>
<input
type="number"
name="bathrooms"
value={editedContent.bathrooms}
onChange={(e) => handleInputChange('bathrooms', e.target.value)}
required
/>

<label style={{ fontWeight: '600' }} htmlFor="amenities">Amenities</label>
<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
<input
type="checkbox"
id="water"
name="water"
checked={editedContent.water}
onChange={(e) => handleCheckboxChange('water', e.target.value)}
/>
<label htmlFor="water">Water</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
<input
type="checkbox"
id="lights"
name="lights"
checked={editedContent.lights}
onChange={(e) => handleCheckboxChange('lights', e.target.value)}
/>
<label htmlFor="lights">Lights</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
<input
type="checkbox"
id="cable"
name="cable"
checked={editedContent.cable}
onChange={(e) => handleCheckboxChange('cable', e.target.value)}
/>
<label htmlFor="cable">Cable</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
<input
type="checkbox"
id="laundry"
name="laundry"
checked={editedContent.laundry}
onChange={(e) => handleCheckboxChange('laundry', e.target.value)}
/>
<label htmlFor="laundry">Laundry</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
<input
type="checkbox"
id="airConditioning"
name="airConditioning"
checked={editedContent.airConditioning}
onChange={(e) => handleCheckboxChange('airConditioning', e.target.value)}
/>
<label htmlFor="airConditioning">AC</label>
</div>

<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', margin: '1rem 0'}}>
<input
type="checkbox"
id="heating"
name="heating"
checked={editedContent.heating}
onChange={(e) => handleCheckboxChange('heating', e.target.value)}
/>
<label htmlFor="heating">Heating</label>
</div>
<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', margin: '1rem 0', borderBottom: 'solid 1px grey' }}>
<input
type="checkbox"
id="pool"
name="pool"
checked={editedContent.pool}
onChange={(e) => handleCheckboxChange('pool', e.target.value)}
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
value={editedContent.address}
onChange={(e) => handleInputChange('address', e.target.value)}
required
/>

<textarea
rows="5"
cols="50"
placeholder='Describe your property'
required
value={editedContent.content}
onChange={(e) => handleInputChange('content', e.target.value)}
></textarea>

<button
type="submit"
// disabled={!isSignedIn || !content || !selectedCollection || isLoading}
// style={{
// cursor: !isSignedIn || !content || !selectedCollection || isLoading ? 'not-allowed' : 'pointer',
// backgroundColor: !isSignedIn || !content || !selectedCollection || isLoading ? '#d3d3d3' : '#007bff',
// color: !isSignedIn || !content || !selectedCollection || isLoading ? '#a9a9a9' : '#fff',
// }}
>
{isLoading ? <BeatLoader color='white' /> : 'Update'}
</button>

{errorMessage && <p className="error">{errorMessage}</p>}
{successMessage && <p className="success">{successMessage}</p>}
</div>
</form>

</>
    );
}
