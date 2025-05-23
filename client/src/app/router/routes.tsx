import { createHashRouter } from 'react-router';
import Home from '../Home';
import RegisterPage from '../../pages/auth/RegisterPage';
import LoginPage from '../../pages/auth/LoginPage';
import { ProtectedRoutes } from './ProtectedRoutes/ProtectedRoutes';

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: 
      <ProtectedRoutes>
        <LoginPage />
      </ProtectedRoutes>,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);
