'use client'
import Image from 'next/image'
import React from 'react'
import searchimg from '../img/white_search.png'
import Link from 'next/link'
import cardimg1 from '../img/home-card1.jpeg'
import cardimg2 from '../img/home-card2.jpg'
import cardimg3 from '../img/home-card3.jpg'
import card1 from "../img/card1-img.jpeg" 
import card2 from "../img/bg-card3.jpg"
import card3 from "../img/bg-card2.jpg"
import { useRouter } from 'next/navigation'
export default function HeroHome() {
const router = useRouter()
return (
<>
<div className="hero">
<h1>Welcome to Gracious Crossing </h1>
<div className="search-box">
<h2 style={{color:'#fff'}}>We will find you the perfect home</h2>

<form className='heroform' >
<input placeholder="Find your next destination"
type="type"
spellCheck="false"
dir="auto"
tabIndex={0}


/>
<button className="form-btn" type="submit" >
<Image src={searchimg} width={20} alt='...'  />
</button>

</form>
</div>
</div>

<div className="card-block">
<div className="tagline-header">
<h1>Find the best homes</h1>
<p>Browse some of the highest 
quality homes, list your property, 
sign a lease and more.</p>
<Link href='#!'>More Info</Link>
</div>
<Image height={300} src={cardimg1} alt="" priority/>
</div>

<div className="card-block card-block-reverse">
<Image height={300} src={cardimg2} alt="" priority/>
<div className="tagline-header tagline-header-reverse">
<h1>List your property</h1>
<p>Reach millions of renters by listing your property.</p>
<Link href='#!'>Add your listings</Link>
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
<button>Learn More</button>
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
