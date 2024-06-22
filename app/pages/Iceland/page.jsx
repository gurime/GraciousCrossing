import AdminHeader from '@/app/components/AdminHeader'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import IcelandListings from './IcelandListings'
import Footer from '@/app/components/Footer'


export const metadata = {
    title: 'Iceland Listings - Gracious Crossing',
    description: 'Explore a curated collection of exquisite Iceland homes and apartments on Gracious Crossing. Find your dream living space among our luxury apartments, each offering a perfect blend of elegance and comfort.',
    keywords: ['Iceland listings', 'real estate', 'elegance and comfort'],
    author: 'Phillip Bailey',
  };
  


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<IcelandListings/>
<Footer/>
</>
)
}
