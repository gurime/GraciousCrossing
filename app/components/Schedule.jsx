'use client'
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function Schedule({post}) {
  const [names, setNames] = useState('');

const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedDate, setSelectedDate] = useState(new Date());
const [selectedTime, setSelectedTime] = useState("");
    


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
      setSelectedTime
    };

    const handleTimeChange = (event) => {
      setSelectedTime(event.target.value);
    };
  
const handleScheduleTour = async (e) => {
e.preventDefault();
try {
const auth = getAuth();
const user = auth.currentUser;
setIsLoading(true);
const db = getFirestore();
const docRef = await addDoc(collection(db, 'scheduletour'), {
timestamp: new Date(),
userId: user.uid,
userEmail: user.email,
names:names,
selectedDate:selectedDate,
selectedTime:selectedTime
});
      
setNames('');
    setSelectedDate(new Date());


    
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

  }
  };

return (
<>
<button
className='openmodal'
style={{
padding: '1rem',
outline: 'none',
border: 'none',
background: '#0059e0',
color: '#fff',
cursor:'pointer',
fontWeight: '600',
margin: '0 0 1rem 0',}}
onClick={openModal}
>
Schedule a Tour <br />
<small style={{letterSpacing:'1px',fontSize:'9px'}}>as early as {post.tourTime} tomorrow</small>


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
<p >{post.address}</p>
{/* <p>{post.address.slice(-12)}</p> */}

</div>

<div className='sm-ba'><p  ><b>{post.bathrooms}</b> Bath | <b>{post.bedrooms}</b> Beds | <b>{post.square} </b>sqft</p></div>
   </div>            
</div>
</div>
<p style={{textAlign:'center'}}>Select a Date & Time:</p>
<div style={{display:'grid',alignItems:'center'}}> 
<div style={{ marginLeft: '10px', maxWidth: '90%' }}>
  <div> <label style={{marginBottom:'1rem'}}>Date:</label>
  <input
    style={{
      width:'100%',
      padding:'1rem',
      marginBottom:'10px',
      border:'1px solid #1057d4',
      borderRadius:'4px',
      outline:'none'
    }}
    type="date"
    value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
    onChange={(e) => handleDateChange(new Date(e.target.value))}
    min={new Date().toISOString().split('T')[0]}
  /></div>
 
<div>  <label style={{marginBottom:'1rem'}}>Time:</label>
  <select
  style={{
    width:'100%',
    padding:'1rem',
    marginBottom:'10px',
    border:'1px solid #1057d4',
    borderRadius:'4px',
    outline:'none'
  }}
  value={selectedTime} onChange={handleTimeChange}>
   <option value="9:00 AM">9:00 AM</option>
  <option value="9:30 AM">9:30 AM</option>
  <option value="9:40 AM">9:40 AM</option>
  <option value="10:00 AM">10:00 AM</option>
  <option value="10:30 AM">10:30 AM</option>
  <option value="10:40 AM">10:40 AM</option>
  <option value="11:00 AM">11:00 AM</option>
  <option value="11:30 AM">11:30 AM</option>
  <option value="11:40 AM">11:40 AM</option>
  <option value="12:00 PM">12:00 PM</option>
  <option value="12:30 PM">12:30 PM</option>
  <option value="12:40 PM">12:40 PM</option>
  <option value="1:00 PM">1:00 PM</option>
  <option value="1:30 PM">1:30 PM</option>
  <option value="1:40 PM">1:40 PM</option>
  <option value="2:00 PM">2:00 PM</option>
  <option value="2:30 PM">2:30 PM</option>
  <option value="2:40 PM">2:40 PM</option>
  <option value="3:00 PM">3:00 PM</option>
  <option value="3:30 PM">3:30 PM</option>
  <option value="3:40 PM">3:40 PM</option>
  <option value="4:00 PM">4:00 PM</option>
  <option value="4:30 PM">4:30 PM</option>
  <option value="4:40 PM">4:40 PM</option>
  </select>
</div>

</div>

<div className='sm-schedule' style={{marginLeft:'10px',maxWidth:'90%'}}>
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
  width:'100%'
}}
placeholder='Full Name'
value={names} onChange={(e) => setNames(e.target.value)} required/>
         </div>




<button 
disabled={ !names || !selectedDate ||   isLoading}

style={{marginBottom:'1rem',
cursor: !names || !selectedDate ||  isLoading ?  'none' : 'pointer',
backgroundColor: !names || !selectedDate ||  isLoading ? '#9e9e9e' : '#00a8ff',
color: !names || !selectedDate  || isLoading ? 'grey' : '#fff',
}} className='edit-btn' onClick={handleScheduleTour}>Schedule Tour</button>

<button className='delete-btn' onClick={closeModal}>Close Modal</button></div>

{successMessage && <p>{successMessage}</p>}

</div>
</div>
)}
</>
);
}
