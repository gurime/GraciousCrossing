import React from 'react'
import MortageCalculator from './MortageCalculator';
export const metadata = {
    title: 'Mortgage Calculator - Gracious Crossing',
    description: 'Use our mortgage calculator to estimate your monthly payments. Gracious Crossing helps you plan your budget for your dream home, where elegance meets comfort.',
    keywords: ['mortgage calculator', 'home financing', 'monthly payments', 'real estate budgeting', 'property investment'],
    author: 'Phillip Bailey',
  };
  
export default function page() {
return (
<>
<MortageCalculator/>
</>
)
}
