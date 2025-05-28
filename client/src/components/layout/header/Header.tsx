import { Link } from 'react-router';
import { useAuth } from '../../../app/context/auth/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="px-2.5 py-1">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span>Burger</span>
          <span className="text-2xl">SITL</span>
        </div>
        <div className="flex items-center gap-5">
          {user ? (
            <>
              <div className="flex items-center gap-2 max-[440px]:hidden">
                <span
                  className={`block size-3 rounded-full ${user.isActivated ? 'bg-green-500' : 'bg-red-500'}`}
                  title={
                    user.isActivated
                      ? 'Користувач активований'
                      : 'Користувач не активований'
                  }
                ></span>
                <p>{user.email} </p>
              </div>
              <button
                className="cursor-pointer hover:bg-white/10 px-3 py-1 rounded-full transition duration-200"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to={'/login'}
              className="cursor-pointer hover:bg-white/10 px-3 py-1 rounded-full transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
