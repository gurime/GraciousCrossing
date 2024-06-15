import AdminHeader from '@/app/components/AdminHeader'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import Footer from '@/app/components/Footer'
import Condominiums from './CondominiumsLisiting';

export const metadata = {
    title: 'Condominiums - Gracious Crossing',
    description: 'Discover a thoughtfully curated selection of exceptional Condominiums on Gracious Crossing.',
    keywords: ['Condominiums', 'convenience and comfort'],
    author: 'Phillip Bailey',
};



export default function page() {
return (
<>
<AdminHeader/>
<Navbar/>
<Condominiums/>
<Footer/>
</>
)
}
