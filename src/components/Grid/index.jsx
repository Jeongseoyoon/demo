import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { cloneDeep, isString } from 'lodash-es';

import Checkbox from '../Checkbox';
import Text from '../Text';
import { ChevronDownOutlineIcon } from '../../assets/svgs';

const Grid = ({ gridColumns, gridData, filterValue, searchValue, checkedRows, setCheckedRows, options, className }) => {
  const [innerGridData, setInnerGridData] = useState(cloneDeep(gridData));
  const [isAllChecked, setIsAllChecked] = useState(false);

  function onCheckAll(isChecked) {
    if (!isChecked) {
      setCheckedRows([]);
    } else {
      setCheckedRows(gridData.map((_, index) => index));
    }
    setIsAllChecked(isChecked);
  }

  function onCheckRow(index) {
    if (checkedRows.includes(index)) {
      setCheckedRows((prev) => prev.filter((value) => value !== index));
    } else {
      setCheckedRows((prev) => [...prev, index]);
    }
  }

  function filterData() {
    if (options?.useFilter) {
      const filterKey = Object.keys(filterValue);
      return gridData.filter((data) => {
        return filterKey.every((key) => {
          if (!data[key]) {
            return true;
          }
          return data[key].includes(filterValue[key]);
        });
      });
    }
    return cloneDeep(gridData);
  }

  function searchData() {
    if (options?.useSearch?.use) {
      const searchKey = options?.useSearch?.searchKeys ?? [];
      return gridData.filter((data) => {
        return searchKey.some((key) => {
          if (!data[key]) {
            return true;
          }
          return data[key].includes(searchValue);
        });
      });
    }
    return cloneDeep(gridData);
  }

  function sortData(key) {
    setInnerGridData((prev) =>
      prev.sort((a, b) => {
        if (isString(a[key])) {
          return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
        }
        return a[key] - b[key];
      })
    );
  }

  useEffect(() => {
    setInnerGridData(filterData);
  }, [filterValue]);

  useEffect(() => {
    setInnerGridData(searchData);
  }, [searchValue]);

  return (
    <table className={classnames('w-full', className)}>
      <thead className="table-header-group h-12 w-full border-b border-b-border-primary">
        <tr className="table-row">
          {options?.useCheckbox && (
            <th className="px-3" style={{ width: 16 }}>
              <Checkbox inputKey="check-all" value={isAllChecked} onChange={onCheckAll} />
            </th>
          )}
          {gridColumns.map((col) => (
            <th style={{ maxWidth: col.width, width: col.width }} className="px-3" key={col.key}>
              <div className="flex h-full w-full flex-row items-center gap-2">
                <Text text={col.title} weight="medium" color="tertiary" className="text-start" />
                {options?.useSort?.use && options?.useSort?.sortKeys?.includes(col.key) && (
                  <button type="button" className="h-3 w-3" onClick={() => sortData(col.key)}>
                    <ChevronDownOutlineIcon className="h-3 w-3 [&_path]:stroke-text-tertiary" />
                  </button>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {innerGridData.map((data, index) => (
          <tr
            key={index}
            className={classnames('table-row h-12', {
              'bg-system50': options?.useCheckbox && checkedRows.includes(index)
            })}
          >
            {options?.useCheckbox && (
              <td className="h-12 px-3 py-0" style={{ width: 16 }}>
                <Checkbox
                  inputKey={`grid-row-${index}`}
                  value={checkedRows.includes(index)}
                  onChange={() => onCheckRow(index)}
                />
              </td>
            )}
            {gridColumns.map((col, idx) => (
              <td
                key={idx}
                className="h-12 px-3 py-0"
                style={{ maxWidth: col.width, width: col.width, minWidth: col.width }}
                title={data[col.key]}
              >
                {options?.customCell?.[col.key] ? (
                  options?.customCell?.[col.key](data[col.key], data, index)
                ) : (
                  <Text text={data[col.key]} className="w-full overflow-hidden text-ellipsis whitespace-nowrap" />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
