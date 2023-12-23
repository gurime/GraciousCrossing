'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import Navlogo from '../img/gracious.png'
export default function Navbar() {
    const router = useRouter()

return (
<>
<nav className='nav'>
<div className="navlogo">
<Image onClick={() => router.push('/')} src={Navlogo} height={36} alt='...' />
</div>
<ul className="navlinks">
<li><Link href="/">Home</Link></li>
<li><Link href="/About">About</Link></li>
<li><Link href="/Services">Services</Link></li>
<li><Link href="/pages/Contact">Contact</Link></li>
<li><Link href="/pages/Faq">Faq</Link></li>
</ul>
</nav>
</>
)
}
