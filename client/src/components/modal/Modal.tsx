import { useEffect } from 'react';

interface ModalProps {
  children?: React.ReactNode;
  active: boolean;
  setActive: (value: boolean) => void;
}

const Modal = ({ children, active, setActive }: ModalProps) => {
  console.log('Modal render');
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActive(false);
      }
    };

    document.addEventListener('keydown', handleKey);

    return () => {
      console.log('modal rebuild');
      document.removeEventListener('keydown', handleKey);
    };
  }, [setActive]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/40 flex justify-center items-center"
      onClick={() => setActive(false)}
    >
      <div
        className="bg-zinc-800 p-5 rounded-xl shadow-lg border border-zinc-700"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
