import { cn } from '../../utils';
import DatePicker from '../DatePicker';
import SearchBar from '../SearchBar';
import SelectBox from '../SelectBox';

/*
	onChangeFilter: (key) => (value) => setValue(value)
*/

const GridFilterBar = ({ className, filterList, currentFilterValue, onChangeFilter }) => {
  return (
    <div className={cn('gap-4 p-4', 'md:p-6', className)}>
      {filterList.map((filter) => {
        switch (filter.type) {
          case 'selectbox':
            return (
              <SelectBox
                key={filter.key}
                list={filter.list}
                label={filter.label}
                value={currentFilterValue[filter.key]}
                placeholder={filter.placeholder}
                setValue={onChangeFilter(filter.key)}
                className={filter.className}
              />
            );
          case 'date':
            return (
              <DatePicker
                key={filter.key}
                label={filter.label}
                value={currentFilterValue[filter.key]}
                setValue={onChangeFilter(filter.key)}
                className={filter.className}
              />
            );
          default:
            return (
              <SearchBar
                key={filter.key}
                label={filter.label}
                value={currentFilterValue[filter.key]}
                setValue={onChangeFilter(filter.key)}
                className={filter.className}
              />
            );
        }
      })}
    </div>
  );
};

export default GridFilterBar;
