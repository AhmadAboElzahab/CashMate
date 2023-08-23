import React, { useState } from 'react';
import GetAmount from '../../Components/GetAmount';
import Modal from '../../Components/Modal';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

export default function Transfer() {
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setAmount(inputValue);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTransfer = async () => {
    if (!amount || !password) {
      toast.error('Please fill in all fields.');
      closeModal();
      return;
    }
    setIsLoading(true);
    const response = await fetch('/api/action/Transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestedAmount: Number(amount),
        password,
        requestedUserId: accountNumber,
      }),
    });

    setIsLoading(false);

    const json = await response.json();
    if (response.ok) {
      toast.success(json);
      setAmount('');
      setPassword('');
      setAccountNumber('');
      mutate('/api/action/amount');
      closeModal();
    } else {
      toast.error(json);
      closeModal();
    }
  };

  return (
    <>
      <h1 className='text-2xl'>Transfer</h1>
      <GetAmount />
      <div className='bg-white rounded shadow px-4 py-5 '>
        <label htmlFor='amount'>Account Number</label>
        <input
          className='w-full border rounded py-2 px-3 mb-4'
          type='text'
          onChange={(e) => {
            setAccountNumber(e.target.value);
          }}
          value={accountNumber}
          placeholder='Enter Account Number you Want to Transfer to'
        />
        <label htmlFor='amount'>Amount</label>
        <input
          className='w-full border rounded py-2 px-3 mb-4'
          type='text'
          onChange={handleAmountChange}
          value={amount}
          placeholder='Enter Amount you Want to Transfer'
        />
        <button
          onClick={openModal}
          className='bg-fuchsia-700 text-white hover:bg-fuchsia-900 w-full text-xl py-2 rounded'
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Transfer'}
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <label htmlFor='password'>Password</label>
          <input
            className='w-full border rounded py-2 px-3 mb-4'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Enter Password'
          />
          <div className='flex flex-row justify-end '>
            <button
              onClick={closeModal}
              className='bg-red-200 text-red-500 mx-4 py-2 px-4 hover:bg-red-500 hover:text-white rounded'
            >
              Cancel
            </button>
            <button
              onClick={handleTransfer}
              className='bg-gray-200 text-gray-900 hover:bg-zinc-400 font-bold py-2 px-4 rounded'
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Proceed'}
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}
