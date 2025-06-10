import UserDropdown from './UserDropdown';
import { useState } from 'react';

interface UserIconButtonProps {
  emailFirstLetter: string;
}

const UserIconButton = ({ emailFirstLetter }: UserIconButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div className="relative">
        <button
          className="size-8 rounded-full bg-default"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
        >
          <div className="flex justify-center items-center size-full rounded-full hover-default">
            <span>{emailFirstLetter}</span>
          </div>
        </button>
        {isOpen && <UserDropdown isOpen={isOpen} setIsOpen={setIsOpen} />}
      </div>
    </>
  );
};

export default UserIconButton;
