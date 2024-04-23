import { useState } from "react";
import Input from "../../components/Input";
import SelectBox from "../../components/SelectBox";

const GROUNDSTAION_LIST = ['Daejeon', 'Sacheon'];
// NOTE: 실제 데이터로 대체 필요

const BasicInformation = () => {

  const [groundStationValue, setGroundStationValue] = useState(GROUNDSTAION_LIST[0]);
  const [noradValue, setNoradValue] = useState('');
  const [tleTitleValue, setTleTitleValue] = useState('');
  const [tleLine1Value, setTleLine1Value] = useState('');
  const [tleLine2Value, setTleLine2Value] = useState('');

  

  return (
    <form className="flex w-full flex-col gap-6">
      <SelectBox label="Ground Station" list={GROUNDSTAION_LIST} value={groundStationValue} setValue={setGroundStationValue} />
      <Input label="Location" value={noradValue} setValue={setNoradValue} />
      <Input label="Name" value={tleTitleValue} setValue={setTleTitleValue} />
      <Input label="Minimum viable Contact duration" value={tleLine1Value} setValue={setTleLine1Value} />
      <Input label="Minimum elevation in degrees" value={tleLine2Value} setValue={setTleLine2Value} />
    </form>
  )
}

export default BasicInformation;
