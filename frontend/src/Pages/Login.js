import { useState } from 'react';
import { useLogin } from '../Hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className=' rounded-lg flex items-center mt-[10%]  justify-center'>
      <form className=' w-80 mt-8 mx-auto ' onSubmit={handleSubmit}>
        <label className='block mb-2 t'>Email address:</label>
        <input
          className='w-full border rounded py-2 px-3 mb-4'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label className='block mb-2 '>Password:</label>
        <input
          className='w-full border  rounded py-2 px-3 mb-4'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          className='w-full bg-zinc-800 lg:bg-black  text-white py-2 rounded focus:outline-none'
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>

        <div className='text-red-500 mt-2 h-20'> {error && error}</div>
      </form>
    </div>
  );
};

export default Login;
