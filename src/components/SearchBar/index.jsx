import Label from '../Label';
import { cn } from '../../utils';

import { SearchOutlineIcon } from '../../assets/svgs';

const SearchBar = ({ label, placeholder, value, setValue, className }) => {
  function onChange(e) {
    setValue((prev) => e.target?.value ?? prev);
  }

  return (
    <div className={cn('w-full', className)}>
      {label && <Label label={label} />}
      <div className="flex h-8 flex-row items-center rounded border border-border-primary bg-bg-main  px-3">
        <input
          className="flex-1 bg-transparent text-body2 font-medium"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <SearchOutlineIcon className="h-4 w-4" />
      </div>
    </div>
  );
};

export default SearchBar;
