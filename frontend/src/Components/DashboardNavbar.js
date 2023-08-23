import { NavLink } from 'react-router-dom';
import { BiHomeAlt2, BiMoneyWithdraw } from 'react-icons/bi';
import { TbMoneybag } from 'react-icons/tb';
import { BsArrowLeftRight } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';

export default function DashboardNavbar() {
  return (
    <div>
      <nav
        className='py-2 lg:py-0 fixed bottom-0 z-[10] w-screen
       bg-white   text-md  lg:border-none  lg:w-72 lg:border-r 
       
       '
      >
        <div className='lg:h-screen   lg:p-20 lg:px-3'>
          <div className='lg:mx-4 font-light  flex gap-2 lg:flex-col mx-auto justify-around '>
            <NavLink
              to='Home'
              className='flex flex-col items-center justify-center lg:justify-start lg:items-start'
            >
              <BiHomeAlt2 className='lg:hidden ' size={30} />
              Home
            </NavLink>
            <NavLink
              to='Deposit'
              className='flex flex-col items-center justify-center lg:justify-start lg:items-start'
            >
              <TbMoneybag className='lg:hidden ' size={30} />
              Deposit
            </NavLink>
            <NavLink
              to='withdraw'
              className='flex flex-col items-center justify-center lg:justify-start lg:items-start'
            >
              <BiMoneyWithdraw className='lg:hidden' size={30} />
              Withdraw
            </NavLink>
            <NavLink
              to='Transfer'
              className='flex flex-col items-center justify-center lg:justify-start lg:items-start'
            >
              <BsArrowLeftRight className='lg:hidden' size={30} />
              Transfer
            </NavLink>
            <NavLink
              to='settings'
              className='flex flex-col items-center justify-center lg:justify-start lg:items-start'
            >
              <IoSettingsOutline className='lg:hidden' size={30} />
              Settings
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
