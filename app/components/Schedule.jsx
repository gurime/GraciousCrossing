'use client'
import React, { useState } from 'react';



export default function Schedule({post}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      // Reset the selected date when closing the modal
      setSelectedDate(null);
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleScheduleTour = () => {
      // You can implement logic to handle the scheduled tour here
      // This might involve sending the selectedDate to a backend for storage
      // and managing the availability of the property
      console.log(`Tour scheduled for ${selectedDate}`);
      closeModal();
    };

  const plainPost = JSON.parse(JSON.stringify(post));


return (
<>
<button
style={{
padding: '1rem',
outline: 'none',
border: 'none',
background: '#0059e0',
color: '#fff',
cursor:'pointer',
fontSize: '16px',
lineHeight: '24px',
fontWeight: '600',
margin: '0 0 1rem 0',}}
onClick={openModal}
>
Schedule a Tour
</button>

{isModalOpen && (
<div
style={{
position: 'fixed',
top: '0',
left: '0',
width: '100%',
height: '100%',
background: 'rgba(0, 0, 0, 0.5)',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}}
>
<div
style={{
background: '#fff',
padding: '2rem',

borderRadius: '8px',}}>
{/* Your modal content goes here */}
<p>Modal Content</p>

<div className='scheduletour'>
              
              <div style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center'
              }}>

                <div style={{
                    marginRight:'16px'
                }}><img src={plainPost.cover_image} alt="" /></div>
                <div style={{
                    flexGrow:'1'                }}> <p style={{ padding: '0 0 0 15px' }}>{plainPost.address}</p>
                <p style={{ padding: '0 0 0 15px' }}>{plainPost.bathrooms} Bath | {plainPost.bedrooms} Beds | {plainPost.square} sqft</p></div>
               
              </div>
            </div>


<p>Select a Date:</p>
            <input
              type="date"
              value={selectedDate || ''}
              onChange={(e) => handleDateChange(e.target.value)}
            />

            
            {/* Convert post data to JSON string */}
            <button onClick={handleScheduleTour}>Schedule Tour</button>

<button onClick={closeModal}>Close Modal</button>
</div>
</div>
)}
</>
);
}
