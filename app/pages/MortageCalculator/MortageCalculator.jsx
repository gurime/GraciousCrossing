'use client'
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React, {useState } from 'react'

export default function MortageCalculator() {
    const [loanAmount, setLoanAmount] = useState('');
const [interestRate, setInterestRate] = useState('');
const [loanTerm, setLoanTerm] = useState('');
const [downPayment, setDownPayment] = useState('');
const [result, setResult] = useState('');
const [resultColor, setResultColor] = useState('');

function calculateMortgagePayment() {
  const monthlyInterestRate = parseFloat(interestRate.replace('%', '')) / 1200;
  const numPayments = parseInt(loanTerm) * 12;
  const principal = parseFloat(loanAmount.replace(/[$,]/g, '')) - parseFloat(downPayment.replace(/[$,]/g, ''));
  if (isNaN(principal) || isNaN(monthlyInterestRate) || isNaN(numPayments)) {
    return 'Invalid input. Please enter valid numeric values.';
  }
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
  
  
  function handleReset() {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setDownPayment('');
    setResult('');
    setResultColor('');
  }
    
  function handleSubmit(event) {
    event.preventDefault();
  
    if (!loanAmount || !interestRate || !loanTerm || !downPayment) {
      // Handle the case where any of the required fields is empty
      setResult('Please fill in all the required fields.');
      setResultColor('red');
      return;
    }
  
    const monthlyPayment = calculateMortgagePayment();
    setResult(`Monthly Payment: $${monthlyPayment}`);
    setResultColor(monthlyPayment <= 800 ? 'green' : 'red');
  }
  

return (
<>
<Navbar/>
<div className="mortage-hero">
<h1>Get Your Dream Home Today</h1>
<form className="mortage-form" onSubmit={handleSubmit}>
<b><p>Find the perfect mortgage with our easy-to-use calculator.</p></b>

<label htmlFor="loan-amount">Loan Amount:</label>
<input type="text" id="loan-amount" name="loan-amount" value={loanAmount} onChange={handleLoanAmountChange} required title="The loan amount includes the principal, interest, and fees associated with the mortgage." />

<div style={{marginBottom:'1rem',lineHeight:'2'}}><small>Enter the total amount you want to borrow, including principal, interest, and fees.</small>
</div>

<label htmlFor="interest-rate">Interest Rate (%):</label>
<input type="text" id="interest-rate" name="interest-rate" value={interestRate} onChange={handleInterestRateChange} required title="An interest rate is the amount of interest due per period,"/>

<div style={{lineHeight:'2',marginBottom:'1rem'}}>
<small>Enter the annual interest rate for your mortgage.</small>
</div>

<label htmlFor="loan-term">Loan Term (years):</label>
<input type="text" id="loan-term" name="loan-term" value={loanTerm} onChange={(event) => setLoanTerm(event.target.value)} required title='A loan term is the length of time it will take for a loan to be completely paid off '/>

<div style={{lineHeight:'2'}}><small>Enter the number of years over which you will repay the loan.</small>
</div>

<label htmlFor="down-payment">Down Payment:</label>
<input type="text" id="down-payment" name="down-payment" value={downPayment} onChange={handleDownPaymentChange} required title='A down payment is a sum of money that a buyer pays upfront for purchasing a house.'/>

<div style={{lineHeight:'2',marginBottom:'1rem'}}>
<small>Enter the initial payment made when purchasing the home.</small>

</div>

<div className="button-group">
  <button type="submit">Calculate Your Mortgage</button>
  <button type="button" onClick={handleReset}>Reset</button>
</div><p style={{ textAlign: 'center', color: resultColor || 'black' }}>{result}</p>
<style jsx>{`
    .button-group {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }
    .button-group button {
      flex: 1;
    }
  `}</style>
</form>

</div>
<Footer/>
</>
)
}