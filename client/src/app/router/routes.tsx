import { createHashRouter } from 'react-router';
import Home from '../Home';
import RegisterPage from '../../pages/auth/RegisterPage';
import LoginPage from '../../pages/auth/LoginPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);
