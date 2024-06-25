import React from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SellingList from './SellingList';


export const metadata = {
    title: 'Selling Guide - Gracious Crossing',
    description: 'Explore insightful articles on selling your home. Gracious Crossing brings you valuable content to guide you on your journey to finding the perfect home.',
    keywords: ['articles', 'real estate insights', 'homebuying tips', 'property investment', 'housing trends'],
    author: 'Phillip Bailey',
  };


export default function page() {
return (
<>
<Navbar/>
<SellingList/>
<Footer/>
</>
)
}
