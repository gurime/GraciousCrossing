import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import NewConstructionList from './NewConstructionList'

export const metadata = {
    title: 'New Construction Homes - Gracious Crossing',
    description: 'Discover a curated selection of newly constructed homes and apartments on Gracious Crossing. Find your ideal living space among our premium properties, each crafted for modern living with a perfect blend of sophistication and convenience.',
    keywords: ['new construction homes', 'real estate', 'apartments for sale', 'premium properties', 'sophistication and convenience'],
    author: 'Phillip Bailey',
  };
  

export default function page() {
return (
<>
<Navbar/>
<NewConstructionList/>
<Footer/>
</>
)
}
