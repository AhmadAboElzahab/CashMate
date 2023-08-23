import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Settings() {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [RepeatedPassword, setRepeatedPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!newPassword || !oldPassword) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (RepeatedPassword != newPassword) {
      toast.error('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    const response = await fetch('/api/action/change', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    setIsLoading(false);

    const json = await response.json();
    if (response.ok) {
      toast.success(json);

      setNewPassword('');
      setOldPassword('');
      setRepeatedPassword('');
    } else {
      toast.error(json);
    }
  };

  return (
    <>
      <div className='bg-white rounded shadow px-4 py-5 '>
        <label htmlFor='oldPassword'>Old Password</label>
        <input
          className='w-full border rounded py-2 px-3 mb-4'
          type='text'
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          value={oldPassword}
          placeholder='Old Password'
        />
        <label htmlFor='newPassword'>New Password</label>
        <input
          className='w-full border rounded py-2 px-3 mb-4'
          type='text'
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          value={newPassword}
          placeholder='New Password'
        />
        <label htmlFor='RepeatedPassword'>Repeat Password</label>
        <input
          className='w-full border rounded py-2 px-3 mb-4'
          type='text'
          onChange={(e) => {
            setRepeatedPassword(e.target.value);
          }}
          value={RepeatedPassword}
          placeholder='Repeated Password'
        />
        <button
          onClick={handleChangePassword}
          className='bg-fuchsia-700 text-white hover:bg-fuchsia-900 w-full text-xl py-2 rounded'
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Change'}
        </button>
      </div>
    </>
  );
}
