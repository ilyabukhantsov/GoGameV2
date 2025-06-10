import { useState } from 'react';
import Modal from '../../components/modal/Modal';

const AddScrimButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Add Scrim result</button>
      {isModalOpen && (
        <Modal active={isModalOpen} setActive={setIsModalOpen}>
          <div>Форма для додавання праку</div>
          <button>Кнопка для сабміту форми</button>
        </Modal>
      )}
    </>
  );
};

export default AddScrimButton;
