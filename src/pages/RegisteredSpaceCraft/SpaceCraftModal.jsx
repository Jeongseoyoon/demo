import { XOutlineIcon } from '../../assets/svgs';
import axios from 'axios';
import { Button, Input, Modal, SelectBox, Text } from '../../components';
import { registeredModalList } from '../../utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DUMMY_DIRECTION_LIST = [
  { id: 1, text: 'Uplink' },
  { id: 2, text: 'Downlink' }
];
const DUMMY_POLARIZE_LIST = [
  { id: 1, text: 'RHCP' },
  { id: 2, text: 'LHCP' },
  { id: 3, text: 'BOTH' }
];
//1.저장하고, 새로고침한다
//2. 상세불러오기 API따로 만들어서 save 하고 나서 다시 조회리스트 호출 
const SpaceCraftModalListElement = ({ title, value }) => {
  return (
    <li className="border-primary rounded-lg border px-3 py-2">
      <Text weight="medium" size="body2" color="tertiary" text={title} />
      <Text weight="medium" size="body2" color="primary" text={value} />
    </li>
  );
};

const SpaceCraftModalEditElement = ({ title, value }) => {
  return (
    <li className="border-primary rounded-lg border px-3 py-2">
      <Text weight="medium" size="body2" color="tertiary" text={title} />
      <Text weight="medium" size="body2" color="primary" text={value} />
      <Input label="Name" />
      <Input label="City" />
    </li>
  );
};
const SpaceCraftModal = ({ data, setData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [direction, setDirectionValue] = useState('');
  const [directionId, setDirectionId] = useState('');
  const [bandwidthValue, setBandwidthValue] = useState('');
  const [centerFreqValue, setCenterFreqValue] = useState('');
  const [polarizeValue, setPolarizeValue] = useState('');
  const [polarizeId, setPolarizeId] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    if (data) {
      // 데이터가 처음으로 로드될 때 초기화
      setDirectionValue(data.direction);
      setDirectionId(data.directionId[0]);        
      setPolarizeValue(data.polarization);
      setBandwidthValue(data.bandwidth);
      setCenterFreqValue(data.frequency);
      setPolarizeId(data.polarizationId[0]);
      setIsEdit(false);
      console.log('dbwm',data);
    }
  }, [data]);



  const onClickListValueCallback = (e, item) => {
    setDirectionId(item.id);
    setPolarizeId(item.id);
  };
  const onEdit = (e) => {
    setIsEdit(true);
  };
  const onSave = async (e) => {

    const updatedData = {
      linkDirection: directionId,
      centerFrequency: centerFreqValue,
      bandwidth: bandwidthValue,
      polarization: polarizeId,
    };
    console.log('data',data);
    console.log('dataupdatedData',updatedData);
    const spacecraftRes = await axios.patch(`/api/link/${data.id}`, updatedData);
    console.log('spacecraftRes',spacecraftRes);
    setIsEdit(false);
    navigate('/registered-spacecraft');

  };

  const onDelete = async (e) => {
    // 데이터 삭제 요청
    try {
      await axios.delete(`/api/link/${data.id}`);
      window.location.href = '/registered-spacecraft';
    } catch (error) {
      console.error('error:', error);
      // 오류 처리
    }
  };

  const handleGoBack = () => {
    // window.location.reload();
    setIsEdit(false);
  };

  return (
    <Modal isOpened={!!data}>
      {/* input */}
      {isEdit && data && (
        <div className="h-fit w-[560px] rounded-2xl bg-white shadow-primary">
          <div className="flex flex-row items-center justify-between p-4">
            <Text size="body1" weight="semibold" text={data.name} />
            <button type="button" className="flex h-8 w-8 items-center justify-center" onClick={() => setData(null)}>
              <XOutlineIcon className="h-4 w-4" onClick={handleGoBack}/>
            </button>
          </div>
          <ul className="flex max-h-[60vh] flex-col gap-4 overflow-auto px-4 pb-4">
            <li className="border-primary rounded-lg border px-3 py-2">
              <Text weight="medium" size="body2" color="tertiary" text={'NORAD ID'} />
              <Text weight="medium" size="body2" color="primary" text={data['noradId']} />
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <Text weight="medium" size="body2" color="tertiary" text={'TLE - Title Line'} />
              <Text weight="medium" size="body2" color="primary" text={data['titleLine']} />
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <Text weight="medium" size="body2" color="tertiary" text={'TLE - Line 1'} />
              <Text weight="medium" size="body2" color="primary" text={data['tleFirst']} />
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <Text weight="medium" size="body2" color="tertiary" text={'TLE - Line 2'} />
              <Text weight="medium" size="body2" color="primary" text={data['tleSecond']} />
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <SelectBox
                label="Direction"
                list={DUMMY_DIRECTION_LIST}
                value={direction}
                setValue={setDirectionValue}
                onClickListValueCallback={onClickListValueCallback}
                name="linkDirection"
              />
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <Input label="Center frequency (MHz)" value={centerFreqValue} setValue={setCenterFreqValue} name="centerFrequency"/>
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <Input label="Bandwidth (MHz)" value={bandwidthValue} setValue={setBandwidthValue} name="polarization"/>
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <SelectBox
                label="Polarization"
                list={DUMMY_POLARIZE_LIST}
                value={polarizeValue}
                setValue={setPolarizeValue}
                name="polarization"
              />
            </li>
          </ul>
          <div className="flex w-full flex-row items-center justify-between bg-bg-transparent_gray_light p-4">
            <Button text="Delete" onClick={(e) => onDelete(e)} type="secondary" size="large" />
            <Button text="Save" onClick={(e) => onSave(e)} type="primary" size="large" />
          </div>
        </div>
      )}
      {/* View */}
      {!isEdit && data &&  (
        <div className="h-fit w-[560px] rounded-2xl bg-white shadow-primary">
          <div className="flex flex-row items-center justify-between p-4">
            <Text size="body1" weight="semibold" text={data.name} />
            <button type="button" className="flex h-8 w-8 items-center justify-center" onClick={() => setData(null)}>
              <XOutlineIcon className="h-4 w-4" onClick={handleGoBack}/>
            </button>
          </div>
          <ul className="flex max-h-[60vh] flex-col gap-4 overflow-auto px-4 pb-4">
            {registeredModalList.map(({ title, key }) => (
              <SpaceCraftModalListElement key={key} title={title} value={data[key] ?? 'TEST'} />
            ))}
          </ul>
          <div className="flex w-full flex-row items-center justify-between bg-bg-transparent_gray_light p-4">
            <Button text="Delete" onClick={(e) => onDelete(e)} type="secondary" size="large" />
            <Button text="Edit" onClick={(e) => onEdit(e)} type="primary" size="large" />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SpaceCraftModal;
