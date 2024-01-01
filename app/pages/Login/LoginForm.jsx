'use client'
import { auth} from '@/app/Config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
if (email.trim() === '' || password.trim() === '') {
setIsInputValid(false);
} else {
setIsInputValid(true);
}
};

return (
<>
<div className='registerwall'>
<form  className='formbox' onSubmit={handleLogin}>

<div className='reg_header'><Image src={gc} width={500} height={60} alt='...'/></div>
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
<button type='submit' disabled={!isInputValid || isLoading}
style={{
cursor: !isInputValid || isLoading ? 'not-allowed' : 'pointer',
backgroundColor: !isInputValid || isLoading ? '#d3d3d3' : '#007bff',
color: !isInputValid || isLoading ? '#a9a9a9' : '#fff',
}}>
{isLoading ? <BeatLoader color='blue' /> : 'Login'}
</button>
</form>
 
</div>
</>
)
}
