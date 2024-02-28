'use client'
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react'

export default function ContactAgent() {
    const [names, setNames] = useState('');
    const [phone, setPhone] = useState('');
    const [content, setContent] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

      const handleScheduleTour = async (e) => {
        e.preventDefault();
        try {
        const auth = getAuth();
        const user = auth.currentUser;
        setIsLoading(true);
        const db = getFirestore();
        const docRef = await addDoc(collection(db, 'contactagent'), {
        timestamp: new Date(),
        userId: user.uid,
        userEmail: user.email,
        names:names,
        content:content,
        phone:phone
        });
              
        setNames('');
        setPhone('');
        
        
            
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
<button className='openmodalcontact' style={{
padding:'1rem',
outline:'none',
border:'1px solid #0059e0',
fontSize:'16px',
cursor:'pointer',
lineHeight:'24px',
color:'#0059e0',
backgroundColor:'#fff'
}}
onClick={openModal}>Contact Agent</button>


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


<div className='schedulecontact'>
              
        <h4 style={{fontSize:'20px',textAlign:'center'}}>Contact Agent</h4>


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
placeholder='Phone Number'
value={phone} onChange={(e) => setPhone(e.target.value)} required/>




         </div>

         <textarea
rows="10"
cols="50"
placeholder='Describe your property'
required
value={content}
onChange={(e) => setContent(e.target.value)}

></textarea>


<button 
disabled={ !names || !phone || !content ||  isLoading}

style={{marginBottom:'1rem',
cursor: !names || !phone || !content || isLoading ?  'none' : 'pointer',
backgroundColor: !names || !phone || !content || isLoading ? '#9e9e9e' : '#00a8ff',
color: !names || !phone  || !content || isLoading ? 'grey' : '#fff',
}} className='edit-btn' onClick={handleScheduleTour}>Schedule Tour</button>

<button className='delete-btn' onClick={closeModal}>Close Modal</button>
</div>

{successMessage && <p>{successMessage}</p>}

</div>
</div>
)}
</>
)
}
