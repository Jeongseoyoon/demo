import { useEffect, useState } from 'react';

import { Badge, DescriptionBar, Button, Grid, GridFilterBar } from '../../components';
import { cn, scheduleGridFilter } from '../../utils';
import { contactGridColumns, contactGridStatus, contactGridCancelStatus } from '../../utils';
import useAxios from '../../utils/useAxios';

const ManageContacts = () => {
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
      const url = `http://172.30.1.58:8080/schedule/${pageNumber}/10/${item.spacecraftId}/${item.groundStationId}/1/${item.startDate}/${item.endDate}`;
      getGridData(url);
    }
  }, [contactFilter, spaceCraftFilter, endDateFilter, startDateFilter, pageNumber]);

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
            startDate: startDateFilter,
            endDate: endDateFilter
          }}
          onChangeFilter={onChangeFilter}
          className={cn('grid grid-cols-2 grid-rows-2', 'md:grid-cols-4 md:grid-rows-1')}
        />
        <div className="w-full max-w-full flex-1">
          <Grid
            gridColumns={contactGridColumns}
            gridData={gridData}
            filterValue={{
              spacecraft: spaceCraftFilter,
              groundStation: contactFilter,
              startDate: startDateFilter,
              endDate: endDateFilter
            }}
            options={{
              useCheckbox: true,
              useFilter: true,
              customCell: {
                status: (value) => (
                  <Badge className={contactGridStatus[value].className} text={contactGridStatus[value].title} />
                ),
                cancelStatus: (value, row, index) => {
                  return (
                    <Button
                      text={contactGridCancelStatus[value].text}
                      size="small"
                      type="secondary"
                      disabled={row.isCancelStatusDisabled}
                    />
                  );
                }
              }
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
      </div>
    </>
  );
};

export default ManageContacts;
