import AdminHeader from '@/app/components/AdminHeader';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React from 'react'
import AfricaListings from './AfricaListings';

export const metadata = {
    title: 'Africa Listings - Gracious Crossing',
    description: 'Explore a curated collection of exquisite Africa homes and apartments on Gracious Crossing. Find your dream living space among our luxury apartments, each offering a perfect blend of elegance and comfort.',
    keywords: ['Africa listings', 'real estate', 'elegance and comfort'],
    author: 'Phillip Bailey',
  };
  


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<AfricaListings/>
<Footer/>
</>
)
}
