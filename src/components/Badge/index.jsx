import classnames from 'classnames';

const Badge = ({ className, text }) => {
  return (
    <div className={classnames('flex h-6 w-fit items-center rounded-full border px-3', className)}>
      <span className="text-nowrap text-small font-medium">{text}</span>
    </div>
  );
};

export default Badge;
