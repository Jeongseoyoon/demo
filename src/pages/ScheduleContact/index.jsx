import { useEffect, useState } from 'react';

import ContactCheckout from './ContactCheckout';
import { DescriptionBar, Grid, GridFilterBar } from '../../components';

import { scheduleGridFilter, scheduleGridColumns, cn } from '../../utils';
import useAxios from '../../utils/useAxios';

const ScheduleContact = () => {
  const [spaceCraftFilter, setSpaceCraftFilter] = useState('');
  const [contactFilter, setContactFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState(0);
  const [endDateFilter, setEndDateFilter] = useState(0);
  const [checkedRows, setCheckedRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  function onChangeFilter(key) {
    switch (key) {
      case 'spacecraft':
        return (value) => setSpaceCraftFilter(value);
      case 'groundStation':
        return (value) => setContactFilter(value);
      case 'startdate':
        return (value) => setStartDateFilter(value);
      case 'enddate':
        return (value) => setEndDateFilter(value);
      default:
        return () => {};
    }
  }

  const getItemId = (key, text) => {
    const selectedOption = scheduleGridFilter
      .find((filter) => filter.key === key)
      .list.find((option) => option.text === text);
    const selectedId = selectedOption ? selectedOption.id : 0;
    return selectedId;
  };

  const { getGridData, gridData, loading } = useAxios();
  useEffect(() => {
    if (spaceCraftFilter !== '' && contactFilter !== '') {
      const item = {
        spacecraftId: getItemId('spacecraft', spaceCraftFilter),
        groundStationId: getItemId('groundStation', contactFilter),
        startDate: startDateFilter.toString().slice(0, 10),
        endDate: endDateFilter.toString().slice(0, 10)
      };
      const url = `http://172.30.1.58:8080/schedule/${pageNumber}/10/${item.spacecraftId}/${item.groundStationId}/0/${item.startDate}/${item.endDate}`;
      getGridData(url);
    }
  }, [contactFilter, spaceCraftFilter, endDateFilter, startDateFilter, pageNumber]);

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
          startDate: startDateFilter,
          endDate: endDateFilter
        }}
        onChangeFilter={onChangeFilter}
        className={cn('grid grid-cols-2 grid-rows-2', 'md:grid-cols-4 md:grid-rows-1')}
      />
      <div className="flex w-full flex-1 flex-col justify-between">
        <div className="w-full">
          <Grid
            gridColumns={scheduleGridColumns}
            gridData={gridData}
            filterValue={{
              spacecraft: spaceCraftFilter,
              groundStation: contactFilter,
              startDate: startDateFilter,
              endDate: endDateFilter
            }}
            options={{
              useFilter: true,
              useCheckbox: true
            }}
            checkedRows={checkedRows}
            setCheckedRows={setCheckedRows}
          />
          <button
            onClick={() => {
              if (pageNumber > 1) {
                var number = pageNumber - 1;
                setPageNumber(number);
              }
            }}
          >
            이전페이지
          </button>
          <br></br>
          <button
            onClick={async () => {
              var number = pageNumber + 1;
              setPageNumber(number);
            }}
          >
            다음페이지
          </button>
        </div>
        <div className="flex w-full items-center justify-center py-3">
          <ContactCheckout
            plan="Subscription 1"
            checkedData={gridData.filter((_, index) => checkedRows.includes(index))}
            discount={60}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleContact;
