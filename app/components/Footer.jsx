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

<li><Link href='#!'>Company News</Link></li>

<li><Link href='/pages/About'>About Gracious Crossing</Link></li>

<li><Link href='#!'>Investor Relations </Link></li>

<li><Link href='#!' >Advertise</Link></li>


</ul>
</div>
{/*first tablebox stops here*/}
<div className="footer-tablebox"> 
  <div className="footer-headline">Home Shopping</div>

  <ul className="footer-navlink">
    <li><Link href='/pages/ForSale'>Homes for Sale</Link></li>
    <li><Link href='/pages/ForRent'>Homes for Rent</Link></li>
    <li><Link href='/pages/NewConstruction'>New Construction</Link></li>
    <li><Link href='/pages/Mortgage'>Mortgage Calculator</Link></li>
    <li><Link href='/pages/HomeValues'>Home Values</Link></li>
    <li><Link href='/pages/RealEstateAgents'>Real Estate Agents</Link></li>
    <li><Link href='/pages/HomeDesign'>Home Design</Link></li>
    <li><Link href='/pages/Neighborhoods'>Neighborhoods</Link></li>
    <li><Link href='/pages/CommercialRealEstate'>Commercial Real Estate</Link></li>
  </ul>
</div>

{/*seconds tablebox stops here*/}
<div className="footer-tablebox"> 
  <div className="footer-headline">Global Real Estate</div>

  <ul className="footer-navlink">
    <li><Link href='/pages/InternationalListings'>International Listings</Link></li>
    <li><Link href='/pages/PropertyInvestment'>Property Investment</Link></li>
    <li><Link href='/pages/GlobalMarketTrends'>Global Market Trends</Link></li>
    <li><Link href='/pages/RealEstateNews'>Real Estate News</Link></li>
    <li><Link href='/pages/ArchitecturalDesigns'>Architectural Designs</Link></li>
    <li><Link href='/pages/UrbanDevelopment'>Urban Development</Link></li>
    <li><Link href='/pages/EuropeanHomes'>European Homes</Link></li>
    <li><Link href='/pages/AsianProperties'>Asian Properties</Link></li>
    <li><Link href='/pages/AfricanRealEstate'>African Real Estate</Link></li>
  </ul>
</div>

{/*third tablebox stops here*/}
<div className="footer-tablebox" style={{ borderRight: 'none' }}> 
  <div className="footer-headline">Home & Lifestyle</div>

  <ul className="footer-navlink">
    <li><Link href='/pages/HomeDecor'>Home Decor</Link></li>
    <li><Link href='/pages/AutoHome'>Auto & Home</Link></li>
    <li><Link href='/pages/HomeLiving'>Home & Living</Link></li>
    <li><Link href='/pages/Pets'>Pets & Tips</Link></li>
    <li><Link href='/pages/HealthFitness'>Health & Fitness</Link></li>
    <li><Link href='/pages/Family'>Family & Friends</Link></li>
    <li><Link href='/pages/Spirituality'>Spirituality & Faith</Link></li>
    <li><Link href='/pages/Books'>Books & Literature</Link></li>
    <li><Link href='/pages/CommunityNews'>Community News</Link></li>
  </ul>
</div>

{/*fourth tablebox stops here*/}
<div className="footer-tablebox" style={{borderRight:'none',borderLeft:'solid 1px #fff'}}> 
<div className="footer-headline">Health</div>

<ul className="footer-navlink" style={{borderBottom:'none'}}>
<li><Link  href='/pages/MentalHealth'>Mental Health</Link></li>

<li><Link  href='/pages/ChildrensHealth'>Children's Health</Link></li>

<li><Link  href='/pages/HeartHealth'>Heart Health</Link></li>

<li><Link  href='/pages/PetHealth'>Pet Health</Link></li>

<li><Link  href='/pages/EyeHealth'>Eye Health</Link></li>

<li><Link  href='/pages/HealthyLiving'>Healthy Living </Link></li>

<li><Link  href='/pages/MedicalResearch'>Medical Reasearch</Link></li>

<li><Link  href='/pages/Cancer'> Cancer</Link></li>





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