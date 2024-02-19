'use client'
import React, { useState } from 'react';
import { auth, db } from '@/app/Config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import itcontribte from '../../img/gracious_logo.png';

export default function LoginForm() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorState, setErrorState] = useState(null);
const [isInputValid, setIsInputValid] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const router = useRouter();

const handleLogin = async (e) => {
e.preventDefault();
try {
setIsLoading(true);
validateInputs();

const adminUsersSnapshot = await getDocs(collection(db, 'adminusers'));
const isAdminUser = adminUsersSnapshot.docs.some(doc => doc.data().email === email);

if (!isAdminUser) {
throw new Error('Authentication failed. Only admin users are allowed.');
}
  
const userCredential = await signInWithEmailAndPassword(auth, email, password);
const user = userCredential.user;
router.push('/pages/Admin');
} catch (error) {
setErrorState(error.message);
} finally {
setIsLoading(false);
}
}

const validateInputs = () => {
setIsInputValid(email !== '' && password !== '');
};

return (
<>
<div className='contribute-box'>
<div className='contribute-leftbox' style={{ marginBottom: '10rem' }}>
<Image style={{ backgroundColor: '#a67eef', padding: '20px', cursor: 'none' }} src={itcontribte} alt='...' />
<form className='formbox' onSubmit={handleLogin}>
<label htmlFor='email'>Email</label>
<input
type='email'
id='email'
value={email}
onChange={(e) => {setEmail(e.target.value);validateInputs();}}/>

<label htmlFor='password'>Password</label>
<input
type='password'
id='password'
value={password}
onChange={(e) => {setPassword(e.target.value);validateInputs();}}/>

<div className='error'>{errorState && <p>{errorState}</p>}</div>
<button
type='submit'
disabled={!isInputValid || isLoading}
style={{
cursor: !isInputValid || isLoading ? 'not-allowed' : 'pointer',
backgroundColor: !isInputValid || isLoading ? '#d3d3d3' : '#007bff',
color: !isInputValid || isLoading ? '#a9a9a9' : '#fff',
}}>
{isLoading ? <BeatLoader color='blue' /> : 'Login'}
</button>
</form>
</div>
</div>
</>
);
}