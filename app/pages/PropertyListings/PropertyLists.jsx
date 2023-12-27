'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { db } from '@/app/Config/firebase';
import { collection, getDocs } from 'firebase/firestore';


async function getArticles(orderBy) {
const querySnapshot = await getDocs(collection(db, "extended_stay"));
const data = [];

querySnapshot.forEach((doc) => {
data.push({ id: doc.id, ...doc.data() });
});

// Sort the data based on the selected orderBy criteria
if (orderBy === 'date') {
data.sort((a, b) => a.date.localeCompare(b.date));
} else if (orderBy === 'title') {
data.sort((a, b) => a.title.localeCompare(b.title));
}
  
    return data;
  }


export default function PropertyLists() {
const [fetchError, setFetchError] = useState(null);
const [loading, setLoading] = useState(true);
const [useArticle, setUseArticle] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArticles();
        setUseArticle(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setFetchError('Error fetching articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [])
  
return (
<>



<div className='PropertyArticleHero'>
<div >
<h1>Property Listings</h1>
<p>Discover the perfect home for you in our curated listings.</p>
</div>
</div>


<div className='property-grid'>
{useArticle && useArticle.map((blog) => (
<Link key={blog.id} href={`/pages/Articles/${blog.id}`}>
<div className='property-card'>
<img src={blog.cover_image} alt="" className='property-image' />
<div className='property-details'>
<div className='property-price'>{blog.price}</div>
<div className='property-type'>
<div style={{marginRight:'auto'}}>{blog.property_type}</div> 
<div>{blog.catogory}</div></div>
<div className='property-address'>{blog.address}</div>
<p className='property-description'>{blog.description}</p>
</div>
</div>
</Link>
))}
</div>


</>
)
}