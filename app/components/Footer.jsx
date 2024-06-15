'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import footLogo from '../img/gracious_logo.png'
import Image from 'next/image'
import navlogo from '../img/GraciousCross.png'

const Footer = () => {

const scrollTo = () =>{
window.scroll({top: 0,

})
}  

const router = useRouter()
return (
<>


<footer id="footer">

<div className="flex-footer">
<div className="footer-tablebox"> 
<div className="footer-headline">Get To Know Us</div>

<ul className="footer-navlink">
<li><Link href='#!'>Career</Link></li>
<li><Link href='/pages/About'>About Gracious Crossing</Link></li>
<li><Link href='#!'>Investor Relations </Link></li>
<li><Link href='#!' >Advertise</Link></li>
<li><Link href="/pages/Faq">Faq</Link></li>
<li><Link href='/pages/Mission'>Our Mission & Values</Link></li>
<li><Link href='/pages/Team'>Our Team</Link></li>
<li><Link href='/pages/Sustainability'>Sustainability Initiatives</Link></li>
<li><Link href='/pages/Diversity'>Diversity & Inclusion</Link></li>
<li><Link href='/pages/Testimonials'>Customer Testimonials</Link></li>
<li><Link href='/pages/Press'>Press Releases</Link></li>
<li><Link href='/pages/Community'>Community Engagement</Link></li>
</ul>
</div>
{/*first tablebox stops here*/}
<div className="footer-tablebox"> 
  <div className="footer-headline">Home Shopping</div>

  <ul className="footer-navlink">
    <li><Link href='/pages/Houses'>Homes For Sale & Rent</Link></li>
    <li><Link href='/pages/Apartments'>Apartments for Rent</Link></li>
    <li><Link href='/pages/NewConstruction'>New Construction For Sale</Link></li>
    <li><Link href='/pages/Motel'>Motels For Rent</Link></li>
    <li><Link href='/pages/GreenHomes'>Green Homes For Sale & Rent</Link></li>
    <li><Link href='/pages/HistoricHomes'>Historic Homes For Sale & Rent</Link></li>
    <li><Link href='/pages/LuxuryHomes'>Luxury Homes For Sale & Rent</Link></li>
    <li><Link href='/pages/VacationRentals'>Vacation Rentals For Rent</Link></li>
    <li><Link href='/pages/Conodominiums'>Conodominiums For Sale & Rent</Link></li>
    <li><Link href='/pages/StudentHousing'>Student Housing For Rent</Link></li>
    <li><Link href='/pages/Foreclosures'>Foreclosures For Sale</Link></li>
    <li><Link href='/pages/SeniorHousing'>Senior Housing For Sale & Rent</Link></li>
  </ul>
</div>

{/*seconds tablebox stops here*/}
<div className="footer-tablebox"> 
  <div className="footer-headline">Global Real Estate</div>

<ul className="footer-navlink">
<li><Link href='#!'>Canada</Link></li>
<li><Link href='#!'>Mexico</Link></li>
<li><Link href='#!'>Caribbean</Link></li>
<li><Link href='#!'>Europe</Link></li>
<li><Link href='#!'>Iceland</Link></li>
<li><Link href='#!'>Greenland</Link></li>
<li><Link href='#!'>United Kingdom</Link></li>
<li><Link href='#!'>Australia</Link></li>
<li><Link href='#!'>Asia</Link></li>
<li><Link href='#!'>Middle East</Link></li>
<li><Link href='#!'>South America</Link></li>
<li><Link href='#!'>Africa</Link></li>
</ul>
</div>

{/*third tablebox stops here*/}
<div className="footer-tablebox" > 
<div className="footer-headline">Home & Lifestyle</div>

<ul className="footer-navlink">
<li><Link href="/Articles">Buying Guide</Link></li>
<li><Link href="/pages/SellingGuide">Selling Guide</Link></li>
<li><Link href="/pages/RentingGuide">Renting Guide</Link></li>
<li><Link href="/pages/NeighborhoodGuides">Neighborhood Guides</Link></li>
<li><Link href="/pages/HomeValuation">Home Valuation</Link></li>
<li><Link href="/RealEstateNews">Real Estate News</Link></li>
<li><Link href='#!'>Home Decor</Link></li>
<li><Link href='#!'>Pets & Tips</Link></li>
<li><Link href='/pages/Health'>Health & Fitness</Link></li>
<li><Link href='/pages/Family'>Family & Friends</Link></li>


</ul>
</div>

{/*fourth tablebox stops here*/}
<div className="footer-tablebox" style={{ borderRight: 'none' }}>
<div className="footer-headline">Health</div>
<ul className="footer-navlink" style={{ borderBottom: 'none' }}>
<li><Link href="/pages/MentalHealth">Mental Health</Link></li>
<li><Link href="/pages/ChildrensHealth">Children's Health</Link></li>
<li><Link href="/pages/HeartHealth">Heart Health</Link></li>
<li><Link href="/pages/PetHealth">Pet Health</Link></li>
<li><Link href="/pages/EyeHealth">Eye Health</Link></li>
<li><Link href="/pages/HealthyLiving">Healthy Living</Link></li>
<li><Link href="/pages/MedicalResearch">Medical Research</Link></li>
<li><Link href="/pages/Cancer">Cancer</Link></li>
</ul>
</div>


{/*fourth tablebox stops here*/}


</div>

<div style={{backgroundColor:'transparent'}}  className="nav">
<Image style={{margin:'auto ',cursor:'pointer'}} title='Home Page' onClick={() => router.push('/')} src={navlogo} width={200} alt='...'  />






<div className="navlinks sm-navlink" style={{flexWrap:'nowrap'}}>
<Link  href='/pages/Contact'>Contact Gracious Crossing</Link>

<Link  href='/pages/Terms'>terms of Use</Link>

<Link  href='/pages/Privacy'>Privacy Policies </Link>

<Link style={{border:'none'}}  href='../pages/Cookie'>Cookie Policies</Link>


</div>
</div>





<hr />
<div style={{
color:'#fff',
padding:'1rem 0',
textAlign:'center'
}}>
   &#169;2024 Gracious Crossing, LLC All Rights Reserved <br />

</div>
<hr />




<div className="footer-logo-box">

<Image title='Back To Top' width={36} onClick={scrollTo}  src={footLogo} alt="..." />

</div>
</footer>






</>
)
}

export default Footer