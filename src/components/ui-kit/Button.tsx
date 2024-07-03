import { Component } from 'react';

export interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button type={this.props.type} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}