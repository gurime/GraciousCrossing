'use client'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'

export default function ContactForm() {
return (
<>
<Navbar/>
<div className="form-container">
<form className="contactform" >
<h1>Contact Gracious Crossing</h1>
<label htmlFor="name">Name:</label>
<input type="text" id="name" name="name" placeholder="Enter your name" required />
<label htmlFor="email">Email:</label>
<input type="email" id="email" name="email" placeholder="Enter your email" required />
<label htmlFor="message">Message:</label>
<textarea id="message" rows="10" name="message" placeholder="Enter your message"  required></textarea>
<button type="submit">Send</button>
</form>
</div>
<Footer/>
</>
)
}
