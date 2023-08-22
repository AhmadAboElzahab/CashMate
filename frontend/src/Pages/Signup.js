import { useState } from 'react';
import { useSignup } from '../Hooks/useSignup';
import { toast } from 'react-toastify';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup, error, isLoading, message } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message) {
      toast.success('Good To Have You Please Head to log in page');
      setEmail('');
      setName('');
      setPassword('');
    }

    await signup(email, password, name);
  };

  return (
    <div className=' rounded-lg flex flex-col items-center mt-[10%]  mx-auto justify-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='#000000'
        height='100px'
        width='100px'
        version='1.1'
        id='Layer_1'
        viewBox='0 0 297 297'
      >
        <g>
          <g>
            <path d='M287,89H175.001V49.5c0-14.612-11.889-26.5-26.501-26.5c-14.611,0-26.499,11.888-26.499,26.5V89H10    C4.478,89,0,93.478,0,99v165c0,5.522,4.478,10,10,10h277c5.522,0,10-4.478,10-10V99C297,93.478,292.522,89,287,89z     M126.453,162.32c3.067,2.047,7.013,2.238,10.266,0.496c3.251-1.74,5.281-5.128,5.281-8.816l0.001-104.5    c0-3.584,2.916-6.5,6.5-6.5c3.584,0,6.5,2.916,6.5,6.5V154c0,3.688,2.03,7.076,5.281,8.816c3.253,1.742,7.198,1.549,10.266-0.496    l17.453-11.635v19.963L148.5,196.981L109,170.648v-19.963L126.453,162.32z M277,254H20V109h102v26.315l-17.453-11.636    c-3.066-2.046-7.013-2.238-10.266-0.496C91.03,124.924,89,128.313,89,132v44c0,3.344,1.671,6.466,4.453,8.32l49.5,33    c1.68,1.12,3.613,1.68,5.547,1.68c1.934,0,3.867-0.56,5.547-1.68l49.501-33c2.782-1.854,4.453-4.977,4.453-8.32v-44    c0-3.688-2.03-7.076-5.281-8.816c-3.252-1.742-7.199-1.548-10.266,0.496l-17.453,11.635V109H277V254z' />
          </g>
        </g>
      </svg>
      <form className=' w-80 mt-8 mx-auto ' onSubmit={handleSubmit}>
        <label className='block mb-2 '>Name :</label>
        <input
          className='w-full border  rounded py-2 px-3 mb-4'
          type='txt'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label className='block mb-2 '>Email address:</label>
        <input
          className='w-full border rounded py-2 px-3 mb-4'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label className='block mb-2 '>Password:</label>
        <input
          className='w-full border e rounded py-2 px-3 mb-4'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          className='w-full bg-zinc-800 lg:bg-black   text-white py-2 rounded focus:outline-none'
          disabled={isLoading}
        >
          Sign up
        </button>

        <div className='text-red-500 mt-2 h-20'> {error && error}</div>
      </form>
    </div>
  );
};
export default Signup;
