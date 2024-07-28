import React from 'react';

import './CheckBox.css';

interface ChecboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<ChecboxProps> = ({ onChange, ...rest }) => {
  return (
    <div className="checkbox_container">
      <label className="checkbox_wrapper">
        <input onChange={onChange} type="checkbox" {...rest} />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default CheckBox;
