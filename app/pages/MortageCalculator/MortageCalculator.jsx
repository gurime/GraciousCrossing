'use client'
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React, { useEffect, useState } from 'react'

export default function MortageCalculator() {
    const [loanAmount, setLoanAmount] = useState('');
const [interestRate, setInterestRate] = useState('');
const [loanTerm, setLoanTerm] = useState('');
const [downPayment, setDownPayment] = useState('');
const [result, setResult] = useState('');
const [resultColor, setResultColor] = useState('');

function calculateMortgagePayment() {
const monthlyInterestRate = parseFloat(interestRate) / 1200;
const numPayments = parseInt(loanTerm) * 12;
const principal = parseFloat(loanAmount.replace('$', '')) - parseFloat(downPayment.replace('$', ''));
const monthlyPayment = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numPayments)) / (Math.pow(1 + monthlyInterestRate, numPayments) - 1);
return monthlyPayment.toFixed(2);
}

function handleLoanAmountChange(event) {
const value = event.target.value;
const numericValue = value.replace(/\D/g, '');
const formattedValue = '$' + numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
setLoanAmount(formattedValue);
}
  
function handleDownPaymentChange(event) {
const value = event.target.value;
const numericValue = value.replace(/\D/g, '');
const formattedValue = '$' + numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
setDownPayment(formattedValue);
}
  

function handleInterestRateChange(event) {
    const value = event.target.value;
    const strippedValue = value.replace('%', ''); // remove any existing percentage symbol
    if (strippedValue !== '') {
      setInterestRate(strippedValue + '%');
    } else {
      setInterestRate('');
    }
  }
  
  
      
    
function handleSubmit(event) {
event.preventDefault();
const monthlyPayment = calculateMortgagePayment();
setResult(`Monthly Payment: $${monthlyPayment}`);
setResultColor(monthlyPayment <= 800 ? 'green' : 'red');

} 


return (
<>
<Navbar/>
<div className="mortage-hero">
<h1>Get Your Dream Home Today</h1>
<p>Find the perfect mortgage for you with our easy-to-use calculator and expert advice.</p>
<form className="mortage-form" onSubmit={handleSubmit}>
<label htmlFor="loan-amount">Loan Amount:</label>
<input type="text" id="loan-amount" name="loan-amount" value={loanAmount} onChange={handleLoanAmountChange} required title="The loan amount includes the principal, interest, and fees associated with the mortgage." />
<label htmlFor="interest-rate">Interest Rate (%):</label>
<input type="text" id="interest-rate" name="interest-rate" value={interestRate} onChange={handleInterestRateChange} required title="An interest rate is the amount of interest due per period,"/>
<label htmlFor="loan-term">Loan Term (years):</label>
<input type="text" id="loan-term" name="loan-term" value={loanTerm} onChange={(event) => setLoanTerm(event.target.value)} required title='A loan term is the length of time it will take for a loan to be completely paid off '/>
<label htmlFor="down-payment">Down Payment:</label>
<input type="text" id="down-payment" name="down-payment" value={downPayment} onChange={handleDownPaymentChange} required title='A down payment is a sum of money that a buyer pays upfront for purchasing a house.'/>
<button type="submit">Calculate Your Mortgage</button>
<p style={{ textAlign: 'center', color: resultColor || 'black' }}>{result}</p>
</form>

</div>
<Footer/>
</>
)
}
