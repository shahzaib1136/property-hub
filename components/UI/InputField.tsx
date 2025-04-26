import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  error?: string; // Optional error message to show
  htmlFor?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  id,
  placeholder,
  required = false,
  type = "text",
  className = "",
  labelClassName = "",
  error,
  ...rest
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id || name}
          className={`block text-gray-700 font-bold mb-2 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
        className={`border rounded w-full py-2 px-3 ${className} ${
          error ? "border-red-500" : ""
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default InputField;
