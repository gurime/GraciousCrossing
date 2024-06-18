import AdminHeader from '@/app/components/AdminHeader';
import Navbar from '@/app/components/Navbar';
import React from 'react'
import CaribbeanListings from './CaribbeanListings';
import Footer from '@/app/components/Footer';


export const metadata = {
    title: 'Caribbean Listings - Gracious Crossing',
    description: 'Explore a curated collection of exquisite Caribbean homes and apartments on Gracious Crossing. Find your dream living space among our luxury apartments, each offering a perfect blend of elegance and comfort.',
    keywords: ['Caribbean listings', 'real estate', 'elegance and comfort'],
    author: 'Phillip Bailey',
  };
  


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<CaribbeanListings/>
<Footer/>
</>
)
}
