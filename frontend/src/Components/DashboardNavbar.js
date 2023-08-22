import { Link } from 'react-router-dom';

export default function DashboardNavbar() {
  return (
    <div>
      <nav className='fixed  z-[10] w-screen text-black text-2xl bg-white border-b border-fuchsia-700 lg:border-none  py-2 lg:w-72 lg:border-r '>
        <div className='mx-auto flex items-center justify-between '>
          <div className='relative  w-full px-2 '>
            <div className='pointer-events-none absolute inset-y-0 left-6 flex  items-center'></div>
          </div>
          <label
            htmlFor='shopHamburger'
            className='peer-checked:shopHamburger relative z-10  block cursor-pointer text-center text-black lg:hidden'
          >
            <svg
              fill='#000000'
              height='30px'
              width='30px'
              version='1.1'
              id='Layer_1'
              viewBox='0 0 296.999 296.999'
            >
              <g>
                <g>
                  <g>
                    <path
                      d='M173.062,0h-49.126c-10.419,0-18.895,8.476-18.895,18.895v49.126c0,10.419,8.476,18.895,18.895,18.895h49.126
				c10.419,0,18.895-8.476,18.895-18.895V18.895C191.958,8.476,183.481,0,173.062,0z M172.191,67.15h-47.383V19.767h47.383V67.15z'
                    />
                    <path
                      d='M173.062,105.041h-49.126c-10.419,0-18.895,8.476-18.895,18.895v49.126c0,10.419,8.476,18.895,18.895,18.895h49.126
				c10.419,0,18.895-8.476,18.895-18.895v-49.126C191.958,113.518,183.481,105.041,173.062,105.041z M172.191,172.192h-47.383
				v-47.383h47.383V172.192z'
                    />
                    <path
                      d='M173.062,210.083h-49.126c-10.419,0-18.895,8.476-18.895,18.895v49.126c0,10.419,8.476,18.895,18.895,18.895h49.126
				c10.419,0,18.895-8.476,18.895-18.895v-49.126C191.958,218.559,183.481,210.083,173.062,210.083z M172.191,277.233h-47.383
				V229.85h47.383V277.233z'
                    />
                  </g>
                </g>
              </g>
            </svg>
          </label>
        </div>
        <input
          type='checkbox'
          name='shopHamburger'
          id='shopHamburger'
          className='peer invisible absolute'
          hidden
        />

        <div className='hidden peer-checked:block lg:block lg:h-full'>
          <div className='h-screen  p-5 px-3'>
            <div className='ml-4 font-light black flex flex-col '>
              <Link to='/withdraw'>Home</Link>
              <Link to='/Deposit'>Deposit</Link>
              <Link to='/withdraw'>Withdraw</Link>
              <Link to='/Transfer'>Transfer</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
