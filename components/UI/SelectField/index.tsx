import React from "react";

import styles from "./SelectField.module.scss";

// Define the types for the SelectField component props
interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  name: string;
  id?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: Option[];
  required?: boolean;
  labelClassName?: string; // className for the label
  selectClassName?: string; // className for the select field
  disabled?: boolean;
  error?: string | null;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  id,
  value,
  onChange,
  options,
  required = false,
  labelClassName = "",
  selectClassName = "",
  disabled = false,
  error = null,
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id || name}
          className={`block text-gray-700 font-bold mb-2 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className={styles.selectWrapper}>
        <select
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          className={`select-test border rounded w-full py-2 px-3 ${selectClassName} ${
            styles.test
          } ${error ? "border-red-500" : ""}`}
          required={required}
          disabled={disabled}
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              disabled={option.value === ""}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default SelectField;
