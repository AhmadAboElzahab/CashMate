import { useState } from 'react';
import GetAmount from '../../Components/GetAmount';

export default function Deposit() {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setAmount(inputValue);
    }
  };

  return (
    <>
      <GetAmount />
      <div className='bg-white rounded shadow px-4 py-5 '>
        <label htmlFor='amount'>Amount</label>
        <input
          className='w-full border rounded py-2 px-3 mb-4'
          type='text'
          onChange={handleAmountChange}
          value={amount}
          placeholder='Enter Amount you Wat to Deposit'
        />
      </div>{' '}
    </>
  );
}
