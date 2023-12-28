'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { auth, db } from '@/app/Config/firebase';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';


async function getArticles(orderBy) {
const querySnapshot = await getDocs(collection(db, "extended_stay"));
const data = [];

querySnapshot.forEach((doc) => {
data.push({ id: doc.id, ...doc.data() });
});


  
    return data;
  }


export default function PropertyLists() {
const [fetchError, setFetchError] = useState(null);
const [loading, setLoading] = useState(true);
const [useArticle, setUseArticle] = useState([]);
const [isSignedIn, setIsSignedIn] = useState(false);

const getUserData = async (userId) => {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'extended_stay', userId);
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

useEffect(() => {
  const fetchData = async (user) => {
    try {
      const data = await getArticles();
      setUseArticle(data);

    } catch (error) {
      setFetchError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    setIsSignedIn(!!user);

    if (user) {
      fetchData(user);
    }
  });

  return () => {
    // Unsubscribe when component unmounts
    unsubscribe();
  };
}, []);
return (
<>



<div className='PropertyArticleHero'>
<div >
<h1>Property Listings</h1>
<p>Discover the perfect home for you in our curated listings.</p>
</div>
</div>


<div className='property-grid'>
{useArticle.map((blog) => (
<Link key={blog.id} href={`/pages/Articles/${blog.id}`}>
<div className='property-card'>
<img src={blog.cover_image} alt="" className='property-image' />
<div className='property-details'>
<div className='property-price'>{blog.price} <small>{blog.billingFrequency}</small></div>
<div className='property-type'>
<div style={{ marginRight: 'auto' }}>{blog.bathrooms}bds | {blog.bedrooms}ba</div>
<div>{blog.catogory}</div>
</div>
<p className='property-description'>{blog.content.slice(0, 100)}...</p>
</div>
<div className='property-address'>{blog.address}</div>

<div className='property-owner_name'>Listing by {blog.userName}</div>

</div>
</Link>
))}
</div>

</>
)
}