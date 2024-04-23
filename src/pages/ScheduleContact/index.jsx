import { useState } from 'react';

import ContactCheckout from './ContactCheckout';
import { DescriptionBar, Grid, GridFilterBar } from '../../components';

import { scheduleGridFilter, scheduleGridColumns, scheduleGridData, cn } from '../../utils';

const ScheduleContact = () => {
  const [spaceCraftFilter, setSpaceCraftFilter] = useState('');
  const [contactFilter, setContactFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);

  function onChangeFilter(key) {
    switch (key) {
      case 'spacecraft':
        return (value) => setSpaceCraftFilter(value);
      case 'groundStation':
        return (value) => setContactFilter(value);
      case 'date':
        return (value) => setDateFilter(value);
      default:
        return () => {};
    }
  }

  return (
    <div className="flex h-full w-full flex-col">
      <DescriptionBar
        title="Schedule a Contact"
        description="You can look up your satellite and communication schedules and schedule access to your satellite."
      />
      <GridFilterBar
        filterList={scheduleGridFilter}
        currentFilterValue={{
          spacecraft: spaceCraftFilter,
          groundStation: contactFilter,
          date: dateFilter
        }}
        onChangeFilter={onChangeFilter}
        className={cn('grid grid-cols-2 grid-rows-2', 'md:grid-cols-4 md:grid-rows-1')}
      />
      <div className="flex w-full flex-1 flex-col justify-between">
        <div className="w-full">
          <Grid
            gridColumns={scheduleGridColumns}
            gridData={scheduleGridData}
            filterValue={{
              spacecraft: spaceCraftFilter,
              groundStation: contactFilter,
              date: dateFilter
            }}
            options={{
              useFilter: true,
              useCheckbox: true
            }}
            checkedRows={checkedRows}
            setCheckedRows={setCheckedRows}
          />
        </div>
        <div className="flex w-full items-center justify-center py-3">
          <ContactCheckout
            plan="Subscription 1"
            checkedData={scheduleGridData.filter((_, index) => checkedRows.includes(index))}
            discount={60}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleContact;
