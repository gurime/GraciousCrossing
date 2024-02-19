import AdminHeader from '@/app/components/AdminHeader'
import React from 'react'
import AdminForm from './AdminForm'
import Footer from '@/app/components/Footer';

export const metadata = {
    title: 'Gracious Crossing - Admin',
    description: 'Access exclusive features as an admin on Gracious Crossing. Register for an admin account and start your journey to manage properties with elegance and comfort.',
    keywords: ['admin account', 'create listings', 'exclusive features', 'real estate management'],
    author: 'Phillip Bailey',
};



export default function page() {
return (
<>
<AdminHeader/>
<AdminForm/>
<Footer/>
</>
)
}
