import AdminHeader from '@/app/components/AdminHeader';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React from 'react'
import HotelListings from './HotelListings';


export const metadata = {
    title: 'Hotel Listings - Gracious Crossing',
    description: 'Discover a thoughtfully curated selection of exceptional Hotels on Gracious Crossing. Find your ideal stay among our quality accommodations, each providing a harmonious balance of convenience and comfort.',
    keywords: ['Hotel listings'],
    author: 'Phillip Bailey',
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<HotelListings/>
<Footer/>
</>
)
}
