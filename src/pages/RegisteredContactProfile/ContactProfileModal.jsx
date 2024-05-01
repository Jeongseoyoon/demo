import axios from 'axios';
import { XOutlineIcon } from '../../assets/svgs';
import { Button, Input, Modal, SelectBox, Text } from '../../components';
import { contactProfileModalList } from '../../utils';
import { useEffect, useState } from 'react';

const AUTOTRACKINGBAND_LIST = [
  { id: 1, text: 'S-band' },
  { id: 2, text: 'X-band' },
  { id: 3, text: 'BOTH' }
];

const ContactProfileListElement = ({ title, value }) => {
  return (
    <li className="border-primary rounded-lg border px-3 py-2">
      <Text weight="medium" size="body2" color="tertiary" text={title} />
      <Text weight="medium" size="body2" color="primary" text={value} />
    </li>
  );
};

const ContactProfileModal = ({ data, setData }) => {
  const [minContactDurationValue, setMinContactDurationValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [minElevationDegreesValue, setminElevationDegreesValue] = useState('');
  const [autoTrackingFrequencyBandValue, setAutoTrackingFrequencyBandValue] = useState('');
  const [autoTrackingFrequencyBandId, setAutoTrackingFrequencyBandId] = useState('');

  useEffect(() => {
    if (data) {
      setMinContactDurationValue(data.minContactDuration);
      setminElevationDegreesValue(data.minElevationDegrees);        
      setAutoTrackingFrequencyBandValue(data.autoTrackingFrequencyBand);
      setAutoTrackingFrequencyBandId(data.autoTrackingFrequencyBandId[0]);
      console.log('dbwm',data);
    }
  }, [data]);

  const onClickListValueCallback = (e, item) => {
    setAutoTrackingFrequencyBandId(item.id);
  };

  console.log('s333etData', data);
  const onEdit = (e) => {
    setIsEdit(true);
  };

  const onSave = async (e) => {

    const updatedData = {
      name: data.name,
      minContactDuration: minContactDurationValue,
      minElevationDegrees: minElevationDegreesValue,
      autoTrackingFrequencyBand: autoTrackingFrequencyBandId,
    };
    console.log('data',data);
    console.log('dataupdatedData',updatedData);
    const res = await axios.patch(`/api/contactprofile/${data.id}`, updatedData);
    console.log('res',res);
    setIsEdit(false);
  };

  const onDelete = async (e) => {
    // 데이터 삭제 요청 
    try {
      await axios.delete(`/api/contactprofile/${data.id}`);
      window.location.href = '/registered-contact-profile';
    } catch (error) {
      console.error('error:', error);
      // 오류 처리 
    }
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
              <Text weight="medium" size="body2" color="tertiary" text={'Ground Station'} />
              <Text weight="medium" size="body2" color="primary" text={data['city']} />
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <Text weight="medium" size="body2" color="tertiary" text={'Location'} />
              <Text weight="medium" size="body2" color="primary" text={data['location']} />
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <Input label="Minimum viable Contact duration" value={minContactDurationValue} setValue={setMinContactDurationValue} name="minContactDuration" />
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
              <Input label="Minimum elevation in degrees" value={minElevationDegreesValue} setValue={setminElevationDegreesValue} name="minContactDuration" />
            </li>
            <li className="border-primary rounded-lg border px-3 py-2">
            <SelectBox
                label="Auto Tracking Frequency Band"
                list={AUTOTRACKINGBAND_LIST}
                value={autoTrackingFrequencyBandValue}
                setValue={setAutoTrackingFrequencyBandValue}
                name="autoTrackingFrequencyBand"
                onClickListValueCallback={onClickListValueCallback}
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
      {!isEdit && data && (
        <div className="h-fit w-[560px] rounded-2xl bg-white shadow-primary">
          <div className="flex flex-row items-center justify-between p-4">
            <Text size="body1" weight="semibold" text={data.name} />
            <button type="button" className="flex h-8 w-8 items-center justify-center" onClick={() => setData(null)}>
              <XOutlineIcon className="h-4 w-4" />
            </button>
          </div>
          <ul className="flex max-h-[60vh] flex-col gap-4 overflow-auto px-4 pb-4">
            {contactProfileModalList.map(({ title, key }) => (
              <ContactProfileListElement key={key} title={title} value={data[key] ?? '-'} />
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

export default ContactProfileModal;
