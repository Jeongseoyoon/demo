import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, DescriptionBar, Grid, SearchBar } from '../../components';
import { registeredGridColumns } from '../../utils/gridUtils';

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
    const res = await axios.get('/api/link/listAll');
    const data = res.data;
    const spacecraftList = data.map((item) => {
      return {
        ...item,
        name: item.spacecraftDto ? item.spacecraftDto.name : null,
        noradId: item.spacecraftDto ? item.spacecraftDto.noradId : null,
        titleLine: item.spacecraftDto ? item.spacecraftDto.tleTitle : null,
        registeredAt: item.spacecraftDto ? item.spacecraftDto.createdDate : null,
        direction: item.spacecraftDto ? item.linkDirection : null
      };
    });
    setSpaceCraftData(spacecraftList);
  };

  async function onClickDetail(data) {
    const res = await axios.get(`/api/link/${data.id}`);
    const resData = res.data;
    console.log('rere', resData);
    let newDirectionId = '';
    let newDirectionValue = '';
    for (const key in resData.linkDirection) {
      newDirectionId = parseInt(key);
      newDirectionValue = resData.linkDirection[key];
    }
    let newPolarizationId = '';
    let newPolarizationValue = '';
    for (const key in resData.polarization) {
      newPolarizationId = parseInt(key);
      newPolarizationValue = resData.polarization[key];
    }
    const temp = {
      name: data.name,
      noradId: data.noradId,
      titleLine: data.spacecraftDto.tleTitle,
      tleFirst: data.spacecraftDto.tleFirst,
      tleSecond: data.spacecraftDto.tleSecond,
      directionId: newDirectionId,
      direction: newDirectionValue,
      frequency: data.centerFrequency,
      bandwidth: data.bandwidth,
      polarizationId: newPolarizationId,
      polarization: newPolarizationValue,
      id: data.id,
      isFirst: true
    };
    console.log('temp', temp);
    setModalData(temp);
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
