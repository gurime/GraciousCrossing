'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import cardimg1 from '../img/home-card1.jpeg'
import cardimg2 from '../img/home-card2.jpg'
import cardimg3 from '../img/home-card3.jpg'
import card1 from "../img/card1-img.jpeg" 
import card2 from "../img/bg-card3.jpg"
import card3 from "../img/bg-card2.jpg"
import sellhome from '../img/sellhome.JPG'
import apartrent from '../img/apart_rent.JPG'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
export default function Tagblock() {
const [isSignedIn, setIsSignedIn] = useState(false);

const router = useRouter()
return (
<>

<div className="property-grid">
<div className='card' style={{display:'grid'}}>
<Image src={sellhome} alt='...'/>
<h1>Sell Your Home</h1>
<p >
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti incidunt suscipit ipsa alias. Explicabo repellat excepturi error similique, quaerat possimus iste ducimus natus qui reiciendis exercitationem dolor. Nihil, illum necessitatibus!</p>
<button onClick={() => router.push('/pages/Houses')}>Sell</button>
</div>
<div className='card'  style={{display:'grid'}}>


<Image src={apartrent}  alt='...'/>
<h1>Apartment For Rent</h1>
<p >
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti incidunt suscipit ipsa alias. Explicabo repellat excepturi error similique, quaerat possimus iste ducimus natus qui reiciendis exercitationem dolor. Nihil, illum necessitatibus!</p>


<button onClick={() => router.push('/pages/Apartments')}>Rent</button>
</div>


</div>


<div className="card-block">
<div className="tagline-header">
<h1>Find the best homes</h1>
<p>Browse some of the highest 
quality homes.</p>
{isSignedIn ? (
<Link href='/pages/Houses'>More Info</Link>
) : (
<p>Please sign in or register to view listings.</p>
)}
</div>
<Image height={300} src={cardimg1} alt="" priority/>
</div>

<div className="card-block card-block-reverse">
<Image height={300} src={cardimg2} alt="" priority/>
<div className="tagline-header tagline-header-reverse">
<h1>List your property</h1>
<p>Reach millions of renters by listing your property.</p>


{isSignedIn ? (
<Link href='/pages/PropertyForm'>Add your listings</Link>
) : (
<p>Please sign in or register to add listings.</p>
)}


</div>
</div>

<div className="card-block">
<div className="tagline-header">
<h1>Tips for new House owners</h1>
<p>Check out our guides for tips on owning your first home.</p>
<Link href='/Articles'>Articles</Link>
</div>
<Image height={300} src={cardimg3} alt="" priority/>
</div>

<div className="cards" >
<div className="card">
<Image src={card1}   style={{width:'100%',height:'auto'}}   alt='...' />
<h2>Find Your Dream Home</h2>
<p>Search our extensive database of homes for sale and find the perfect match for you and your family to call home.</p>
<button
onClick={() => {
window.scrollTo({
top: 0,
behavior: 'smooth', 
});
}}>Search</button>
</div>

<div className="card" >
<Image src={card2} style={{width:'100%',height:'auto'}}  alt='...' />
<h2>Mortgage Calculator</h2>
<p>Use our mortgage calculator to estimate your monthly payments and find a mortgage plan that works for you.</p>

<button onClick={() => router.push('/pages/MortageCalculator')}>Calculate Your Mortgage</button>
</div>

<div className="card">
<Image src={card3}  style={{width:'100%',height:'auto'}}    alt='...'/>
<h2>Contact an Agent</h2>
<p>Get in touch with one of our experienced real estate agents to help guide you through the home buying process.</p>
<button onClick={() => router.push('/pages/Contact')}>Learn More</button>
</div>
</div>
</>
)
}
