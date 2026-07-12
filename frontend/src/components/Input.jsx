function Input({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      className="modern-input"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;