import axios from 'axios';
import { XOutlineIcon } from '../../assets/svgs';
import { Button, Input, Modal, SelectBox, Text } from '../../components';
import { useEffect, useState } from 'react';

const STATUS_LIST = [
  { id: 1, text: 'Developing' },
  { id: 2, text: 'Operating' },
  { id: 3, text: 'Maintenance' }
];

const EditGroundStationModal = ({ data, setData }) => {
  const [nameValue, setNameValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [latitudeValue, setLatitudeValue] = useState('');
  const [longitudeValue, setLongitudeValue] = useState('');
  const [altitudeValue, setAltitudeValue] = useState('');
  const [providerValue, setProviderValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [statusValueId, setStatusValueId] = useState('');

  useEffect(() => {
    if (data) {
      setNameValue(data.name);
      setCityValue(data.city);
      setLatitudeValue(data.latitudeDegrees);
      setLongitudeValue(data.longitudeDegrees);
      setAltitudeValue(data.altitudeMeters);
      setProviderValue(data.providerName);
      setStatusValue(data.status);
      setStatusValueId(data.statusValueId);
    }
  }, [data]);

  const onClickListValueCallback = (e, item) => {
    setStatusValueId(item.id);
  };

  const onSave = async (e) => {
    try {
      const updatedData = {
        name: nameValue,
        city: cityValue,
        altitudeMeters: altitudeValue,
        latitudeDegrees: latitudeValue,
        longitudeDegrees: longitudeValue,
        providerName: providerValue,
        status: statusValue
      };
      console.log('업데이트', updatedData);
      const res = await axios.patch(`/api/groundstation/${data.id}`, updatedData);
      console.log('res', res);
      window.location.href = '/manage-ground-station';
    } catch (error) {
      console.error('Error registering ground station:', error);
    }
  };

  return (
    <Modal isOpened={!!data}>
      {data && (
        <div className="h-fit w-[560px] rounded-2xl bg-white shadow-primary">
          <div className="flex flex-row items-center justify-between p-4">
            <Text size="body1" weight="semibold" text={data.name} />
            <button type="button" className="flex h-8 w-8 items-center justify-center" onClick={() => setData(null)}>
              <XOutlineIcon className="h-4 w-4" />
            </button>
          </div>
          <ul className="flex max-h-[60vh] flex-col gap-3 overflow-auto px-4 pb-4">
            <li className="border-primary flex flex-col gap-2 rounded-lg border px-3 py-2">
              <Input label="Name" value={nameValue} setValue={setNameValue} />
            </li>
            <li className="border-primary flex flex-col gap-2 rounded-lg border px-3 py-2">
              <Input label="City" value={cityValue} setValue={setCityValue} />
            </li>
            <li className="border-primary flex flex-col gap-2 rounded-lg border px-3 py-2">
              <Input label="Latitude" value={latitudeValue} setValue={setLatitudeValue} />
            </li>
            <li className="border-primary flex flex-col gap-2 rounded-lg border px-3 py-2">
              <Input label="Longitude" value={longitudeValue} setValue={setLongitudeValue} />
            </li>
            <li className="border-primary flex flex-col gap-2 rounded-lg border px-3 py-2">
              <Input label="Altitude" value={altitudeValue} setValue={setAltitudeValue} />
            </li>
            <li className="border-primary flex flex-col gap-2 rounded-lg border px-3 py-2">
              <Input label="Provider" value={providerValue} setValue={setProviderValue} />
            </li>
            <li className="border-primary flex flex-col gap-2 rounded-lg border px-3 py-2">
              <Input label="Status" value={statusValue} setValue={setStatusValue} />
            </li>
          </ul>
          <div className="flex w-full flex-row items-center justify-end bg-bg-transparent_gray_light p-4">
            <Button text="Save" onClick={(e) => onSave(e)} type="primary" size="large" />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditGroundStationModal;
