import { Button, Text } from '../../components';

const DeleteSelectedBox = ({ checkedData }) => {
  return (
    <div className="shadow-primary flex flex-row items-center gap-6 rounded-2xl bg-bg-inner p-3">
      <Text className="ml-3" text={`${checkedData.length} Selected`} size="body2" weight="medium" color="primary" />
      <div className="h-4 w-[1px] bg-border-primary" />
      <Button text="Delete Select" type="primary" />
    </div>
  );
};

export default DeleteSelectedBox;
