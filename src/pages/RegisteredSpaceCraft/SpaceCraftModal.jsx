import axios from 'axios';
import { XOutlineIcon } from '../../assets/svgs';
import { Button, Modal, Text } from '../../components';
import { registeredModalList } from '../../utils';
import { useEffect } from 'react';

const SpaceCraftModalListElement = ({ title, value }) => {
  return (
    <li className="border-primary rounded-lg border px-3 py-2">
      <Text weight="medium" size="body2" color="tertiary" text={title} />
      <Text weight="medium" size="body2" color="primary" text={value} />
    </li>
  );
};

const SpaceCraftModal = ({ data, setData, onDelete, onEdit }) => {
  useEffect(() => {
    if (data) {
      getDetailSpaceCraft();
    }
  }, [data]);

  const getDetailSpaceCraft = async () => {
    console.log(data);
    const res = await axios.get(`/api/spacecraft/${data.id}`);
    const spaceCraftData = res.data;
    console.log('dd', spaceCraftData);
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
          <ul className="flex max-h-[60vh] flex-col gap-4 px-4 pb-4">
            {registeredModalList.map(({ title, key }) => (
              <SpaceCraftModalListElement key={key} title={title} value={data[key] ?? 'TEST'} />
            ))}
          </ul>
          <div className="flex w-full flex-row items-center justify-between bg-bg-transparent_gray_light p-4">
            <Button text="Delete" onClick={onDelete} type="secondary" size="large" />
            <Button text="Edit" onClick={onEdit} type="primary" size="large" />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SpaceCraftModal;
