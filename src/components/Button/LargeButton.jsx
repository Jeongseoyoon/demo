import { cva } from 'class-variance-authority';

import { cn } from '../../utils';

const LargeButtonVariants = cva('flex items-center justify-center rounded border', {
  variants: {
    type: {
      primary: 'bg-button-bg_primary text-button-text_primary border-border_primary',
      secondary: 'bg-button-bg_secondary text-button-text_secondary border-border_secondary'
    }
  }
});

const LargeButton = ({ className = '', type = 'primary', htmlType = 'button', text, onClick }) => {
  return (
    <button type={htmlType} className={cn(LargeButtonVariants({ type }), className)} onClick={onClick}>
      <span className="text-body2 font-medium">{text}</span>
    </button>
  );
};

export default LargeButton;
