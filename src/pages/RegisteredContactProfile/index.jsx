import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, DescriptionBar, Grid, SearchBar } from '../../components';
import { contactProfileGridColumns } from '../../utils/gridUtils';

import ContactProfileModal from './ContactProfileModal';

const RegisteredContactProfile = () => {
  const [searchValue, setSearchValue] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [contactProfileCraftData, setContactProfileData] = useState([]);

  useEffect(() => {
    // 페이지 진입 시 콤보박스 데이터(위성 리스트) 생성
    getContactProfile();
  }, []);

  const getContactProfile = async () => {
    // 교신프로필 데이터 호출
    const res = await axios.get('/api/contactprofile/page/1');
    const data = res.data;
    console.log('data',data);
    const contactProfileList = data.contactProfileList.map(item => {
      return {
        ...item,
        name: item.groundStationDto ? item.groundStationDto.name : null,
        city: item.groundStationDto ? item.groundStationDto.city : null,
        latitudeDegrees: item.groundStationDto ? item.groundStationDto.latitudeDegrees: null,
        longitudeDegrees: item.groundStationDto ? item.groundStationDto.longitudeDegrees : null,
        minContactDuration: item.groundStationDto ? item.minContactDuration : null,
        minElevationDegrees: item.groundStationDto ? item.minElevationDegrees : null,
        registeredAt: item.groundStationDto ? item.createdDate : null,
      };
    });
    console.log('data.data.contactProfileList',data.contactProfileList);
    setContactProfileData(contactProfileList);
  };
  async function onClickDetail(data) {
    const res = await axios.get(`/api/contactprofile/${data.id}`);
    const resData = res.data
    const autoTrackingFrequencyBandKeys = Object.keys(resData.autoTrackingFrequencyBand);
    const autoTrackingFrequencyBandId = autoTrackingFrequencyBandKeys.map(key => parseInt(key)); 
    console.log('werwere',res);
    const location = data.latitudeDegrees + ',' + data.longitudeDegrees;
    const temp = {
      name: data.name,
      id:data.id,
      city:data.groundStationDto.city,
      minContactDuration: data.minContactDuration,
      minElevationDegrees: data.minElevationDegrees,
      autoTrackingFrequencyBand: data.autoTrackingFrequencyBand,
      autoTrackingFrequencyBandId: autoTrackingFrequencyBandId,
      createdDate: data.groundStationDto.createdDate,
      location:location
    };
    setModalData(temp);
  }

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <DescriptionBar title="Registered Contact Profile" description="Check and access to the registered Contact Profile" />
        <div className="p-4">
          <SearchBar className="w-60" value={searchValue} setValue={setSearchValue} placeholder="Search" />
        </div>
        <div className="w-full max-w-full flex-1">
          <Grid
            gridColumns={contactProfileGridColumns}
            gridData={contactProfileCraftData}
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
      <ContactProfileModal data={modalData} setData={setModalData} />
    </>
  );
};

export default RegisteredContactProfile;
