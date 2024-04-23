import classnames from 'classnames';

import { CheckIcon } from '../../assets/svgs';
import { cn } from '../../utils';

const Checkbox = ({ className, inputKey, value, onChange }) => {
  function onChangeInput(e) {
    onChange(e.target.checked);
  }

  return (
    <div className={cn('h-4 w-4', className)}>
      <label
        htmlFor={inputKey}
        className={classnames('flex h-4 w-4 items-center justify-center rounded border border-border-primary', {
          'border-system100 bg-system100': value
        })}
      >
        {value && <CheckIcon className="[&_path]:fill-white" />}
      </label>
      <input id={inputKey} type="checkbox" value={value} onChange={onChangeInput} hidden />
    </div>
  );
};

export default Checkbox;
