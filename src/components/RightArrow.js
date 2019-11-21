import React from 'react';
import Styles from './Arrow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

const RightArrow = ({ arrowClick }) => {
  return (
    <div className={Styles.Arrow} style={{ right: 0 }} onClick={arrowClick}>
      <FontAwesomeIcon icon={faArrowCircleRight} color="#111" />
    </div>
  );
};

export default RightArrow;
