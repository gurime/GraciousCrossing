'use client'
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';



export default function Schedule({post}) {
  const [names, setNames] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [time, setTime] = useState({
      raw: '', // store the raw 24-hour format
      formatted: '', // store the formatted 12-hour format
    });    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 16));
const router = useRouter()
  
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
  
const handleScheduleTour = async (e) => {
e.preventDefault();
try {
const auth = getAuth();
const user = auth.currentUser;
setIsLoading(true);
const db = getFirestore();
const docRef = await addDoc(collection(db, 'scheduletour'), {
time: time.formatted,
timestamp: new Date(),
userId: user.uid,
userEmail: user.email,
names:names
});
      
setNames('');
setTime({
  raw: '',
  formatted: '',
});
setSelectedDate(new Date().toISOString().substring(0, 16));

    
    //  router.push('/pages/Contact/Confirmation')
  setSuccessMessage('Thank you for your message')
   setTimeout(() => {
  setSuccessMessage('');
  }, 3000);

  } catch (error) {
        
  setErrorMessage('Error submitting form. Please try again.');
  setTimeout(() => {
  setErrorMessage('');
  }, 3000);
  } finally {
  setIsLoading(false);
  }
  };

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
className="modal-content"
style={{
background: '#fff',
padding: '2rem',
animation: 'bounceIn 0.5s', // Add animation property


borderRadius: '8px',}}>
{/* Your modal content goes here */}


<div className='scheduletour'>
              
<div className='flexboximage' >

<div style={{marginRight:'16px'}}><img src={post.cover_image} alt="" />
</div>
<div style={{display:'grid',alignItems:'center'}}>
<div className='sm-ba'> 
<p >{post.address.slice(0,12)}</p>

</div>

<div className='sm-ba'><p  ><b>{post.bathrooms}</b> Bath | <b>{post.bedrooms}</b> Beds | <b>{post.square} </b>sqft</p></div>
   </div>            
</div>
</div>
<p style={{textAlign:'center'}}>Select a Date & Time:</p>
<div style={{display:'grid',alignItems:'center'}}>            
  <input style={{marginBottom:'1rem',  
  padding:'1rem',
  borderRadius: '5px',
  border: '1px solid #6d1ffa',
  color: '#000',
  backgroundColor:'#fff',
  outline:'none',
  textIndent: '7px'}} 
  required
              type="date"
              value={selectedDate || ''}
              onChange={(e) => handleDateChange(e.target.value)}
            />
<input
  style={{
    marginBottom: '1rem',
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #6d1ffa',
    outline: 'none',
    textIndent: '7px',
    color: '#000',
    backgroundColor:'#fff'
  }}
  required
  type="time"
  placeholder='Time Between 11AM & 3PM'
  value={time.raw}
  onChange={(e) => {
    const rawTime = e.target.value;
    const formattedTime = new Date(`2000-01-01T${rawTime}`);
    setTime({
      raw: rawTime,
      formatted: formattedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  }}
/>

<input
type="text"
name="fname"
style={{
  marginBottom: '1rem',
  padding: '1rem',
  borderRadius: '5px',
  border: '1px solid #6d1ffa',
  outline: 'none',
  textIndent: '7px',
}}
placeholder='Full Name'
value={names} onChange={(e) => setNames(e.target.value)} required/>
            {/* Convert post data to JSON string */}
<button 
disabled={!time || !names || !selectedDate ||   isLoading}

style={{marginBottom:'1rem',
cursor: !time || !names || !selectedDate ||  isLoading ?  'none' : 'pointer',
backgroundColor: !time || !names || !selectedDate ||  isLoading ? '#9e9e9e' : '#00a8ff',
color: !time || !names || !selectedDate  || isLoading ? 'grey' : '#fff',
}} className='edit-btn' onClick={handleScheduleTour}>Schedule Tour</button>

<button className='delete-btn' onClick={closeModal}>Close Modal</button></div>

{successMessage && successMessage}

</div>
</div>
)}
</>
);
}
