'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import navlogo from '../../../img/gracious.png'

export default function ConfirmationForm() {
const router = useRouter()

return (
<>
<div className='confirmation-hero'>
<div style={{textAlign:'center'}}> 
<Image style={{margin:'auto '}}  src={navlogo} width={300} alt='...'  />
<h1 style={{color:'#fff',letterSpacing:'1px'}}>      
Thank You for Contacting Gracious Crossing
</h1>
<p style={{color:'#fff',lineHeight:'2',letterSpacing:'1px'}}>
We appreciate your inquiry and will get back to you as soon as possible.</p>
<button onClick={() => router.push('/')}
style={{
display: 'inline-block',
padding: '5px 10px',
fontSize:'18px',
color:'#fff',
backgroundColor:'#f33030',
border:'none',
borderRadius:'4px',
textTransform:'capitalize',
cursor:'pointer',
margin:'auto 0'
}}
> go home </button>
</div>
</div>
</>
)
}
