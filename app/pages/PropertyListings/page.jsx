import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import PropertyLists from './PropertyLists'


export const metadata = {
    title: 'Property Listings - Gracious Crossing',
    description: 'Explore a curated collection of exquisite properties on Gracious Crossing. Find your dream home among our luxury homes, each offering a perfect blend of elegance and comfort.',
    keywords: ['property listings', 'real estate', 'homes for sale', 'luxury homes', 'elegance and comfort'],
    author: 'Phillip Bailey',
  };
  

export default function PropertyListings() {
return (
<>
<Navbar/>
<PropertyLists/>
<Footer/>
</>
)
}
