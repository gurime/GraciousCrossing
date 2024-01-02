import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import ProfileList from './ProfileList';

export const metadata = {
    title: 'Profile - Gracious Crossing',
    description: 'Manage and customize your property listings on Gracious Crossing. Edit or delete your Propertys in our curated collection, each offering a perfect blend of elegance and comfort.',
    keywords: ['profile page', 'property management', 'real estate', 'edit property listings', 'delete property listings'],
    author: 'Phillip Bailey',
};



export default function page() {
return (
<>
<Navbar/>
<ProfileList/>
<Footer/>
</>
)
}
