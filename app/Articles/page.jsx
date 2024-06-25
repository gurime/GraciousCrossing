import React from 'react'
import ArticleList from './ArticleList'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export const metadata = {
    title: 'Buying Guide - Gracious Crossing',
    description: 'Explore insightful articles on home buying. Gracious Crossing brings you valuable content to guide you on your journey to finding the perfect home.',
    keywords: ['articles', 'real estate insights', 'homebuying tips', 'property investment', 'housing trends'],
    author: 'Phillip Bailey',
  };
  
export default function Articles() {
return (
<>
<Navbar/>
<ArticleList/>
<Footer/>
</>
)
}
