import React from 'react';
import Styles from './Arrow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const LeftArrow = ({ arrowClick }) => {
  return (
    <div className={Styles.Arrow} style={{ left: 5 }} onClick={arrowClick}>
      <FontAwesomeIcon icon={faAngleLeft} color="#333" />
    </div>
  );
};

export default LeftArrow;
