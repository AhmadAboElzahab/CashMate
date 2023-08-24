import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      Cookies.set('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      setIsLoading(false);

      if (location.state && location.state.from) {
        const originalPath = location.state.from.slice(21);

        navigate(originalPath);
      }
    }
  };

  return { login, isLoading, error };
};
