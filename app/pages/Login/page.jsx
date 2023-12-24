import React from 'react'
import LoginForm from './LoginForm';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
export const metadata = {
title: 'Login - Gracious Crossing',
description: 'Log in to your Gracious Crossing account. Access your personalized dashboard to explore, save, and manage your favorite properties. Your journey to finding the perfect home starts here.',
keywords: ['login', 'sign in', 'user authentication', 'account access', 'real estate login'],
author: 'Phillip Bailey',
};
  
export default function Login() {
  return (
<>
<Navbar/>
<LoginForm/>
<Footer/>
</>
)
}
