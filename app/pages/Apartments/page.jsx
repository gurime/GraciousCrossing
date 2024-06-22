import React from 'react'
import ApartmentList from './AprtmentList'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import AdminHeader from '@/app/components/AdminHeader';


export const metadata = {
  title: 'Apartment Listings - Gracious Crossing',
  description: 'Explore a curated collection of exquisite apartments on Gracious Crossing. Find your dream living space among our luxury apartments, each offering a perfect blend of elegance and comfort.',
  keywords: ['apartment listings', 'real estate', 'apartments for rent', 'luxury apartments', 'elegance and comfort'],
  author: 'Phillip Bailey',
};



export default function page() {
  return (
<>
<AdminHeader/>
<Navbar/>
<ApartmentList/>
<Footer/>
</>
)
}
