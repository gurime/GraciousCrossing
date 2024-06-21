import React from 'react'
import DiversityPage from './DiversityPage'
import AdminHeader from '@/app/components/AdminHeader';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// pages/diversity-inclusion.js

export const metadata = {
    title: 'Diversity and Inclusion - Gracious Crossing',
    description: 'Learn about Gracious Crossing’s commitment to diversity and inclusion. Discover our initiatives to promote an inclusive environment and equal opportunities for everyone.',
    keywords: ['diversity', 'inclusion', 'equal opportunities', 'workplace diversity', 'inclusive environment'],
    author: 'Gracious Crossing Team',
  };
  
  // Rest of the code...
  


export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<DiversityPage/>
<Footer/>
</>
)
}
