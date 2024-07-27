import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ ...props }) => (
  <button type={props.type} onClick={props.onClick} {...props}>
    {props.children}
  </button>
);

export default Button;
