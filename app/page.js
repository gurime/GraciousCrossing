import AdminHeader from "./components/AdminHeader";
import Footer from "./components/Footer";
import HeroHome from "./components/HeroHome";
import Navbar from "./components/Navbar";
import Tagblock from "./components/Tagblock";
import HouseListing from "./pages/FeaturedHouse/HouseListing";

export const metadata = {
  title: 'Gracious Crossing',
  description: 'Discover your dream home with Gracious Crossing, where elegance meets comfort. Explore a variety of exquisite properties and find the perfect place to call home.',
  keywords: ['real estate', 'homes for sale', 'property listings', 'luxury homes', 'homebuying'],
  author: 'Phillip bailey',
  
};

export default function Home() {
  return (
    <>
<AdminHeader/>
<Navbar/>
<HeroHome/>
<HouseListing/>

<Tagblock/>
<Footer/>
    </>
  )
}
