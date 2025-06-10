import { Link } from 'react-router';
import ActionListDivider from './ActionListDivider';
import { useEffect } from 'react';
import { useAuth } from '../../../../app/context/auth/useAuth';

interface UserDropdownProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const UserDropdown = ({ isOpen, setIsOpen }: UserDropdownProps) => {
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const close = () => setIsOpen(false);

    document.addEventListener('keydown', handleKey);
    document.addEventListener('click', close);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('click', close);
    };
  }, [setIsOpen]);

  if (!isOpen) return null;

  const dropdownItemClass =
    'flex text-[14px] px-2 py-1.5 rounded-lg hover-default w-full';
  return (
    <div
      className="w-[300px] absolute top-0 left-[-316px] p-4 bg-default rounded-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 max-[440px]:hidden">
          <span
            className={`block size-3 rounded-full ${user?.isActivated ? 'bg-green-500' : 'bg-red-500'}`}
            title={
              user?.isActivated
                ? 'Користувач активований'
                : 'Користувач не активований'
            }
          ></span>
          <p>{user?.email} </p>
        </div>
        <ul>
          <li>
            <Link to={'/profile'} className={dropdownItemClass}>
              Your profile
            </Link>
          </li>
          <ActionListDivider />
          <li>
            <button onClick={logout} className={dropdownItemClass}>
              <span className="text-[14px]">Sign out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;
