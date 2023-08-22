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
import Dashboard from './Pages/Dashboard/Dashboard';
import { useAuthContext } from './Hooks/useAuthContext';
import DashboardLayout from './Layout/DashboardLayout';

import DashboardLayout from './Layout/DashboardLayout';
import DashboardLayout from './Layout/DashboardLayout';
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
              <Route path='/register' element={!user ? <Signup /> : <Navigate to='/dashboard' />} />
              <Route
                path='/dashboard'
                element={user ? <DashboardLayout /> : <Navigate to='/Unauthorized' />}
              >
                <Route index element={<Dashboard />}>
                  <Route path='/Deposit' element={<Deposit />} />
                  <Route path='/withdraw' element={<Withdraw />} />
                  <Route path='/Transfer' element={<Transfer />} />
                </Route>
              </Route>
            </Route>

            <Route path='Unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<ErrorPage />} />
          </>,
        ),
      )}
    />
  );
}
