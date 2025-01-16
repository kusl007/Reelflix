import React from "react";

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="select !hidden md:!block">
      <select name="format" defaultValue="0" id="format" onChange={func}>
        <option value="0" disabled>
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.toLowerCase().split("_").join(" ")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
