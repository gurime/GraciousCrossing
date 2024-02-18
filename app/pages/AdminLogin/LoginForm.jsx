'use client'
import React, { useState } from 'react';
import { auth } from '@/app/Config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where, getFirestore, getDoc } from 'firebase/firestore';
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

        // Authenticate the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check user role
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        if (userData) {
            if (userData.role === 'admin' && userData.collection === 'adminusers') {
                // Redirect admin users to the Admin page
                router.push('/pages/Admin');
            } else {
                // Non-admin users will not be redirected
                console.log('Regular user logged in.');
            }
        }
    } catch (error) {
        setErrorState('Authentication failed. Please check your credentials and try again.');
    } finally {
        setIsLoading(false);
    }
};


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
              onChange={(e) => {
                setEmail(e.target.value);
                validateInputs();
              }}
            />

            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateInputs();
              }}
            />

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