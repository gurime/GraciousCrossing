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
import phone from '../../../img/portfolio_phone.png'
import Image from 'next/image';
import AdminHeader from '@/app/components/AdminHeader';


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
<AdminHeader/>
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
{[1, 2, 3, 4, 5,6,7,8].map((index) => {
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
<h3 className='authflexOwner'> {post.owner} 

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


<div className='details_header_title'>
<h2>{post.price} <small style={{fontWeight:'100'}}>{post.billingFrequency}</small></h2>
<h2>{post.priceextra} <small style={{fontWeight:'100'}}>{post.billingFrequency2}</small></h2> 
<p>{post.property_type}</p>
<p>{post.address}</p>
<div style={{
display:'flex',
alignItems:'center',
lineHeight:'2',
width:'15rem'
}}>
<Image src={phone} width={20} height={38} alt='...'/>
<div style={{width:'1rem'}}></div>
<p>{post.phone}</p>
</div>

<div style={{
display:'flex',

alignItems:'center',
lineHeight:'2'
}}>
<h3 style={{fontWeight:'100'}}>{post.bathrooms} Bath | {post.bedrooms} Bedrooms</h3> 
</div>

</div>
<div style={{ display: (post.heating || post.lights || post.laundry || post.cable || post.airConditioning || post.water || post.pool || post.wifi) ? 'flex' : 'none', justifyContent: 'space-between', alignItems: 'center' }}>
  <h3 style={{ padding: '0 1rem' }}>Popular Amenities</h3>
</div>

<div className='ameities-flex'>

<div className='amenities-grid'>
{post.heating &&
  <div style={{ display: 'flex', margin: '1rem 0', alignItems: 'center' }}>
    <Image style={{ padding: '0 1rem' }} width={30} src={heat} alt='...' />
    <span>Heating is available</span>
  </div>
}

{post.lights &&
  <div style={{ display: 'flex', margin: '1rem 0', alignItems: 'center' }}>
    <Image style={{ padding: '0 1rem' }} width={30} src={lights} alt='...' />
    <span>Lights are available</span>
  </div>
}

{post.laundry &&
  <div style={{ display: 'flex', margin: '1rem 0', alignItems: 'center' }}>
    <Image style={{ padding: '0 1rem' }} width={30} src={laundry} alt='...' />
    <span>Laundry is available</span>
  </div>
}

{post.cable &&
  <div style={{ display: 'flex', margin: '1rem 0', alignItems: 'center' }}>
    <Image style={{ padding: '0 1rem' }} width={30} src={cable} alt='...' />
    <span>Cable is available</span>
  </div>
}

{post.airConditioning &&
  <div style={{ display: 'flex', margin: '1rem 0', alignItems: 'center' }}>
    <Image style={{ padding: '0 1rem' }} width={30} src={ac} alt='...' />
    <span>AC is available</span>
  </div>
}

{post.water &&
  <div style={{ display: 'flex', margin: '1rem 0', alignItems: 'center' }}>
    <Image style={{ padding: '0 1rem' }} width={30} src={water} alt='...' />
    <span>Water is available</span>
  </div>
}

{post.pool &&
  <div style={{ display: 'flex', margin: '1rem 0', alignItems: 'center' }}>
    <Image style={{ padding: '0 1rem' }} width={30} src={pool} alt='...' />
    <span>Pool is available</span>
  </div>
}

{post.wifi &&
  <div style={{ display: 'flex', margin: '1rem 0', alignItems: 'center' }}>
    <Image style={{ padding: '0 1rem' }} width={30} src={wifi} alt='...' />
    <span>WiFi is available</span>
  </div>
}

</div>




</div>





<div className="body-content" style={{ whiteSpace: 'pre-line' }}><p>{post.content}</p></div>




<div className='artilceGoUpbtn'><Goup/></div>

</div>
<Footer/>
</>
)
}