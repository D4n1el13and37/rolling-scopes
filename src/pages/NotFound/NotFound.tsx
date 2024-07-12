import React from 'react';
import Button from '../../components/ui-kit/Button';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div>
      <div className="app__error_wrapper">
        <h1 className="app__error_title">Seems we've lost our way</h1>
        <Link to="/">
          <Button className="app__error_button">Return on the way</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
