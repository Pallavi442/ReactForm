import React from "react";
import '../Style.css';

const InputComponent = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  validationMessage, 
  required 
}) => {
  return (

    <div>
      <label>
        {label} {required && <span>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
     {validationMessage && (
        <small>{String(validationMessage)}</small>
      )}
    </div>
  );
};

export default InputComponent;