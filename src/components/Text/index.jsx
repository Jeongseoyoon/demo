import { cva } from 'class-variance-authority';
import classnames from 'classnames';

const TextVariants = cva('', {
  variants: {
    color: {
      primary: 'text-text-primary',
      secondary: 'text-text-secondary',
      tertiary: 'text-text-tertiary',
      description: 'text-text-description',
      white: 'text-white'
    },
    weight: {
      semibold: 'font-semibold',
      medium: 'font-medium',
      regular: 'font-regular'
    },
    size: {
      heading1: 'text-heading1',
      heading2: 'text-heading2',
      heading3: 'text-heading3',
      body1: 'text-body1',
      body2: 'text-body2',
      small: 'text-small',
      medium: 'text-medium',
      header: 'text-header'
    }
  }
});

const Text = ({ text, className, color = 'primary', weight = 'medium', size = 'body2' }) => {
  return <p className={classnames(TextVariants({ color, weight, size }), className)}>{text}</p>;
};

export default Text;
