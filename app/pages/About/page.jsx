import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import React from 'react'
import team1 from '../../img/AI_CEO.jpg'
import team2 from '../../img/AI_Woman.jpg'
import team3 from '../../img/AI_CTO.jpg'

export const metadata = {
    title: 'About Us - Gracious Crossing',
    description: 'Discover the story behind Gracious Crossing. Learn about our commitment to providing exquisite real estate, where elegance meets comfort. Join us on the journey of helping you find your dream home.',
    keywords: ['about us', 'company history', 'real estate story', 'mission and values', 'elegance and comfort'],
    author: 'Phillip Bailey',
  };
  

export default function About() {
return (
<>
<Navbar/>
<div className='about_text'>
<h1 style={{textAlign:'center'}}>About Gracious Crossing</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio aenean sed adipiscing diam donec adipiscing. Id leo in vitae turpis. Adipiscing bibendum est ultricies integer. Facilisis mauris sit amet massa vitae tortor condimentum. Nunc non blandit massa enim nec. Faucibus scelerisque eleifend donec pretium vulputate. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Pellentesque massa placerat duis ultricies lacus sed. Ornare suspendisse sed nisi lacus sed. A iaculis at erat pellentesque adipiscing commodo elit at. Enim diam vulputate ut pharetra sit amet aliquam id. Praesent tristique magna sit amet purus gravida quis blandit turpis. At in tellus integer feugiat scelerisque varius morbi. Elit at imperdiet dui accumsan sit amet nulla. Posuere urna nec tincidunt praesent semper feugiat. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Nisl condimentum id venenatis a. Sit amet cursus sit amet dictum sit amet justo.</p>

<p>Ante in nibh mauris cursus. Sed elementum tempus egestas sed sed risus pretium. Elementum facilisis leo vel fringilla est ullamcorper. Dui vivamus arcu felis bibendum. Nisl nisi scelerisque eu ultrices. Eget est lorem ipsum dolor sit amet consectetur. Pellentesque habitant morbi tristique senectus. Eu tincidunt tortor aliquam nulla facilisi cras. Potenti nullam ac tortor vitae purus. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Ridiculus mus mauris vitae ultricies. Enim ut sem viverra aliquet eget sit amet tellus cras. Pharetra convallis posuere morbi leo. Pharetra diam sit amet nisl suscipit.</p>

<p>Sit amet volutpat consequat mauris nunc congue. Nunc vel risus commodo viverra maecenas. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Id venenatis a condimentum vitae sapien pellentesque habitant. At tellus at urna condimentum mattis. Odio tempor orci dapibus ultrices. Sit amet tellus cras adipiscing enim. At in tellus integer feugiat scelerisque varius. Sagittis aliquam malesuada bibendum arcu vitae. Donec adipiscing tristique risus nec. Odio facilisis mauris sit amet massa vitae tortor condimentum. Condimentum lacinia quis vel eros donec ac. Tincidunt nunc pulvinar sapien et ligula ullamcorper. Sit amet justo donec enim diam vulputate. Purus semper eget duis at tellus at. Elit sed vulputate mi sit amet. Interdum velit laoreet id donec ultrices tincidunt.</p>

<p>Pulvinar neque laoreet suspendisse interdum consectetur libero. Dapibus ultrices in iaculis nunc. Fames ac turpis egestas sed tempus urna et. Ornare massa eget egestas purus viverra accumsan in nisl. Nisl pretium fusce id velit ut. Ligula ullamcorper malesuada proin libero nunc consequat. Fames ac turpis egestas integer eget aliquet nibh praesent. Consequat interdum varius sit amet mattis. Eu turpis egestas pretium aenean pharetra. Aliquam nulla facilisi cras fermentum odio eu. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Ut tortor pretium viverra suspendisse potenti nullam. Ac tortor dignissim convallis aenean et tortor at. Nibh ipsum consequat nisl vel pretium lectus quam id. Mauris ultrices eros in cursus turpis massa tincidunt. Ultrices dui sapien eget mi proin sed libero enim. Aenean et tortor at risus viverra adipiscing at in.</p>
</div>


<hr />

<div className='aboutimg_container'>

<div className='sm-container_img' style={{
  display: 'grid',
  placeItems: 'center',
  width: '20%',
  lineHeight: '30px'
}}>
  <Image src={team1} alt='...' />
  <p>{`Gracious Crossing's CEO, John Doe, is a seasoned leader with a rich background in real estate. His strategic vision and commitment to excellence have propelled the company to new heights. John fosters a culture of innovation and collaboration.`}</p>
</div>

<div className='sm-container_img' style={{
  display: 'grid',
  placeItems: 'center',
  width: '20%',
  lineHeight: '30px'
}}>
  <Image src={team2} alt='...' />
  <p>{`Gracious Crossing's CEO, John Doe, is a seasoned leader in real estate. Meanwhile, Jane Doe, the lead writer, contributes to the company's success through her exceptional writing skills and creativity. She has won multiple awards for her exceptional writing.`}</p>
</div>

 
<div className='sm-container_img' style={{
  display: 'grid',
  placeItems: 'center',
  width: '20%',
  lineHeight: '30px'
}}>
  <Image src={team3} alt='...' />
  <p>{`Gracious Crossing's CEO, John Doe, is a seasoned leader in real estate. Lorem Doe, the Chief Technology Officer, brings cutting-edge expertise to drive technological innovation and enhance the company's digital capabilities. `}</p>
</div>

 
</div>
<Footer/>
</>
)
}
