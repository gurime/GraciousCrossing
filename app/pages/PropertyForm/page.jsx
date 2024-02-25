import React from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import PropertyForm from './PropertyForm';


export const metadata = {
title: 'List Your Property - Gracious Crossing',
description: 'Become a part of Gracious Crossing by listing your property. Showcase your home to potential buyers and join our platform where elegance meets comfort in the world of real estate.',
keywords: ['list your property', 'real estate listings', 'property showcase', 'home sellers', 'elegance and comfort'],
author: 'Phillip Bailey',
};
  

export default function page() {
return (
<>
<Navbar/>
<PropertyForm/>
<Footer/>
</>
)
}
