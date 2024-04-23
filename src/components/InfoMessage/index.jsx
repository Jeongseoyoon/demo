import { createPortal } from 'react-dom';

import Text from '../Text';
import { XOutlineIcon } from '../../assets/svgs';
import { cn } from '../../utils';

const MessageBox = ({ index, icon, text, bgClassName = 'bg-[#2AC111]', onClickDelete }) => {
  return (
    <div
      className={cn(
        bgClassName,
        'flex h-10 w-[480px] flex-row items-center justify-between gap-2 rounded-lg px-3',
        '[&>svg]:h-4 [&>svg]:w-4 [&_path]:stroke-white'
      )}
    >
      {icon}
      <Text className="flex-1" color="white" text={text} />
      <button className="h-4 w-4" type="button" onClick={() => onClickDelete(index)}>
        <XOutlineIcon className="h-4 w-4 [&_path]:stroke-white" />
      </button>
    </div>
  );
};

const MessageWrapper = ({ messageArray, onClickDelete }) => {
  return (
    <div className="fixed right-10 top-3 flex flex-col gap-2">
      {messageArray.map((message, index) => (
        <MessageBox key={index} {...message} onClickDelete={onClickDelete} />
      ))}
    </div>
  );
};

const InfoMessage = ({ messageArray, onClickDelete }) => {
  const messageArea = document.getElementById('message-area');
  return createPortal(<MessageWrapper messageArray={messageArray} onClickDelete={onClickDelete} />, messageArea);
};

export default InfoMessage;
