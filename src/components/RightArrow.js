import React from 'react';
import Styles from './Arrow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const RightArrow = ({ arrowClick }) => {
  return (
    <div className={Styles.Arrow} style={{ right: 5 }} onClick={arrowClick}>
      <FontAwesomeIcon icon={faAngleRight} color="#333" />
    </div>
  );
};

export default RightArrow;
