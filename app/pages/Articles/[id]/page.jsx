import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import Goback from '@/app/components/goback'
import { getArticle } from '../lib';
import Goup from '@/app/components/goup';
import heat from '../../../img/heater_icon.png'
import lights from '../../../img/light_bulb.png'
import laundry from '../../../img/washer_icon.png'
import cable from '../../../img/tv_icon.png'
import ac from '../../../img/fan_icon.png'
import water from '../../../img/water_icon.png'
import pool from '../../../img/swim_icon.png'
import wifi from '../../../img/wifi_icon.png'
import Image from 'next/image';


export async function generateMetadata({ params }) {
  const articleId = params.id;
  try {
    const articleDetails = await getArticle(articleId);
    if (articleDetails) {
      return {
        title: `Gracious Crossing | ${articleDetails.title || 'Page Not Found'}`,
      };
    } else {
      return {
        title: 'Gracious Crossing | Page Not Found',
      };
    }
  } catch (error) {
    return {
      title: 'Gracious Crossing | Page Not Found',
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
<img className="cover_image" src={post.cover_image} alt="Property Cover" />
{[1, 2, 3, 4, 5].map((index) => {
const showcase = post[`cover_showcase${index}`];
return showcase && (
<img
key={`cover_showcase${index}`}
className={`cover_showcase${index}`}
src={showcase}
alt={`Cover Showcase ${index}`}
/>
);
})}
</div>
) : (
  <p>Error loading image</p>
)}



{/* < */}
{/**block for img */}
{/**block for category and author */}
<div className="authflex">
<p>{post.propertyType}</p>
<h3 className='authflexOwner'> Owner {post.userName} 

</h3>
<h3
style={{
display: 'flex',
placeItems: 'center',
fontWeight: '300',
}}
className="card-category">
<div
style={{
width: '50px',
height: '50px',
borderRadius: '50%',
backgroundImage: `url(${post.authpic})`,
backgroundSize: 'cover',
backgroundPosition: 'center',
}}
></div>


</h3>
</div>
{/**block for category and author */}
<div className='cover_showcase'>
{post.cover_showcase5 && <img src={post.cover_showcase5} alt="Cover Showcase 5" />}
{post.cover_showcase6 && <img src={post.cover_showcase6} alt="Cover Showcase 6" />}
{post.cover_showcase7 && <img src={post.cover_showcase7} alt="Cover Showcase 7" />}
{post.cover_showcase8 && <img src={post.cover_showcase8} alt="Cover Showcase 8" />}
{post.cover_showcase9 && <img src={post.cover_showcase9} alt="Cover Showcase 9" />}
</div>

<div className='details_header_title'>
<h2>{post.price} <small>{post.billingFrequency}</small></h2>
<p>{post.property_type}</p>
<p>{post.address}</p>
</div>

<h3 style={{padding:'0 1rem'}}>Popular Amenities</h3>
<div className='amenities-grid'>

<div style={{display:'flex',margin:'1rem 0',alignItems:'center'}}><Image style={{padding:'0 1rem'}} width={30} src={heat} alt='...'/>{post.heating && <span>Heating is available</span>}</div>

<div style={{display:'flex',margin:'1rem 0',alignItems:'center'}}><Image style={{padding:'0 1rem'}} width={30} src={lights} alt='...'/>{post.lights && <span>Lights are available</span>}</div>



<div style={{display:'flex',margin:'1rem 0',alignItems:'center'}}><Image style={{padding:'0 1rem'}} width={30} src={laundry} alt='...'/>{post.laundry && <span>Laundry is available</span>}</div>

<div style={{display:'flex',margin:'1rem 0',alignItems:'center'}}><Image style={{padding:'0 1rem'}} width={30} src={cable} alt='...'/>{post.cable && <span>Cable is available</span>}</div>

<div style={{display:'flex',margin:'1rem 0',alignItems:'center'}}><Image style={{padding:'0 1rem'}} width={30} src={ac} alt='...'/>{post.airConditioning && <span>AC is available</span>}</div>

<div style={{display:'flex',margin:'1rem 0',alignItems:'center'}}><Image style={{padding:'0 1rem'}} width={30} src={water} alt='...'/>{post.water && <span>Water is available</span>}</div>

<div style={{display:'flex',margin:'1rem 0',alignItems:'center'}}><Image style={{padding:'0 1rem'}} width={30} src={pool} alt='...' />{post.pool && <span>Pool is available</span>}</div>

<div style={{display:'flex',margin:'1rem 0',alignItems:'center'}}><Image style={{padding:'0 1rem'}} width={30} src={wifi} alt='...'/>{post.wifi && <span>Pool is available</span>}</div>
</div>






<div className="body-content" style={{ whiteSpace: 'pre-line' }}><p>{post.content}</p></div>




<div className='artilceGoUpbtn'><Goup/></div>

</div>
<Footer/>
</>
)
}