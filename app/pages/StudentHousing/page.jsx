import AdminHeader from '@/app/components/AdminHeader';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React from 'react'
import StudentListings from './StudentLisitngs';


export const metadata = {
    title: 'Student Housing Listings - Gracious Crossing',
    description: 'Discover a thoughtfully curated selection of exceptional Student Housing on Gracious Crossing. Find your ideal stay among our quality accommodations, each providing a harmonious balance of convenience and comfort.',
    keywords: ['Student Housing ', 'convenience and comfort'],
    author: 'Phillip Bailey',
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<StudentListings/>
<Footer/>
</>
)
}
