import { Link, NavLink } from 'react-router-dom';

export default function DashboardNavbar() {
  return (
    <div>
      <nav
        className='fixed bottom-0 z-[10] w-screen
       bg-white   text-md  lg:border-none  lg:w-72 lg:border-r 
       
       '
      >
        <div className='mx-auto flex items-center justify-between '></div>

        <div className='lg:h-screen  lg:p-20 lg:px-3'>
          <div className='lg:mx-4 font-light  flex gap-2 lg:flex-col mx-auto justify-center '>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/Deposit'>Deposit</NavLink>
            <NavLink to='/withdraw'>Withdraw</NavLink>
            <NavLink to='/Transfer'>Transfer</NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
