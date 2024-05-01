import classnames from 'classnames';

const Input = ({ className, type = 'text', label, value, setValue, onKeyDown,placeholder }) => {
  function onChangeInput(e) {
    setValue(e.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      // Enter 키를 눌렀을 때 추가적인 동작을 수행하도록 설정
      if (typeof onKeyDown === 'function') {
        onKeyDown(e);
      }
    }
  }

  return (
    <div className={classnames('flex, w-full flex-col', className)}>
      <label className={classnames('mb-1 block text-body2 font-medium', 'text-text-secondary')} htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        type={type}
        className={classnames('border-border-primary', 'relative h-8 w-full rounded border bg-bg-main px-3')}
        value={value}
        onChange={onChangeInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
