import { useNavigate } from 'react-router-dom';

import { cn } from '../../utils';
import { Text } from '../../components';

const GetStartedButton = ({ icon, title, path, description, className }) => {
  const navigate = useNavigate();

  function onClickButton() {
    navigate(path);
  }

  return (
    <button
      type="button"
      className={cn(
        className,
        'flex w-full flex-col items-center justify-center gap-4 rounded border p-4',
        'border-border-primary',
        '[&>svg]:h-[78px] [&>svg]:w-[78px]',
        'md:h-full'
      )}
      onClick={onClickButton}
    >
      {icon}
      <div className={cn('w-full', 'md:h-20 md:w-[400px]')}>
        <h3 className="mb-2 text-heading3 font-semibold text-text-primary">{title}</h3>
        <Text color="secondary" size="body2" weight="regular" text={description} />
      </div>
    </button>
  );
};

export default GetStartedButton;
