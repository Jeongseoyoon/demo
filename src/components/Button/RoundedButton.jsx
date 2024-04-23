import { cva } from 'class-variance-authority';

import { cn } from '../../utils';

const RoundedButtonVariants = cva('flex items-center justify-center px-4 py-2 rounded-full', {
  variants: {
    type: {
      primary: 'bg-system100 text-button-text_primary',
      secondary: 'bg-bg-transparent_gray text-text-primary'
    }
  }
});

const RoundedButton = ({ className = '', type = 'primary', htmlType = 'button', text, onClick }) => {
  return (
    <button type={htmlType} className={cn(RoundedButtonVariants({ type }), className)} onClick={onClick}>
      <span className="text-body2 font-medium">{text}</span>
    </button>
  );
};

export default RoundedButton;
