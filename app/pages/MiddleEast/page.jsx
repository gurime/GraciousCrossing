import AdminHeader from '@/app/components/AdminHeader'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import MiddleEastListings from './MiddleEastListings';

export const metadata = {
    title: 'Middle East Listings - Gracious Crossing',
    description: 'Explore a curated collection of exquisite Middle East homes and apartments on Gracious Crossing. Find your dream living space among our luxury apartments, each offering a perfect blend of elegance and comfort.',
    keywords: ['Middle East listings', 'real estate', 'elegance and comfort'],
    author: 'Phillip Bailey',
  };
  


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<MiddleEastListings/>
<Footer/>
</>
)
}
