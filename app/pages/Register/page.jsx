import React from 'react'
import RegisterForm from './RegisterForm'
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
export const metadata = {
    title: 'Register - Gracious Crossing',
    description: 'Sign up with Gracious Crossing to unlock exclusive features. Register for an account and start your journey to discover dream homes that blend elegance with comfort.',
    keywords: ['register', 'sign up', 'user account', 'exclusive features', 'real estate registration'],
    author: 'Phillip Bailey',
  };
  
export default function Register() {
return (
<>
<Navbar/>
<RegisterForm/>
<Footer/>
</>
)
}
