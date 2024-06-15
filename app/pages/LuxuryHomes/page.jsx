import AdminHeader from '@/app/components/AdminHeader';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React from 'react'
import LuxuryLisiting from './LuxuryListing';



export const metadata = {
    title: 'Luxury Homes - Gracious Crossing',
    description: 'Discover a thoughtfully curated selection of exceptional Luxury Homes on Gracious Crossing.',
    keywords: ['Luxury Homes', 'convenience and comfort'],
    author: 'Phillip Bailey',
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<LuxuryLisiting/>
<Footer/>
</>
)
}
