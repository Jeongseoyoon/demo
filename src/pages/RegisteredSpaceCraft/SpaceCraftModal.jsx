import { XOutlineIcon } from '../../assets/svgs';
import { Button, Input, Modal, SelectBox, Text } from '../../components';
import { registeredModalList } from '../../utils';
import { useState } from 'react';

const DUMMY_DIRECTION_LIST = [
  { id: 1, text: 'Uplink' },
  { id: 2, text: 'Downlink' }
];
const DUMMY_POLARIZE_LIST = [
  { id: 1, text: 'RHCP' },
  { id: 2, text: 'LHCP' },
  { id: 3, text: 'BOTH' }
];

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

const SpaceCraftModal = ({ data, setData, onDelete }) => {
  const [modifiedData, setModifiedData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [directionValue, setDirectionValue] = useState('');
  const [directionId, setDirectionId] = useState('');
  const [polarizeValue, setPolarizeValue] = useState([]);
  const [polarizeId, setPolarizeId] = useState('');

  console.log('setData', setData);

  const onClickListValueCallback = (e, item) => {
    setDirectionId(item.id);
    setPolarizeId(item.id);
  };

  const onEdit = (e) => {
    console.log('11111');
    setIsEdit(true);
  };

  return (
    <Modal isOpened={!!data}>
      {/* input */}
      {isEdit && data && (
        <div className="h-fit w-[560px] rounded-2xl bg-white shadow-primary">
          <div className="flex flex-row items-center justify-between p-4">
            <Text size="body1" weight="semibold" text={data.name} />
            <button type="button" className="flex h-8 w-8 items-center justify-center" onClick={() => setData(null)}>
              <XOutlineIcon className="h-4 w-4" />
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
                value={directionValue}
                setValue={setDirectionValue}
                onClickListValueCallback={onClickListValueCallback}
                name="linkDirection"
              />
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <Input label="Center frequency (MHz)" />
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <Input label="Bandwidth (MHz)" />
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
            <Button text="Delete" onClick={onDelete} type="secondary" size="large" />
            <Button text="Edit" onClick={onEdit} type="primary" size="large" />
          </div>
        </div>
      )}
      {/* View */}
      {!isEdit && data && (
        <div className="h-fit w-[560px] rounded-2xl bg-white shadow-primary">
          <div className="flex flex-row items-center justify-between p-4">
            <Text size="body1" weight="semibold" text={data.name} />
            <button type="button" className="flex h-8 w-8 items-center justify-center" onClick={() => setData(null)}>
              <XOutlineIcon className="h-4 w-4" />
            </button>
          </div>
          <ul className="flex max-h-[60vh] flex-col gap-4 overflow-auto px-4 pb-4">
            {registeredModalList.map(({ title, key }) => (
              <SpaceCraftModalListElement key={key} title={title} value={data[key] ?? 'TEST'} />
            ))}
          </ul>
          <div className="flex w-full flex-row items-center justify-between bg-bg-transparent_gray_light p-4">
            <Button text="Delete" onClick={onDelete} type="secondary" size="large" />
            <Button text="Edit" onClick={(e) => onEdit(e)} type="primary" size="large" />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SpaceCraftModal;
