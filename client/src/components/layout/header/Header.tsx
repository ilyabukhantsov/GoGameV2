import UserIconButton from './components/UserIcon';
import { Link } from 'react-router';
import { useAuth } from '../../../app/context/auth/useAuth';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center px-4 h-14">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span className="text-2xl">SITL</span>
        </div>
        {user ? (
          <UserIconButton
            emailFirstLetter={user.email.slice(0, 1).toUpperCase()}
          />
        ) : (
          <Link
            to={'/login'}
            className="cursor-pointer hover:bg-white/10 px-3 py-1 rounded-full transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
