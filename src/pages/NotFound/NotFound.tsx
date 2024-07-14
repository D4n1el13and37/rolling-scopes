import React from 'react';
import Button from '../../components/ui-kit/Button';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="app__error_wrapper">
        <h1 className="app__error_title">Seems we've lost our way</h1>
        <Button onClick={() => navigate('/')} className="app__error_button">
          Return on the way
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
