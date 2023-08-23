import { Outlet, NavLink } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
export default function TabLayout() {
  return (
    <>
      <h1 className='text-2xl'>Dashboard</h1>
      <Dashboard />
      <div className='text-xl flex flex-row justify-center'>
        <NavLink to='Transactions' className='mx-3'>
          Transaction
        </NavLink>
        <NavLink to='Log' className='mx-3'>
          Log
        </NavLink>
      </div>
      <div className=' pb-10'>
        <Outlet />
      </div>
    </>
  );
}
