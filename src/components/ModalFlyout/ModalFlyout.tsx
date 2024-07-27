import React, { useRef } from 'react';
import Button from '../ui-kit/Button';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { removeAllPlanets } from '../../store/slices/planetsSliice';

import './ModalFlyout.css';
import { convertToCSV } from '../../utils/convertToCSV';

const ModalFlyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { choosenPlanets } = useAppSelector((state) => state.planets);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const handleClickUnselectAll = () => {
    dispatch(removeAllPlanets());
  };

  const downloadCSV = () => {
    const csvData = new Blob([convertToCSV(choosenPlanets)], {
      type: 'text/csv',
    });
    const csvURL = URL.createObjectURL(csvData);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = csvURL;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(csvURL);
    }
  };

  return (
    <div className="modal">
      <span>{choosenPlanets.length} items selected</span>
      <div>
        <a
          ref={downloadLinkRef}
          style={{ display: 'none' }}
          download="planets.csv"
        ></a>
        <Button onClick={downloadCSV}>Download</Button>
        <Button onClick={handleClickUnselectAll}>Unselect all</Button>
      </div>
    </div>
  );
};

export default ModalFlyout;
