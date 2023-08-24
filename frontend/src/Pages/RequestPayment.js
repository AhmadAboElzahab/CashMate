import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

export default function PaymentResponseHandler() {
  const [ID, setID] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  function decryptData(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedID = urlParams.get('id');
    const encryptedName = urlParams.get('name');
    const encryptedPrice = urlParams.get('p');

    if (encryptedID && encryptedName && encryptedPrice) {
      (async () => {
        const decryptedID = await decryptData(encryptedID);
        const decryptedName = await decryptData(encryptedName);
        const decryptedPrice = await decryptData(encryptedPrice);

        setID(decryptedID);
        setName(decryptedName);
        setPrice(decryptedPrice);
      })();
    } else {
      console.error('Required parameters missing.');
    }
  }, []);
  const Pay = async () => {
    setIsLoading(true);
    const response = await fetch('/api/action/Pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestedAmount: Number(price),
        requestedUserId: ID,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      handlePaymentApproval();
    }
    if (!response.ok) {
      toast.error(json);
    }
    setIsLoading(false);
  };

  const handlePaymentApproval = () => {
    window.opener.postMessage({ paymentApproved: true }, '*');
    window.close();
  };

  return (
    <div>
      <div className='font-extrabold text-2xl bg-white  p-5  w-full'>
        Cash <span className='text-fuchsia-700'>Mate</span>
      </div>
      <div className='text-center text-xl mx-auto w-[70%]'>
        <h1>You are Paying {price} $</h1>
        <h2>
          To {name} with account Number: {ID}
        </h2>

        <button
          className='bg-fuchsia-700 text-white hover:bg-fuchsia-900 mx-auto px-4 m-2 text-xl py-2 rounded'
          onClick={Pay}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Approve'}
        </button>
      </div>
    </div>
  );
}
