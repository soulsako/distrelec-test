import React from 'react';
import Styles from './Slide.module.scss';

const Slide = ({
  name,
  price: { currecy, formattedValue },
  productImageUrl,
  url,
  numberOfItems,
  isLast,
}) => {
  return (
    <div className={Styles.Slide} style={{ marginRight: isLast ? '0rem' : '1rem' }}>
      <img src={productImageUrl} className={Styles.Slide__Image} alt={name} />
      <div className={Styles.Slide__Title}>{name}</div>
    </div>
  );
};

export default Slide;
