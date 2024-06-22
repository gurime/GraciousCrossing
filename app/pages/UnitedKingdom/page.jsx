import AdminHeader from '@/app/components/AdminHeader';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React from 'react'
import UnitedKingdomListings from './Uklistings';

export const metadata = {
    title: 'United Kingdom Listings - Gracious Crossing',
    description: 'Explore a curated collection of exquisite United Kingdom homes and apartments on Gracious Crossing. Find your dream living space among our luxury apartments, each offering a perfect blend of elegance and comfort.',
    keywords: ['United Kingdom listings', 'real estate', 'elegance and comfort'],
    author: 'Phillip Bailey',
  };



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<UnitedKingdomListings/>
<Footer/>
</>
)
}
