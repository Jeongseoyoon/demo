const Label = ({ label, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="mb-1 block text-body2 font-medium text-text-secondary">
      {label}
    </label>
  );
};

export default Label;
