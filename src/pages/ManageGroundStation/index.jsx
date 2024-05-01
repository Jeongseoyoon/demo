import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, DescriptionBar, Grid, MenuTab, SearchBar } from '../../components';

import { manageTabs } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { PlusOutlineIcon } from '../../assets/svgs';
import { groundStationGridColumns } from '../../utils/manageUtils';
import DeleteSelectedBox from './DeleteSelectedBox';
import AddGroundStationModal from './AddGroundStationModal';
import EditGroundStationModal from './EditGroundStationModal';

const ManageGroundStation = () => {
  const [searchValue, setSearchValue] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalEditData, setModalEditData] = useState(null);
  const [groundStationData, setGroundStationData] = useState([]);

  const navigate = useNavigate();
  const tabIndex = manageTabs.findIndex((tab) => tab.path === '/manage-ground-station');
  
  function onClickTab(index) {
    navigate(manageTabs[index].path);
  }

  function onClickAdd() {
    setModalData([]);
  }

  useEffect(() => {
    getGroundStation();
  }, []);

  const getGroundStation = async () => {
    //지상국 리스트 데이터 호출
    const res = await axios.get('/api/groundstation/listAll');
    const data = res.data;
    console.log('getGroundStation', data);
    setGroundStationData(data);
  };

  const onDelete = async (e) => {
    // 데이터 삭제 요청
    const index = checkedRows[0];
    const checkData = groundStationData[index];
    console.log(checkData);
    try {
      await axios.delete(`/api/groundstation/${checkData.id}`);
      window.location.href = '/manage-ground-station';
    } catch (error) {
      console.error('error:', error);
      // 오류 처리
    }
  };

  function onClickEdit(data) {
    const temp = {
      id: data.id,
      name: data.name,
      altitudeMeters: data.altitudeMeters,
      city: data.city,
      latitudeDegrees: data.latitudeDegrees,
      longitudeDegrees: data.longitudeDegrees,
      providerName: data.providerName,
      status: data.status,
    };
    setModalEditData(temp);
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
          <Button text="Delete" type="secondary" onClick={(e) => onDelete(e)} />
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
          gridData={groundStationData}
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
            },
            customCell: {
              viewDetails: (_, row, index) => (
                <Button text="Edit" type="secondary" size="small" onClick={() => onClickEdit(row)} />
              )
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
      <EditGroundStationModal data={modalEditData} setData={setModalEditData} />
    </div>
  );
};

export default ManageGroundStation;
