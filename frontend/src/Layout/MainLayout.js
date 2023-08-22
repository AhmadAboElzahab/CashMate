import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className=' pt-[60px]'>
        <Outlet />
      </div>
    </div>
  );
}
