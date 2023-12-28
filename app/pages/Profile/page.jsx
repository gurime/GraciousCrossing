import React from 'react'
import Profile from './Profile'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'


export const metadata = {
    title: 'Profile - Gracious Crossing',
    description: 'Manage your listings on Gracious Crossing with ease. Update existing properties and add new ones to showcase. Your profile is your gateway to seamlessly navigate through the world of real estate where elegance meets comfort.',
    keywords: ['profile', 'property management', 'update listings', 'add listings', 'real estate', 'elegance and comfort'],
    author: 'Phillip Bailey',
  };
  



export default function page() {
return (
<>
<Navbar/>
<Profile/>
<Footer/>
</>
)
}
