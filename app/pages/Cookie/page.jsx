import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import Link from 'next/link'
import React from 'react'



export const metadata = {
    title: 'Gracious Crossing - Cookie Policy',
    description: 'Discover Gracious Crossing\'s cookie policy. Understand how we use cookies to improve your browsing experience and ensure the optimal functioning of our website. We prioritize your privacy, and this page offers insights into the information we collect and how it is utilized to enhance your experience.',
    keywords: 'cookie policy, cookies, online privacy, website functionality, data collection, Gracious Crossing privacy policy'
  }
  
  

export default function Cookie() {
return (
<>
<Navbar/>
<div className='container-terms'>
<Link style={{textDecoration:'none'}} href='/'><h1 style={{textTransform:'capitalize'}}>Cookie Policy for Gracious Crossing</h1></Link>
<div className='textblock'>
<p>At Gracious Crossing, we use cookies to enhance your user experience and to improve the <br/>
performance of our website. Cookies are small text files that are stored on your device when <br/>
you visit a website. They are used to collect information about your browsing habits, <br/>
preferences, and interests.</p>

<p>This Cookie Policy explains what cookies are, how we use them, and how you can manage or <br/>
delete them.</p>


<h2>What are cookies?</h2>
<p>Cookies are small text files that are stored on your device when you visit a website. They are <br/>
used to collect information about your browsing habits, preferences, and interests. Cookies <br/>
can be either session-based or persistent. Session-based cookies are temporary and are <br/>
deleted when you close your browser, while persistent cookies remain on your device for a <br/>
specified period of time.</p>

<h2>How we use cookies</h2>
<p>At Gracious Crossing, we use cookies to improve the performance of our website and to enhance <br/>
your user experience. For example, we use cookies to remember your preferred language, to <br/>
personalize your experience, and to track your browsing habits. We also use cookies to <br/>
improve the security of our website, to monitor website traffic, and to collect analytics data.</p>

<h2>Cookies used on Gracious Crossing</h2>
<h3>The following is a list of the types of cookies we use on Gracious Crossing:</h3>

<ul>
<li>Essential Cookies: These are necessary for the proper functioning of our website. They ,<br/>
allow you to navigate and use the features of our website.</li>
<li>Performance Cookies: These collect information about how you use our website, such as <br/>
which pages you visit and if you encounter any errors. This information is used to <br/>
improve the performance of our website.</li>

<li>Functionality Cookies: These allow us to personalize your experience on our website. For <br/>
example, they remember your preferred language and any other settings you have <br/>
selected.</li>

<li>Analytics Cookies: These are used to collect data about how our website is being used. <br/>
This information helps us to understand how our users interact with our website and to <br/>
identify areas for improvement.</li>
</ul>

<h2>Managing and Deleting Cookies</h2>
<p>You have the ability to manage or delete cookies stored on your device. You can do this <br/>
through your browser settings. Please note that disabling cookies may affect your ability to <br/>
use some features of our website.</p>

<h2>Contact Us</h2>
<p>If you have any questions or concerns about our use of cookies, please contact us at <Link href='/pages/Contact' style={{textDecoration:'none',color:'#2072ed',padding:'0 10px 0 0'}}>Contact Gracious Crossing</Link></p>

</div>
</div>
<Footer/>
</>
)
}