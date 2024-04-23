import { cva } from 'class-variance-authority';
import classnames from 'classnames';

const ButtonVariants = cva('cursor-pointer flex flex-row gap-0.5 justify-between items-center rounded border', {
  variants: {
    size: {
      small: 'px-2 py-[5px] text-small font-medium',
      medium: 'px-3 py-[5.5px] text-body2 font-medium',
      large: 'px-4 py-[9.5px] text-body2 font-medium'
    },
    type: {
      primary: 'bg-button-bg_primary text-button-text_primary border-button-bg_primary',
      secondary: 'bg-button-bg_secondary text-button-text_secondary border-border_primary',
      tertiary: 'bg-button-bg_tertiary text-button-text_tertiary border-0'
    }
  },
  defaultVariants: {
    size: 'medium',
    type: 'primary',
    disabled: 'false'
  }
});

const Button = ({
  className = '',
  text,
  disabled = false,
  size = 'medium',
  type = 'primary',
  htmlType = 'button',
  onClick,
  icon
}) => {
  return (
    <button
      type={htmlType}
      className={classnames(ButtonVariants({ size, type }, className), { 'opacity-button_disabled': disabled })}
      onClick={onClick}
    >
      {icon && icon}
      {text && <span className="text-nowrap">{text}</span>}
    </button>
  );
};

export default Button;
