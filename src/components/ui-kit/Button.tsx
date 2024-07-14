import React from 'react';

export interface ButtonProps {
  className: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ ...props }) => (
  <button type={props.type} onClick={props.onClick} {...props}>
    {props.children}
  </button>
);

export default Button;
