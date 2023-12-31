import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import { useAuthContext } from '../Hooks/useAuthContext';

export default function Navbar() {
  const { user } = useAuthContext();

  const closeMenu = () => {
    document.getElementById('hamburger').checked = false;
  };
  return (
    <div className='fixed top-0 w-screen bg-white z-30'>
      <header>
        <div className='relative'>
          <div className='px-6 md:px-12 lg:px-6 w-full lg:py-4'>
            <div className='flex items-center justify-between'>
              <div className='relative z-30 font-extrabold text-2xl w-full'>
                Cash <span className='text-fuchsia-700'>Mate</span>
              </div>

              <div className='flex items-center w-full justify-end'>
                <input
                  type='checkbox'
                  name='hamburger'
                  id='hamburger'
                  className='peer invisible'
                  hidden
                />
                <label
                  htmlFor='hamburger'
                  className='peer-checked:hamburger relative z-10 -mr-6 block cursor-pointer p-6 lg:hidden'
                >
                  <div
                    aria-hidden='true'
                    className='m-auto h-0.5 w-6 rounded bg-black transition duration-300'
                  ></div>
                  <div
                    aria-hidden='true'
                    className='m-auto mt-2 h-0.5 w-6 rounded bg-black transition duration-300'
                  ></div>
                </label>

                <div className='fixed inset-0 w-h translate-x-[-100%] backdrop-blur-xl bg-white/50 lg:backdrop-blur-0 lg:bg-transparent transition duration-300 peer-checked:translate-x-0 lg:static lg:w-auto lg:translate-x-0 lg:border-r-0'>
                  <div className='flex h-full flex-col justify-between lg:flex-row lg:items-center'>
                    <ul className='text-xl space-y-8 px-6 pt-32 md:px-12 lg:flex lg:space-x-4 lg:space-y-0 lg:pt-0'>
                      <li>
                        <NavLink
                          to='/'
                          onClick={() => {
                            closeMenu();
                          }}
                        >
                          Home
                        </NavLink>
                      </li>

                      {!user ? (
                        <>
                          <li>
                            <NavLink
                              to='/login'
                              onClick={() => {
                                closeMenu();
                              }}
                            >
                              Log in
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to='/register'
                              onClick={() => {
                                closeMenu();
                              }}
                            >
                              Sign up
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <NavLink
                              to='/dashboard'
                              onClick={() => {
                                closeMenu();
                              }}
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <Logout />
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
