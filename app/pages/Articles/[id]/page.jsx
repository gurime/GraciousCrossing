import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import Goback from '@/app/components/goback'
import { getArticle } from '../lib';
import Goup from '@/app/components/goup';
import Link from 'next/link';



export async function generateMetadata({ params }) {
  const articleId = params.id;
  try {
    const articleDetails = await getArticle(articleId);
    if (articleDetails) {
      return {
        title: `Journey | ${articleDetails.title || 'Page Not Found'}`,
      };
    } else {
      return {
        title: 'Journey | Page Not Found',
      };
    }
  } catch (error) {
    return {
      title: 'Journey | Page Not Found',
    };
  }
}







export default async function HomeDetailsPage({params}) {
  const articleId = params.id;

  // Fetch article details
  const post = await getArticle(articleId);

  if (!post) {
    return <div>Article not found</div>;
  }

return (
<>
<Navbar />
<div   className="article-container">
{/**block for goback btn and title */}
<div className="backbtn-box">
<h1>{post.title}</h1>
<Goback/>
</div>
{/**block for goback btn and title */}
{/**block for img */}
{post.cover_image ? (
  <div className="imgbox">
    <img src={post.cover_image} alt="..." />
  </div>
) : (
  <p>Error loading image</p>
)}
{/**block for img */}
{/**block for category and author */}
<div className="authflex">
<p>{post.catogory}</p>
<h3 style={{
    fontWeight: '300',
    marginLeft:'auto',
    display:'flex',
    placeItems:'center'
}}> Owner {post.author} <img
style={{ width: '70px',padding:'0 1rem' }}
className="authpic"
src={post.authpic}
alt="..."
/></h3>
<h3
style={{
display: 'flex',
placeItems: 'center',
fontWeight: '300',
}}
className="card-category">

{/**separator */}
<div
style={{
height: '30px',
margin: '0 0 0 6px',
}}
></div>
{/**separator */}

</h3>
</div>
{/**block for category and author */}
<div className='cover_showcase'>
<img src={post.cover_showcase}/>
<img src={post.cover_showcase1}/>
<img src={post.cover_showcase2}/>
<img src={post.cover_showcase3}/>
<img src={post.cover_showcase4}/>
</div>

<div className='details_header_title'>
<h2>{post.price}</h2>
<p>{post.address}</p>
</div>

<h3 style={{padding:'0 1rem'}}>Popular Amenities</h3>
<div className='amenities-grid'>
<span>{post.amenities}</span>
<span>{post.amenities1}</span>
<span>{post.amenities2}</span>
<span>{post.amenities3}</span>
<span>{post.amenities4}</span>
<span>{post.amenities5}</span>
</div>






<div className="body-content">


<p>{post.content}</p>
<p>{post.content1}</p>
<p>{post.content2}</p>
<p>{post.content3}</p>
<p>{post.content4}</p>
<p>{post.content5}</p>





</div>




<div
style={{
display: 'flex',
justifyContent: 'flex-end',
placeItems: 'center',
marginBottom: '1rem',
}}>
<Goup/>
</div>

</div>


<Footer /></>
)
}