import AdminHeader from '@/app/components/AdminHeader'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import AustraliaListings from './AustraliaListings'


export const metadata = {
    title: 'Australia Listings - Gracious Crossing',
    description: 'Explore a curated collection of exquisite Australia homes and apartments on Gracious Crossing. Find your dream living space among our luxury apartments, each offering a perfect blend of elegance and comfort.',
    keywords: ['Australia listings', 'real estate', 'elegance and comfort'],
    author: 'Phillip Bailey',
  };
  
  



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<AustraliaListings/>
<Footer/>
</>
)
}
