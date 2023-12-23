'use client'
import React from 'react'
import Accordion from '../../components/Accordion'
import Image from 'next/image'
import gcrossing from '../../img/Gracious-crossing.png'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
export default function Faq() {
return (
<>
<Navbar/>

<Image className='faqimg'
width={500} 
style={{display:'grid', 
placeItems:'center',
margin:'auto'}} 
src={gcrossing} 
alt='...' />

<div className="accordion">
<Accordion
title="Why Choose Gracious Crossing?"
content="At Gracious Crossing, we understand that buying a home is one of the biggest decisions you'll make in your life. That's why we're dedicated to making the process as easy and stress-free as possible. Our team of experienced real estate agents will work with you every step of the way to find your dream home, whether you're a first-time buyer or a seasoned pro."
/>
<Accordion
title="What Sets Gracious Crossing Apart?"
content="At Gracious Crossing, we're not just selling houses, we're building communities. Our focus is on finding homes that fit your lifestyle, in neighborhoods that you'll love. We take the time to get to know our clients, so we can match you with a home that's truly a perfect fit. Plus, our commitment to customer service means that we'll be there for you every step of the way, even after you've moved in."
/>
<Accordion
title="What Kind of Homes Does Gracious Crossing Offer?"
content="Gracious Crossing offers a wide range of homes to suit any taste and budget. From cozy bungalows to spacious luxury homes, we've got something for everyone. And if you're looking for something specific, our team of real estate agents can help you find it. We work with a variety of home sellers, so we can offer you the best selection of homes in the area."
/>
<Accordion
title="What Makes Gracious Crossing Different?"
content="At Gracious Crossing, we're not just in the business of selling homes, we're in the business of building relationships. We believe that the key to a successful real estate transaction is communication, and we pride ourselves on being there for our clients every step of the way. Whether you have a question about the home buying process or need help finding a local contractor, we're always just a phone call away."
/>
<Accordion
title= "How Can Gracious Crossing Help You?"
content="Whether you're buying your first home or your tenth, Gracious Crossing is here to help. We offer a variety of services to make the home buying process as easy and stress-free as possible, including home inspections, mortgage advice, and more. So why wait? Contact us today to see how we can help you find your dream home."
/>

<Accordion
title= "How Does Gracious Crossing Handle Home Inspections?"
content=
"Gracious Crossing understands the importance of a thorough home inspection before finalizing a purchase. We have a network of trusted inspectors who can provide you with a detailed report on the condition of the home, including any potential issues. We will review the report with you and work with the seller to address any concerns before closing the sale."
/>

<Accordion
 title= "What is Gracious Crossing's Referral Program?"
 content=
"Gracious Crossing offers a referral program for clients who refer us to their friends and family. If someone you refer buys or sells a home with us, we will provide you with a cash reward as a token of our appreciation. Contact us for more information about our referral program."
/>

<Accordion
 title= "Can Gracious Crossing Help with Financing?"
 content="Yes, Gracious Crossing can assist with financing. We have relationships with a variety of lenders and can provide you with advice on the best mortgage options available to you. We can also help you with the pre-approval process to give you an idea of what you can afford before you start your home search."
/>

<Accordion
title= "How Does Gracious Crossing Market Homes for Sale?"
content="Gracious Crossing has a comprehensive marketing strategy to help sell your home quickly and for the best price possible. We use a variety of online platforms, including social media and real estate websites, to showcase your property to potential buyers. We also use traditional marketing methods such as print advertising and open houses. Our team of experienced real estate agents will work with you to develop a customized marketing plan that suits your needs."
/>
</div>

    <div className="faq-sep"></div>
<Footer/>
</>
)
}
