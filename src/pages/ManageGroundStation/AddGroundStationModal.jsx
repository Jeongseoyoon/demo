import axios from 'axios';
import { XOutlineIcon } from '../../assets/svgs';
import { Button, Input, Modal, Text } from '../../components';
import { useState } from 'react';

const AddGroundStationModal = ({ data, setData, onDelete }) => {
  const [nameValue, setNameValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [latitudeValue, setLatitudeValue] = useState('');
  const [longitudeValue, setLongitudeValue] = useState('');
  const [altitudeValue, setAltitudeValue] = useState('');
  const [providerValue, setProviderValue] = useState('');
  const [statusValue, setStatusValue] = useState('');

  const groundStationRegister = async () => {
    try {
      const res = await axios.post('/api/groundstation/register', {
        name: nameValue,
        city: cityValue,
        altitudeMeters: altitudeValue,
        latitudeDegrees: latitudeValue,
        longitudeDegrees: longitudeValue,
        providerName: providerValue,
        status: statusValue
      });
      console.log('res', res);
    } catch (error) {
      console.error('Error registering ground station:', error);
    }
  };

  return (
    <Modal isOpened={!!data}>
      {data && (
        <div className="h-fit w-[560px] rounded-2xl bg-white shadow-primary">
          <div className="flex flex-row items-center justify-between p-4">
            <Text size="body1" weight="semibold" text="Ground station registration" />
            <button type="button" className="flex h-8 w-8 items-center justify-center" onClick={() => setData(null)}>
              <XOutlineIcon className="h-4 w-4" />
            </button>
          </div>
          <ul className="flex max-h-[60vh] flex-col gap-6 px-4 pb-4">
            <li className="border-primary flex flex-col gap-2 rounded-lg border px-3 py-2">
              <Input label="Name" value={nameValue} setValue={setNameValue} />
              <Input label="City" value={cityValue} setValue={setCityValue} />
              <Input label="Latitude" value={latitudeValue} setValue={setLatitudeValue} />
              <Input label="Longitude" value={longitudeValue} setValue={setLongitudeValue} />
              <Input label="Altitude" value={altitudeValue} setValue={setAltitudeValue} />
              <Input label="Provider" value={providerValue} setValue={setProviderValue} />
              <Input label="Status" value={statusValue} setValue={setStatusValue} />
            </li>
          </ul>
          <div className="flex w-full flex-row items-center justify-between bg-bg-transparent_gray_light p-4">
            <Button text="Delete" onClick={onDelete} type="secondary" size="large" />
            <Button text="Save" onClick={groundStationRegister} type="primary" size="large" />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddGroundStationModal;
