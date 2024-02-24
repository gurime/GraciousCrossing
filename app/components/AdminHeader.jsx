'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { auth } from '../Config/firebase';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Link from 'next/link';

export default function AdminHeader() {
    const [adminisSignedIn, setIsSignedIn] = useState(false);
const [adminnames, setNames] = useState([]);
const router = useRouter()
const isAdmin = adminisSignedIn && adminnames.length === 2;

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            // Fetch user data from Firestore
            const userData = await getUserData(user.uid);          
            setNames([userData.firstName, userData.lastName]);
            setIsSignedIn(true);
          } catch (error) {
            console.error(error.message);
          }
        } else {
          setIsSignedIn(false);
          setNames([]); // Clear names when no user is signed in
        }
      });
    // Add event listener to the document body
      
      
      
    const getUserData = async (userId) => {
    try {
    const db = getFirestore();
    const userDocRef = doc(db, 'adminusers', userId);
    const userDocSnapshot = await getDoc(userDocRef);    
    if (userDocSnapshot.exists()) {
    const userData = userDocSnapshot.data();
    return userData;
    } else {
    return null;
    }
    } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error;
    }
    };
    return () => {
    unsubscribe(); // Assuming you have an unsubscribe function
    };
    }, []);
      
    
    const handleLogout = async () => {
      try {
      await auth.signOut();
      router.push('/pages/AdminLogin')
      } catch (error) {
      }
      };
return (
<>

<div className='adminnav'>
<ul className='navlinks'>
<Link href='/'>Home</Link>

{adminisSignedIn ? (
<Link  href='/pages/Admin'>
    
{adminnames.length === 2 && (
<>
<span className="sm-name" >{adminnames[0]}</span>
<span className="sm-name">{adminnames[1]}</span>
<button onClick={handleLogout}>Logout</button>
</>
)}
</Link>
) : (
  <div className="commentreg-box">
    <span
      style={{ margin: '10px', color: '#fff', cursor: 'pointer' }}
      onClick={() => router.push('/pages/AdminLogin')}
    >
      Admin
    </span>
  
  </div>
)} </ul>
</div>

</>
)
}
