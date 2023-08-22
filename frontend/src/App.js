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
export default function App() {
  const { user } = useAuthContext();
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Signup />} />
            </Route>

            <Route path='Unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<ErrorPage />} />
          </>,
        ),
      )}
    />
  );
}
