'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { db } from '../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

async function getArticles(orderBy) {
const querySnapshot = await getDocs(collection(db, "article"));
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


export default function ArtilceList() {
const [fetchError, setFetchError] = useState(null);
const [loading, setLoading] = useState(true);
const [useArticle, setUseArticle] = useState([]);
const [orderBy, setOrderBy] = useState('date');

useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArticles(orderBy);
        setUseArticle(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setFetchError('Error fetching articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderBy])
  
return (
<>

<Navbar/>

<div className='ArticleHero'>
    <div style={{padding:'5rem 0'}}>
      <h1>Buying Guide</h1>
    <p></p>
    <p>Explore tips and tricks for a successful home-buying experience.</p></div>
    
</div>

<p style={{textAlign:'center'}}>Order by:</p>

<div className='btn-grid'>
<button className='edit-btn' onClick={() => setOrderBy('date')}>Time Created</button>
<button className='edit-btn' onClick={() => setOrderBy('title')}>Title</button>
</div>

<div className='card-grid'>
{loading && <h1 className='loading'>Loading...</h1>}
{fetchError && <p>{fetchError}</p>}
{!loading && !fetchError && useArticle.map((blog) => (
<div className="card" key={blog.id}>
<img src={blog.cover_image} alt="" />
<div className="authflex">
<p>{blog.catogory}</p>
<div className="authpic-block">
<h3 className="card-catogory">{blog.author}
<img
style={{ width: '30px', height: '30px',padding:'0 5px' }}
className="authpic"
src={blog.authpic}
alt=""
/></h3>

</div>
</div>
<h2 className="card-title">{blog.title}</h2>
<p className="card-content">
{blog.excerpt && blog.excerpt.slice(0, 100)}...
</p>
<div
style={{
display: 'flex',
placeItems: 'center',
justifyContent: 'space-between',

}}>
<Link href={`/Articles/${blog.id}`}className="slugbtn btn">
<button className="card-button" rel="noreferrer">
Read More
</button>
</Link>
{blog.date}
</div>
</div>
))}
</div>
<Footer/>
</>
)
}