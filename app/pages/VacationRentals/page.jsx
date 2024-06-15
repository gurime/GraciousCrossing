import AdminHeader from '@/app/components/AdminHeader';
import React from 'react'
import VacationListing from './VacationListing';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';




export const metadata = {
    title: 'Vacation Rental Listings - Gracious Crossing',
    description: 'Discover a thoughtfully curated selection of exceptional Vacation Rental Properties on Gracious Crossing. Find your ideal stay among our quality accommodations, each providing a harmonious balance of convenience and comfort.',
    keywords: ['Vacation Rental', 'convenience and comfort'],
    author: 'Phillip Bailey',
};


export default function page() {
  return (
<>
<AdminHeader/>
<Navbar/>
<VacationListing/>
<Footer/>
</>
)
}
