import Astro from '../Asset/Astro.webp';

export default function Home() {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-between overflow-hidden w-screen '>
      <div className=' text-center  w-full flex-col flex'>
        <h1 className='font-extrabold text-6xl pt-20'>Cache Mate</h1>
        <span className='text-fuchsia-700 font-bold text-5xl'>Trust Worthy</span>
      </div>

      <img src={Astro} className='lg:w-[45vw] ' alt='' />
    </div>
  );
}
