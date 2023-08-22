import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import ErrorPage from './Pages/ErrorPage';
import Unauthorized from './Pages/Unauthorized';
import { useAuthContext } from './Hooks/useAuthContext';
export default function App() {
  const { user } = useAuthContext();
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route element={user ? <MainLayout /> : <Navigate to='/Unauthorized' />}></Route>

            <Route path='Unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<ErrorPage />} />
          </>,
        ),
      )}
    />
  );
}
