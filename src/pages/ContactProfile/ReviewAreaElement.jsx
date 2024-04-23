const ReviewAreaElement = ({ name, value }) => {
  return (
    <div className="flex h-[120px] w-full flex-col items-center justify-center rounded-lg border border-border-primary">
      <h3 className="mb-1 text-heading3 font-semibold text-text-primary">{value || '-'}</h3>
      <span className="text-header font-regular text-text-tertiary">{name}</span>
    </div>
  );
};

export default ReviewAreaElement;
