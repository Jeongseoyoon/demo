import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, DescriptionBar, Grid, SearchBar } from '../../components';
import { registeredGridColumns, registeredGridData } from '../../utils/gridUtils';

import SpaceCraftModal from './SpaceCraftModal';

const RegisteredSpaceCraft = () => {
  const [searchValue, setSearchValue] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [spaceCraftData, setSpaceCraftData] = useState([]);

  useEffect(() => {
    // 페이지 진입 시 콤보박스 데이터(위성 리스트) 생성
    getSpaceCraft();
  }, []);

  const getSpaceCraft = async () => {
    // 위성 리스트 데이터 호출
    const res = await axios.get('/api/spacecraft/page/1');
    const data = res.data;
    const spacecraftList = data.spacecraftList;
    setSpaceCraftData(spacecraftList);
  };

  function onClickDetail(data) {
    setModalData(data);
  }

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <DescriptionBar title="Registered Spacecraft" description="Check and access to the registered spacecraft" />
        <div className="p-4">
          <SearchBar className="w-60" value={searchValue} setValue={setSearchValue} placeholder="Search" />
        </div>
        <div className="w-full max-w-full flex-1">
          <Grid
            gridColumns={registeredGridColumns}
            gridData={spaceCraftData}
            searchValue={searchValue}
            options={{
              useFilter: false,
              useSearch: {
                use: true,
                searchKeys: ['name', 'Norad ID', 'direction', 'titleLine']
              },
              useCheckbox: true,
              useSort: {
                use: true,
                sortKeys: ['name', 'Norad ID', 'direction', 'titleLine', 'registeredAt']
              },
              customCell: {
                viewDetails: (_, row, index) => (
                  <Button text="View Details" type="secondary" size="small" onClick={() => onClickDetail(row)} />
                )
              }
            }}
            checkedRows={checkedRows}
            setCheckedRows={setCheckedRows}
          />
        </div>
      </div>
      <SpaceCraftModal data={modalData} setData={setModalData} />
    </>
  );
};

export default RegisteredSpaceCraft;
