import Modal from '../Modal';
import { Button } from '../Button';

const Alert = ({ isOpened, onClickClose, message }) => {
  return (
    <Modal isOpened={isOpened}>
      <div className="h-fit w-[560px] rounded-2xl bg-white shadow-primary">
        <div className="flex flex-row items-center justify-between p-4">
        {message}
        </div>
        <div className="flex w-full flex-row items-center justify-end bg-bg-transparent_gray_light p-4">
          <Button text="Close" onClick={onClickClose} type="primary" size="large" />
        </div>
      </div>
    </Modal>
  );
};

export default Alert;
