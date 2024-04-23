import { useState } from 'react';

import { Button, DescriptionBar, Grid, MenuTab, SearchBar } from '../../components';

import { manageTabs } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { PlusOutlineIcon } from '../../assets/svgs';
import { groundStationGridColumns, groundStationGridData } from '../../utils/manageUtils';
import DeleteSelectedBox from './DeleteSelectedBox';
import AddGroundStationModal from './AddGroundStationModal';

const ManageGroundStation = () => {
  const [searchValue, setSearchValue] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();
  const tabIndex = manageTabs.findIndex((tab) => tab.path === '/manage-ground-station');

  function onClickTab(index) {
    navigate(manageTabs[index].path);
  }

  function onClickAdd() {
    setModalData([]);
  }

  return (
    <div className="flex h-full w-full flex-col">
      <DescriptionBar title="Manage Ground Station" description="Check and access to the registered spacecraft" />
      <MenuTab
        menuList={manageTabs.map((tabs) => tabs?.title ?? '')}
        onClickTab={onClickTab}
        selectedMenuIndex={tabIndex}
      />
      <div className="flex flex-row items-center justify-between p-4">
        <SearchBar className="w-60" value={searchValue} setValue={setSearchValue} placeholder="Search" />
        <div className="flex flex-row gap-2">
          <Button text="Delete" type="secondary" />
          <Button text="Edit" type="secondary" />
          <Button
            text="Add"
            icon={<PlusOutlineIcon className="[&_path]:stroke-white" />}
            type="primary"
            onClick={() => onClickAdd()}
          />
        </div>
      </div>
      <div className="w-full max-w-full flex-1">
        <Grid
          gridColumns={groundStationGridColumns}
          gridData={groundStationGridData}
          searchValue={searchValue}
          options={{
            useFilter: false,
            useSearch: {
              use: true,
              searchKeys: ['name', 'city', 'latitude', 'longitude', 'altitude', 'provider']
            },
            useCheckbox: true,
            useSort: {
              use: true,
              sortKeys: ['name', 'city', 'latitude', 'longitude', 'altitude', 'provider', 'status']
            }
          }}
          checkedRows={checkedRows}
          setCheckedRows={setCheckedRows}
        />
      </div>
      <div className="flex w-full items-center justify-center py-3">
        <DeleteSelectedBox checkedData={checkedRows} />
      </div>
      <AddGroundStationModal data={modalData} setData={setModalData} />
    </div>
  );
};

export default ManageGroundStation;
