import { useEffect, useState } from 'react';
import { SelectBox, Input } from '../../components';

const DUMMY_DIRECTION_LIST = [
  { id: 1, text: 'Uplink' },
  { id: 2, text: 'Downlink' }
];
const DUMMY_POLARIZE_LIST = [
  { id: 1, text: 'RHCP' },
  { id: 2, text: 'LHCP' },
  { id: 3, text: 'BOTH' }
];

const LinkForm = ({ onSaveLinkInfo }) => {
  const [linkNameValue, setLinkNameValue] = useState('');
  const [directionValue, setDirectionValue] = useState('');
  const [directionId, setDirectionId] = useState('');
  const [centerFreqValue, setCenterFreqValue] = useState('');
  const [bandwidthValue, setBandwidthValue] = useState('');
  const [polarizeValue, setPolarizeValue] = useState('');
  const [polarizeId, setPolarizeId] = useState('');

  useEffect(() => {
    // Link 정보가 변경될 때마다 onSaveLinkInfo를 호출하여 부모 컴포넌트로 전달
    onSaveLinkInfo({
      name: linkNameValue,
      linkDirection: directionId,
      directionValue: directionValue,
      centerFrequency: centerFreqValue,
      bandwidth: bandwidthValue,
      polarization: polarizeId,
      polarizeValue: polarizeValue
    });
  }, [linkNameValue, directionId, centerFreqValue, bandwidthValue, polarizeId, directionValue, polarizeValue]);

  const onClickDirectionCallback = (e, item) => {
    setDirectionId(item.id);
  };

  const onClickPolarizationCallback = (e, item) => {
    setPolarizeId(item.id);
  };

  return (
    <form className="flex w-full flex-col gap-6">
      <Input label="Link Name" value={linkNameValue} setValue={setLinkNameValue} name="name" />
      <SelectBox
        label="Direction"
        list={DUMMY_DIRECTION_LIST}
        value={directionValue}
        setValue={setDirectionValue}
        onClickListValueCallback={onClickDirectionCallback}
        name="linkDirection"
      />
      <Input
        label="Center Frequency (MHz)"
        value={centerFreqValue}
        setValue={setCenterFreqValue}
        name="centerFrequency"
        placeholder={"Rx (2200~2300), Tx (2025~2120)"}
      />
      <Input label="Bandwidth (MHz)" value={bandwidthValue} setValue={setBandwidthValue} name="bandwidth"/>
      <SelectBox
        label="Polarization"
        list={DUMMY_POLARIZE_LIST}
        value={polarizeValue}
        setValue={setPolarizeValue}
        onClickListValueCallback={onClickPolarizationCallback}
        name="polarization"
      />
    </form>
  );
};

export default LinkForm;
