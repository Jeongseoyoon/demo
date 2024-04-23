import { createPortal } from 'react-dom';

const Modal = ({ children, isOpened }) => {
  const modalArea = document.getElementById('modal');
  return createPortal(
    <>
      {isOpened && (
        <div className="fixed left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/10 p-4">
          {children}
        </div>
      )}
    </>,
    modalArea
  );
};

export default Modal;
