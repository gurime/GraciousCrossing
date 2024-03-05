import AdminHeader from '@/app/components/AdminHeader';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React from 'react'
import HistoricLisitngs from './HistoricLisitngs';


export const metadata = {
    title: 'Historic Homes - Gracious Crossing',
    description: 'Explore a curated collection of exquisite historic homes on Gracious Crossing. Find your dream residence among our heritage properties, each showcasing a unique blend of history, charm, and comfort.',
    keywords: ['historic homes', 'real estate', 'heritage properties', 'homes for sale', 'charm and comfort'],
    author: 'Phillip Bailey',
};




export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<HistoricLisitngs/>
<Footer/>
</>
)
}
