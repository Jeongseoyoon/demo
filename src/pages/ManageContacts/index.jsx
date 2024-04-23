import { useState } from 'react';

import { Badge, DescriptionBar, Button, Grid, GridFilterBar } from '../../components';
import { cn, scheduleGridFilter } from '../../utils';
import { contactGridColumns, contactGridData, contactGridStatus } from '../../utils';

const ManageContacts = () => {
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
    <>
      <div className="flex h-full w-full flex-col">
        <DescriptionBar
          title="Manage Contacts"
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
        <div className="w-full max-w-full flex-1">
          <Grid
            gridColumns={contactGridColumns}
            gridData={contactGridData}
            filterValue={{
              spacecraft: spaceCraftFilter,
              groundStation: contactFilter,
              date: dateFilter
            }}
            options={{
              useCheckbox: true,
              useFilter: true,
              customCell: {
                status: (value) => (
                  <Badge className={contactGridStatus[value].className} text={contactGridStatus[value].title} />
                ),
                cancelStatus: (value, row, index) => {
                  return <Button text={value} size="small" type="secondary" disabled={row.isCancelStatusDisabled} />;
                }
              }
            }}
            checkedRows={checkedRows}
            setCheckedRows={setCheckedRows}
          />
        </div>
      </div>
    </>
  );
};

export default ManageContacts;
