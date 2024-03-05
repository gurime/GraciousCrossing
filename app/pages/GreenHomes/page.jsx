import React from 'react'
import AdminHeader from '../../components/AdminHeader';
import Navbar from '../../components/Navbar';
import GreenHomeLisitng from './GreenHomeLisitng';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Eco-Friendly Green Homes - Gracious Crossing',
    description: 'Explore a curated collection of exquisite properties on Gracious Crossing. Find your dream home among our luxury homes, each offering a perfect blend of elegance and comfort with a focus on eco-friendliness.',
    keywords: ['property listings', 'real estate', 'homes for sale', 'luxury homes', 'elegance and comfort', 'eco-friendly homes'],
    author: 'Phillip Bailey',
};


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<GreenHomeLisitng/>
<Footer/>
</>
)
}
