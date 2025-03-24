import React from "react";
import { useField } from "informed";

const CustomInput = ({
  field,
  label,
  type = "text",
  placeholder = "",
  required = false,
  validate,
  ...props
}) => {
  const { fieldApi, fieldState } = useField({ field, validate });

  const handleInputChange = (e) => {
    fieldApi.setValue(e.target.value);
  };

  const handleInputBlur = () => {
    fieldApi.setTouched(true);
  };

  // If the input is of type "date", we limit the maximum selectable date to today's date.
  const additionalProps = type === "date" ? { max: new Date().toISOString().split("T")[0] } : {};

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={field}
        type={type}
        placeholder={placeholder}
        required={required}
        value={fieldState.value || ""}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        {...additionalProps}
        {...props}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      />
      {fieldState.error && (
        <p className="mt-1 text-xs text-red-600">{fieldState.error}</p>
      )}
    </div>
  );
};

export default CustomInput;
