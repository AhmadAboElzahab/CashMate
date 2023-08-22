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
    <div className=' rounded-lg flex flex-col items-center mt-[10%]  mx-auto justify-center'>
      <svg
        fill='#000000'
        height='100px'
        width='100px'
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 296.999 296.999'
      >
        <g>
          <g>
            <g>
              <path
                d='M146.603,0c-31.527,0-61.649,9.762-87.11,28.232c-4.377,3.176-5.567,9.188-2.73,13.791l23.329,37.845
				c1.509,2.449,3.971,4.158,6.793,4.716c2.82,0.559,5.748-0.084,8.077-1.773c13.897-10.081,30.343-15.41,47.56-15.41
				c44.718,0,81.098,36.38,81.098,81.098c0,44.718-36.38,81.098-81.098,81.098c-17.217,0-33.663-5.329-47.56-15.41
				c-2.329-1.689-5.255-2.331-8.077-1.773c-2.821,0.558-5.283,2.267-6.793,4.716l-23.329,37.846
				c-2.838,4.603-1.647,10.615,2.73,13.791c25.46,18.47,55.583,28.232,87.11,28.232c81.883,0,148.5-66.617,148.5-148.5
				S228.486,0,146.603,0z M146.603,276.326c-23.925,0-46.906-6.529-67.024-18.965l12.579-20.407
				c15.288,8.741,32.497,13.317,50.364,13.317c56.117,0,101.771-45.655,101.771-101.771c0-56.116-45.655-101.771-101.771-101.771
				c-17.866,0-35.076,4.576-50.364,13.317L79.579,39.638c20.117-12.435,43.099-18.965,67.024-18.965
				c70.483,0,127.826,57.343,127.826,127.826S217.087,276.326,146.603,276.326z'
              />
              <path
                d='M105.966,193.934c-2.115,3.172-2.312,7.25-0.513,10.611c1.799,3.36,5.302,5.459,9.113,5.459h45.482
				c3.456,0,6.684-1.727,8.601-4.603l34.112-51.167c2.315-3.472,2.315-7.996,0-11.467L168.65,91.599
				c-1.917-2.876-5.144-4.603-8.601-4.603h-45.482c-3.812,0-7.315,2.099-9.113,5.459c-1.799,3.361-1.602,7.44,0.513,10.611
				l12.027,18.041H29.288c-15.104,0-27.393,12.288-27.393,27.393s12.288,27.393,27.393,27.393h88.705L105.966,193.934z
				 M29.288,155.219c-3.705,0-6.719-3.014-6.719-6.719c0-3.705,3.014-6.719,6.719-6.719h108.02c3.812,0,7.315-2.099,9.113-5.459
				c1.799-3.361,1.602-7.44-0.513-10.611l-12.027-18.041h20.635l27.22,40.83l-27.22,40.83h-20.635l12.027-18.041
				c2.115-3.172,2.312-7.25,0.513-10.611c-1.799-3.36-5.302-5.459-9.113-5.459H29.288z'
              />
            </g>
          </g>
        </g>
      </svg>
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
