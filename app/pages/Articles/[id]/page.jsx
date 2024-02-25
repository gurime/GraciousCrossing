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
import Schedule from '@/app/components/Schedule';
import ContactAgent from '@/app/components/ContactAgent';
import moment from 'moment';

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
{post.cover_image && (
  <div className="imgbox">
    <img className="cover_image" src={post.cover_image} alt="Property Cover" />
    {[1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12].map((index) => {
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
)}

{!post.cover_image && <p>Error loading image</p>}




{/* < */}
{/**block for img */}
{/**block for category and author */}
<div className="authflex">
<p>{post.propertyType}</p>

<h3
style={{
display: 'flex',
placeItems: 'center',
fontWeight: '300',
}}
className="card-category">


<div><img src={post.authpic} style={{width:'100%',height:'70px',maxWidth:'400px'}}/></div>


</h3>
</div>
{/**block for category and author */}


<div className='details_header_title'>
<div style={{fontWeight:'100',display:'flex',alignItems:'center'}}>
<li style={{color:'red'}}></li>
<span style={{marginRight:'auto',fontSize:'20px',fontWeight:'600'}}>{post.billingFrequency}</span>

<div style={{
display:'grid'
}}>


{/* <Schedule/>
<ContactAgent/> */}
</div>

</div>

<div style={{
display:'flex',
alignItems:'center',
lineHeight:'2'
}}>
  
<h2>{post.price} </h2>
<h3 style={{padding:'0 1rem'}}>{post.bathrooms} Bath | {post.bedrooms} Beds | {post.square} sqft</h3> 
</div>



<p style={{fontWeight:'600'}}>{post.priceextra}/<small >{post.billingFrequency2.slice(0,2)}</small></p> 
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
<p style={{ margin: '1rem' }}>Last Updated: {post.timestamp && moment(post.timestamp.toDate()).format('LLL')}</p>


<div style={{  margin: '1rem' }}>Listing By: {post.owner}</div>
<div className="body-content" ><p>{post.content}</p></div>




<div className='artilceGoUpbtn'><Goup/></div>

</div>
<Footer/>
</>
)
}