import React from 'react';
import Styles from './Slide.module.scss';

const Slide = ({
  name,
  price: { currecy, formattedValue },
  productImageUrl,
  url,
  numberOfItems,
  isLast,
  productImageAltText,
}) => {
  return (
    <a className={Styles.Slide} href={url}>
      <img src={productImageUrl} className={Styles.Slide__Image} alt={productImageAltText} />
      <div className={Styles.Slide__Title}>{name}</div>
    </a>
  );
};

export default Slide;
