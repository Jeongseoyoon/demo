import { useState } from 'react';
import classnames from 'classnames';

import { ChevronDownOutlineIcon } from '../../assets/svgs';
import { useClickOutside } from '../../hooks/useClickOutside';
import { cn } from '../../utils';
import Label from '../Label';

const SelectBox = ({ className, list, label, value, placeholder, setValue, onClickListValueCallback }) => {
  const [isListShown, setIsListShown] = useState(false);
  const { ref } = useClickOutside(onClickOutside);

  function onClickTopButton() {
    setIsListShown(true);
  }

  function onClickOutside() {
    setIsListShown(false);
  }

  function onClickListValue(event, item) {
    event.preventDefault();
    setValue(item.text);
    setIsListShown(false);
    // SelectBox 선택 시 추가적인 로직을 수행하기 위한 로직 추가(추가 로직 수행 함수가 있을 경우 해당 함수 실행시킴)
    if (onClickListValueCallback){
      onClickListValueCallback(event, item);
    }
  }

  return (
    <div className={classnames('max-w-100', className)}>
      <Label label={label} />
      <div className={classnames('border-border-primary', 'relative h-8 w-full rounded border bg-bg-main')} ref={ref}>
        <button
          type="button"
          onClick={onClickTopButton}
          className="flex h-full w-full flex-row items-center justify-between gap-2 pl-3 pr-1"
        >
          <span
            className={cn('inline-block flex-1 text-left text-body2 font-medium', {
              'text-text-tertiary': !value,
              'text-text-primary': value
            })}
          >
            {value || placeholder}
          </span>
          <div className="flex h-6 w-6 items-center justify-center">
            <ChevronDownOutlineIcon className="h-3 w-3 " />
          </div>
        </button>
        {isListShown && (
          <ul className={classnames('absolute z-10 mt-1 w-full border bg-bg-main', 'border-border-primary')}>
            {list.map((element) => (
              <li
                key={element.id}
                className={classnames('h-8 border-b px-3 [&:last-child]:border-b-0', 'border-border-primary')}
              >
                <button
                  type="button"
                  onClick={(e) => onClickListValue(e, element)}
                  className="h-full w-full text-start"
                >
                  <span>{element.text}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectBox;
