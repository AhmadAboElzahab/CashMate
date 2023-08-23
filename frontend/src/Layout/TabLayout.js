import { Outlet, NavLink } from 'react-router-dom';
export default function TabLayout() {
  return (
    <>
      <div>
        <NavLink to='Transaction'>Transaction</NavLink>
        <NavLink to='Log'>Log</NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
