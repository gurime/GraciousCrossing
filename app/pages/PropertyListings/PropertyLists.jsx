'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { auth, db } from '@/app/Config/firebase';
import { collection, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore';
import { useRouter } from 'next/navigation';


async function getArticles(orderBy) {
const querySnapshot = await getDocs(collection(db, "propertys"));
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
const [ comments, setComments ] = useState()
const router = useRouter()

const fetchComments = async (articleId) => {
  try {
  const db = getFirestore();
  const commentsRef = collection(db, 'propertys');
  const queryRef = query(commentsRef, where('articleId', '==', articleId),   orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(queryRef);
  const newComments = querySnapshot.docs.map((doc) => {
  const commentData = doc.data();
  return {id: doc.id,...commentData,timestamp: commentData.timestamp.toDate(),};});
  setComments(newComments);
  setLoading(false);
  } catch (error) {
  setErrorMessage('Error fetching comments. Please try again.');
  setLoading(false);
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
<button onClick={() => router.push('/pages/PropertyListings/PropertyForm')}>Add a Listing</button>
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