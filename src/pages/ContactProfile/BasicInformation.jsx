import { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../../components/Input';
import SelectBox from '../../components/SelectBox';

const AUTOTRACKINGBAND_LIST = [
  { id: 1, text: 'S-band' },
  { id: 2, text: 'X-band' },
  { id: 3, text: 'BOTH' }
];
// NOTE: 실제 데이터로 대체 필요

const BasicInformation = ({ onBasicInformationChange }) => {
  const [groundStationValue, setGroundStationValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [minContactDurationValue, setMinContactDurationValue] = useState('');
  const [minElevationDegreesValue, setMinElevationDegreesValue] = useState('');
  const [autoTrackingFrequencyBandValue, setAutoTrackingFrequencyBandValue] = useState('');
  const [groundStationList, setGroundStationList] = useState([]);
  const [groundStationId, setGroundStationId] = useState(null);
  const [bandIdValue, setBandIdValue] = useState('');

  useEffect(() => {
    // API를 호출하여 지상국 목록 가져오기
    const fetchGroundStationId = async () => {
      try {
        const res = await axios.get('/api/groundstation/page/1');
        const groundStationData = res.data['groundStationList'];
        const selectList = groundStationData.map((m) => {
          return { id: m.id, text: m.city };
        });
        setGroundStationList(selectList);
      } catch (error) {
        console.error('Error fetching ground station ID:', error);
      }
    };

    fetchGroundStationId(); // 컴포넌트가 마운트될 때 API 호출
  }, []); // 빈 배열을 전달하여 한 번만 호출되도록 함

  useEffect(() => {
    // 변경된 정보를 부모 컴포넌트로 전달
    onBasicInformationChange({
      groundStationId: groundStationId,
      name: nameValue,
      minContactDuration: minContactDurationValue,
      minElevationDegrees: minElevationDegreesValue,
      autoTrackingFrequencyBand: bandIdValue,
      locationName: locationValue,
      groundStationName: groundStationValue,
      autoTrackingFrequencyBandName: autoTrackingFrequencyBandValue
    });
  }, [
    groundStationId,
    nameValue,
    minContactDurationValue,
    minElevationDegreesValue,
    bandIdValue,
    locationValue,
    groundStationValue,
    autoTrackingFrequencyBandValue
  ]);

  const onClickListValueCallback = async (e, item) => {
    const id = item.id;
    const res = await axios.get(`/api/groundstation/${id}`);
    const data = res.data;
    setGroundStationId(id);
    const location = data.latitudeDegrees + ',' + data.longitudeDegrees;
    setLocationValue(location);
  };

  const onClickBandValueCallback = (e, item) => {
    setBandIdValue(item.id);
  };

  return (
    <form className="flex w-full flex-col gap-6">
      <SelectBox
        label="Ground Station"
        list={groundStationList}
        value={groundStationValue}
        setValue={setGroundStationValue}
        onClickListValueCallback={onClickListValueCallback}
      />
      <Input label="Location" value={locationValue} setValue={setLocationValue} />
      <Input label="Name" value={nameValue} setValue={setNameValue} />
      <Input
        label="Minimum viable Contact duration"
        value={minContactDurationValue}
        setValue={setMinContactDurationValue}
      />
      <Input
        label="Minimum elevation in degrees"
        value={minElevationDegreesValue}
        setValue={setMinElevationDegreesValue}
      />
      <SelectBox
        label="Auto Tracking Frequency Band"
        list={AUTOTRACKINGBAND_LIST}
        value={autoTrackingFrequencyBandValue}
        setValue={setAutoTrackingFrequencyBandValue}
        onClickListValueCallback={onClickBandValueCallback}
      />
    </form>
  );
};

export default BasicInformation;
