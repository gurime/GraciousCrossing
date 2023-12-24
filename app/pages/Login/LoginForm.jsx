'use client'
import { auth, db } from '@/app/Config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners';
import gc from '../../img/Gracious-crossing.png'
import Link from 'next/link';

export default function LoginForm() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [errorState, setErrorState] = useState(null);
 const [isInputValid, setIsInputValid] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const router = useRouter()  
     
 const handleLogin = async (e) => {
 e.preventDefault();
 try {
 setIsLoading(true);
 validateInputs();
 const userCredential = await signInWithEmailAndPassword(auth, email, password);
 const user = userCredential.user;
 router.push('/');
 } catch (error) {
 setErrorState('Authentication failed. Please check your credentials and try again.');
 } finally {
 setIsLoading(false);
 }
 }
        
const validateInputs = () => {
if (email === '' || password === '') {
setIsInputValid(false);
} else {
setIsInputValid(true);
}
};
return (
<>
<div className='registerwall'>
<form style={{width:'30rem'}} className='formbox' onSubmit={handleLogin}>

<Image src={gc} width={500} height={60} alt='...'/>
<label htmlFor='email'>Email</label>
<input
type='email'
id='email'
value={email}
onChange={(e) => {
setEmail(e.target.value);
validateInputs();}}
/>

<label htmlFor='password'>Password</label>
<input
type='password'
id='password'
value={password}
onChange={(e) => {
setPassword(e.target.value);
validateInputs();}}
/>
<div
className='payment-title'
style={{
display: 'flex',
justifyContent: 'center'}}>
<p>
<Link href='/pages/Register'>Need An Account</Link>
</p>
</div>
<div className='error'>{errorState && <p>{errorState}</p>}</div>
<button type='submit' disabled={!isInputValid || isLoading}>
  {isLoading ? <BeatLoader color='blue' /> : 'Login'}
</button>
</form>
 
</div>
</>
)
}
