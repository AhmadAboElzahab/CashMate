import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../Components/DashboardNavbar';
export default function DashboardLayout() {
  return (
    <div className='text-white'>
      <DashboardNavbar />
      <div className='p-2 lg:pl-72 '>
        <div className='mx-auto max-w-8xl pt-[60px] lg:pt-55  text-black  lg:py-10 space-y-8 px-2  lg:px-8 '>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
