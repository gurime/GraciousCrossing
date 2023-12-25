'use client'
import { auth } from '@/app/Config/firebase';
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';

export default function ContactForm() {
const [names, setNames] = useState('');
const [ email, setEmail ] = useState('');
const [ subject, setSubject ] = useState('');
const [contact, setContact] = useState("");
const [content, setContent] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [isSignedIn, setIsSignedIn] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [autoFocus, setAutoFocus] = useState(true);

const router = useRouter()
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
          setNames(userData.names || ''); // Set names to userData.names or an empty string
        } catch (error) {
          setErrorMessage(error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      setIsLoading(true);
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'contacts'), {
        content: content,
        timestamp: new Date(),
        userName: user.displayName,
        userEmail: user.email,
      });
      setContact((prevComments) => [
        ...prevComments,
        {
          id: docRef.id,
          content: content,
          timestamp: new Date(),
          userName: user.displayName,
          userEmail: user.email,
        },
      ]);
  
   router.push('/pages/Contact/Confirmation')
// setSuccessMessage('Thank you for your message')
 setTimeout(() => {
setSuccessMessage('');
}, 3000);
setNames('');
setEmail('');
setSubject('');
setContent('');
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
<Navbar/>
<div className="form-container">
<form className="contactform" onSubmit={handleSubmit}>
<h1>Contact Gracious Crossing</h1>
<label htmlFor='fname' aria-label="Name">Name</label>
<input
type="text"
name="fname"
value={names} onChange={(e) => setNames(e.target.value)} required/>

<label htmlFor='email' aria-label="Email">Email</label>
<input
type="email"
name="email"
aria-describedby="emailError"
value={email}
onChange={(e) => {
setEmail(e.target.value);}}/>

<label htmlFor='subject' aria-label="Subject">Subject</label>
<input
type="text"
name="subject"
aria-describedby="subjectError"
value={subject}
onChange={(e) => setSubject(e.target.value)}/>

<label htmlFor='content' aria-label="Type Your Message">Type Your Message</label>
<textarea
type="text"
name="content"
rows={5}
required
value={content}
onChange={(e) => setContent(e.target.value)}
autoFocus={autoFocus}
aria-describedby="messageError"/>

<button
type="submit"
disabled={!isSignedIn || !content || isLoading}
style={{
cursor: !isSignedIn || !content || isLoading ? 'not-allowed' : 'pointer',
backgroundColor: !isSignedIn || !content || isLoading ? '#d3d3d3' : '#007bff',
color: !isSignedIn || !content || isLoading ? '#a9a9a9' : '#fff',
}}>
{isLoading ? <BeatLoader color='white' /> : 'Submit'}
</button>
</form>
{errorMessage && <p className='error'>{errorMessage.toString()}</p>}
{successMessage && <p className="success">{successMessage}</p>}
</div>
<Footer/>
</>
)
}
