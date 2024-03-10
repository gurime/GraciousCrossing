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
  const sanitizedPost = JSON.parse(JSON.stringify(post));
  const sanitiPost = JSON.parse(JSON.stringify(post));
 

  if (!post) {
    return <div>Article not found</div>;
  }
  const lastUpdatedDate = post.timestamp && post.timestamp.toDate();
  const formattedDate = lastUpdatedDate && `${lastUpdatedDate.toLocaleString('en-US', { timeZone: 'America/New_York', day: 'numeric', month: 'long', year: 'numeric' })} ${lastUpdatedDate.toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: true })}`;
  

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
<img className='authbox' src={post.authpic} style={{ maxWidth: '100%', height: '70px' }} />
</h3>
</div>
{/**block for category and author */}


<div className='details_header_title'>
<div style={{fontWeight:'100',display:'flex',alignItems:'center',margin:'0 0 1rem 0'}}>
<li style={{color:'red'}}></li>
{post.billingFrequency ? (
  <span style={{marginRight:'auto',fontSize:'20px',fontWeight:'600'}}>{post.billingFrequency}</span>

) : null}
{post.apartbillingFrequency2 ? (
  <span style={{marginRight:'auto',fontSize:'20px',fontWeight:'600'}}>{post.apartbillingFrequency2}</span>

) : null}


<div style={{
display:'grid'
}}>


<Schedule post={sanitizedPost}/>
<ContactAgent post={sanitiPost} />
</div>

</div>
{post.apartavailability ? (
  <span style={{marginRight:'auto',fontSize:'20px',fontWeight:'300'}}><span style={{letterSpacing:'4px'}}>Availability</span> {post.apartavailability}</span>

) : null}

<div style={{
display:'flex',
alignItems:'center',
lineHeight:'2'
}}>
  
<h2>{post.price} {post.apartprice}</h2>
<h3 style={{padding:'0 1rem'}}>{post.bathrooms} {post.apartbathrooms} Bath | {post.apartbedrooms} Beds | {post.square} {post.apartsquare}sqft</h3> 
</div>


{post.units ? (
  <span style={{marginRight:'auto',fontSize:'20px',fontWeight:'300'}}>Unit# {post.units}</span>

) : null}
{post.billingFrequency2 ? (
  <p style={{fontWeight:'600'}}>
    {post.priceextra}/<small>{post.billingFrequency2}</small>
  </p>

) : null}
<p>{post.property_type}</p>
<address>{post.address}, {post.city}, {post.state[0]}{post.state.slice(-1)}, {post.zip}</address>


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

<p className='formatdate' style={{ margin: '1rem',lineHeight:'6' }}>
  Last Updated: {formattedDate}
</p>



<div style={{  margin: '1rem',lineHeight:'6' }}>Listing By: {post.owner}</div>





{(post.heating || post.lights || post.laundry || post.cable || post.airConditioning || post.water || post.pool || post.wifi) && (
  <div className='amenities-grid'>
    <span style={{ padding: '0 1rem' }}>Highlights</span>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
      {post.heating && <li>Heating</li>}
      {post.lights && <li>Lights are available</li>}
      {post.laundry && <li>Washer/Dryer</li>}
      {post.cable && <li>Cable ready</li>}
      {post.airConditioning && <li>Air Conditioning</li>}
      {post.water && <li>Water is available</li>}
      {post.pool && <li>Pool is available</li>}
      {post.wifi && <li>WiFi</li>}
    </div>
    <span style={{ padding: '0 1rem' }}>Kitchen Features & Appliances</span>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
      {post.heating && <li>Heating</li>}
      {post.lights && <li>Lights are available</li>}
      {post.laundry && <li>Washer/Dryer</li>}
      {post.cable && <li>Cable ready</li>}
      {post.airConditioning && <li>Air Conditioning</li>}
      {post.water && <li>Water is available</li>}
      {post.pool && <li>Pool is available</li>}
      {post.wifi && <li>WiFi</li>}
    </div>
  </div>
)}


<div style={{ display: (post.heating || post.lights || post.laundry || post.cable || post.airConditioning || post.water || post.pool || post.wifi) ? 'flex' : 'none', justifyContent: 'space-between', alignItems: 'center' }}>
  <h3 style={{ padding: '0 1rem' }}>Popular Amenities</h3>
  

</div>


<div style={{padding:'0 1rem'}}><h2>About {post.title}</h2></div>
<div className="body-content" ><p>{post.content}</p></div>




<div className='artilceGoUpbtn'><Goup/></div>

</div>
<Footer/>
</>
)
}