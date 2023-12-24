'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import searchimg from '../img/white_search.png'
import Link from 'next/link'
import cardimg1 from '../img/home-card1.jpeg'
import cardimg2 from '../img/home-card2.jpg'
import cardimg3 from '../img/home-card3.jpg'
import card1 from "../img/card1-img.jpeg" 
import card2 from "../img/bg-card3.jpg"
import card3 from "../img/bg-card2.jpg"
import { useRouter } from 'next/navigation'
import { collectionRoutes, getArticle } from './Navapi/api'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Config/firebase'
export default function HeroHome() {
    const [forceRender, setForceRender] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isOverlayActive, setIsOverlayActive] = useState(false);

const router = useRouter()
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width:'100%',
    height: '100%',
    background: '#000',
    opacity:'.6',
    display: isOverlayActive ? 'block' : 'none',
    pointerEvents: 'none',
    };

useEffect(() => {
    const handleDocumentClick = (e) => {
        const isClickOutsideSearch = !e.target.closest('.search-container');
        
        if (isClickOutsideSearch) {
            setIsOverlayActive(false);
            setSearchResults([]);
            setSearchTerm(''); // Clear the search input

        }
    };

    document.body.addEventListener('click', handleDocumentClick);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setForceRender((prev) => !prev); // Force re-render

        setIsSignedIn(!!user);    });
    const getUserData = async (userId) => {
        try {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', userId);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                return userData;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
            throw error;
        }
    };

    // Assuming you have an unsubscribe function
    return () => {
        document.body.removeEventListener('click', handleDocumentClick);
        // Make sure to define the unsubscribe function
        // unsubscribe();
    };
}, [searchTerm, isOverlayActive]);

const handleSearch = async () => {
    // Assuming getArticle is a defined function
    const results = await getArticle(searchTerm);
    setSearchResults(results);
};

useEffect(() => {
    handleSearch();
}, [searchTerm]);

            const getLink = (collection, id) => {
                const route = collectionRoutes[collection];
                return route ? `${route}/${id}` : '/';
                };
return (
<>
<div className="hero">
<h1>Welcome to Gracious Crossing </h1>
<div className="search-box">
<h2 style={{color:'#fff'}}>We will find you the perfect home</h2>
<div style={overlayStyle}></div>

<form className='heroform' onSubmit={handleSearch} >
<input placeholder="Find your next destination"
type="type"
spellCheck="false"
dir="auto"
tabIndex={0}
value={searchTerm}
onChange={(e) => {
setSearchTerm(e.target.value);
setIsOverlayActive(e.target.value.trim().length > 0);
}}


/>
{searchResults.length > 0 && searchTerm && !loading && (
<div className="search-results-container">
{searchResults.slice(0,10).map((result) => (
<div key={result.id} className="search-result-item">
<Link key={result.id} href={getLink(result.collection, result.id)}>
<p>{result.title}</p>
</Link>
</div>
))}
</div>
)}
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


{isSignedIn ? (
    <Link href='#!'>Add your listings</Link>
) : (
    <p>Please sign in to add listings.</p>
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
