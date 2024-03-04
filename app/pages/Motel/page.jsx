import React from 'react'
import MotelListing from './MotelListing'
import Navbar from '@/app/components/Navbar';
import AdminHeader from '@/app/components/AdminHeader';
import Footer from '@/app/components/Footer';


export const metadata = {
    title: 'Motel Listings - Gracious Crossing',
    description: 'Discover a thoughtfully curated selection of exceptional motels on Gracious Crossing. Find your ideal stay among our quality accommodations, each providing a harmonious balance of convenience and comfort.',
    keywords: ['motel listings', 'lodging', 'accommodations for rent', 'quality motels', 'convenience and comfort'],
    author: 'Phillip Bailey',
};


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<MotelListing/>
<Footer/>
</>
)
}
