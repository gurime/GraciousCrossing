'use client'
import React, { useState } from 'react'
import gc from '../../img/Gracious-crossing.png'
import Image from 'next/image'
import { BeatLoader } from 'react-spinners'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/app/Config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
export default function RegisterForm() {
const [ firstName, setFirstName ] = useState('');
const [ lastName, setLastName ]  = useState('');
const [isLoading, setIsLoading] = useState(false);
const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('');
const [errorState, setErrorState] = useState(null);
const [isInputValid, setIsInputValid] = useState(false);
const [passwordStrength, setPasswordStrength] = useState('Weak');
const router = useRouter();
const handleRegister = async (e) => {
e.preventDefault();
try {
setIsLoading(true);
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
await updateProfile(auth.currentUser, {
displayName: `${firstName} ${lastName}`
});
await sendEmailVerification(auth.currentUser);
await setDoc(doc(db, 'users', userCredential.user.uid), {
firstName,
lastName,     
});
router.push('/');
} catch (error) {
if (error.code === 'auth/email-already-in-use') {
setErrorState('That email address is already in use.');
} else {
setErrorState('Registration failed. Please check your details and try again.');
}
} finally {
setIsLoading(false);
}
};

//change color on strength
const strengthToColorMap = {
Weak: 'red',
Moderate: 'orange',
Strong: 'green',
};

function getColor(strength) {
return strengthToColorMap[strength] || '#555';
}
//change color on strength

// check pasword strength
const checkPasswordStrength = (password) => {
const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{15,}$/;
const moderateRegex = /^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*(),.?":{}|<>]).{8,14}$/;
const strength = strongRegex.test(password) ? 'Strong' : moderateRegex.test(password) ?'Moderate' : 'Weak';
setPasswordStrength(strength);
};
// check pasword strength


const validateInputs = () => {
setIsInputValid(email !== '' && isValidEmail(email) && password !== '');
};

// Inside RegisterForm.js
const isValidEmail = (email) => {
// Regular expression for a simple email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
};

return (
<>
<div className='registerwall'>
<form style={{width:'30rem'}} className='formbox'onSubmit={handleRegister}>


{errorState && errorState.includes('email') && (
  <p className='error-message'>{errorState}</p>
)}
<Image src={gc} width={500} height={60} alt='...'/>
<label htmlFor='fname'>First Name</label>
<input type='text'  id='fname' value={firstName} onChange={(e) => setFirstName(e.target.value)} required  maxLength="50"/>


<label htmlFor='lname'>Last Name</label>
<input type='text'  id='lname' value={lastName} onChange={(e) => setLastName(e.target.value)} required maxLength="50"/>

<label htmlFor='email'>Email</label>
<input
type='email'
id='email'
value={email}
onChange={(e) => {
setEmail(e.target.value);
validateInputs();
}}
onBlur={() => {
if (email !== '' && !isValidEmail(email)) {
setErrorState('Please enter a valid email address.');
} else {
setErrorState(null);
}
}}
required
maxLength="254"
title="Please enter a valid email address"
/>

<label htmlFor='password'>Password</label>
<input
type='password'
id='password'
value={password}
onChange={(e) => {
setPassword(e.target.value);
validateInputs();
checkPasswordStrength(e.target.value);
}}
required
minLength="8"
maxLength="100"
title="Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character."
/>

{/* Password strength indicator */}
{/* Password strength indicator */}
<div className={`password-strength`} style={{ color: getColor(passwordStrength) }}>
  <span>Password Strength: {passwordStrength}</span>
</div>

<div 
className="payment-title"
style={{
display:'flex',
justifyContent:'center'   
}}
>

<p><Link  href='/pages/Login'>Already Have An Account</Link></p>
</div>
<div className='error'>{errorState && <p>{errorState}</p>}</div>
<button type='submit' 
disabled={!isInputValid || isLoading}
style={{
cursor: !isInputValid || isLoading ? 'not-allowed' : 'pointer',
backgroundColor: !isInputValid || isLoading ? '#d3d3d3' : '#007bff',
color: !isInputValid || isLoading ? '#a9a9a9' : '#fff',
}}>
{isLoading ? <BeatLoader color='blue' /> : 'Register'}
</button>
</form>
 
</div>
</>
)
}
