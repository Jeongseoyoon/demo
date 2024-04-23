import Text from '../Text';

const DescriptionBar = ({ title, description }) => {
  return (
    <div className="border-b border-border-dimmed p-6">
      <h2 className="mb-1 text-heading3 font-semibold">{title}</h2>
      <Text weight="regular" color="description" text={description} />
    </div>
  );
};

export default DescriptionBar;
