import React from 'react';

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ ...props }) => (
  <button className={props.className} type={props.type} onClick={props.onClick}>
    {props.children}
  </button>
);

export default Button;
