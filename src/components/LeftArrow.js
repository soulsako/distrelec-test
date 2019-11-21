import React from 'react';
import Styles from './Arrow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

const LeftArrow = ({ arrowClick }) => {
  return (
    <div className={Styles.Arrow} style={{ left: 0 }} onClick={arrowClick}>
      <FontAwesomeIcon icon={faArrowCircleLeft} color="#111" />
    </div>
  );
};

export default LeftArrow;
