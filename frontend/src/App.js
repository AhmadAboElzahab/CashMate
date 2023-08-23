import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './Pages/Home';
import MainLayout from './Layout/MainLayout';
import ErrorPage from './Pages/ErrorPage';
import Unauthorized from './Pages/Unauthorized';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { useAuthContext } from './Hooks/useAuthContext';
import DashboardLayout from './Layout/DashboardLayout';

import Dashboard from './Components/Dashboard';
import Withdraw from './Pages/Dashboard/Withdraw';
import Deposit from './Pages/Dashboard/Deposit';
import Transfer from './Pages/Dashboard/Transfer';
import Settings from './Pages/Dashboard/Settings';
import TabLayout from './Layout/TabLayout';
import Transactions from './Components/Transactions';
import Log from './Components/Log';

export default function App() {
  const { user } = useAuthContext();
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='login' element={!user ? <Login /> : <Navigate to='/dashboard' />} />
              <Route path='register' element={!user ? <Signup /> : <Navigate to='/dashboard' />} />
              <Route
                path='/dashboard'
                element={user ? <DashboardLayout /> : <Navigate to='/Unauthorized' />}
              >
                <Route index element={<Navigate to='home' replace={true} />} />
                <Route path='home' element={<TabLayout />}>
                  <Route index element={<Navigate to='transactions' replace={true} />} />
                  <Route path='transactions' element={<Transactions />} />
                  <Route path='Log' element={<Log />} />
                </Route>
                <Route path='deposit' element={<Deposit />} />
                <Route path='withdraw' element={<Withdraw />} />
                <Route path='transfer' element={<Transfer />} />
                <Route path='settings' element={<Settings />} />
              </Route>
            </Route>

            <Route path='unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<ErrorPage />} />
          </>,
        ),
      )}
    />
  );
}
