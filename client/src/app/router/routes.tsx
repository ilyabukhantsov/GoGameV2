import { createHashRouter } from 'react-router';
import Home from '../Home';
import RegisterPage from '../../pages/auth/RegisterPage';
import LoginPage from '../../pages/auth/LoginPage';
import { ProtectedRoutes } from './ProtectedRoutes/ProtectedRoutes';
import PassRecoveryPage from '../../pages/auth/PassRecoveryPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: (
      <ProtectedRoutes>
        <LoginPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/register',
    element: (
      <ProtectedRoutes>
        <RegisterPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/pass-recovery',
    element: <PassRecoveryPage />,
  },
]);
