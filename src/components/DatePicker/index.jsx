import classnames from 'classnames';
import Label from '../Label';

const DatePicker = ({ className, label, value, setValue }) => {
  function onChange(e) {
    setValue((prev) => e.target?.value ?? prev);
  }

  return (
    <div className={classnames(className)}>
      <Label label={label} />
      <input
        className={classnames(
          'border-border-primary',
          'h-8 w-full rounded border bg-bg-main pl-2 pr-1 text-body2 font-medium text-text-primary'
        )}
        type="datetime-local"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DatePicker;
