import React from 'react';
import Styles from './Slide.module.scss';

const Slide = ({
  name,
  price: { currency, formattedValue },
  productImageUrl,
  url,
  productImageAltText,
  left,
  transition,
  zIndex,
}) => {
  const formatCurrency = () => {
    if (currency === 'GBP') return '£';
    if (currency === 'EUR') return '€';
    if (currency === 'USD') return '$';
    else return currency;
  };
  return (
    <a
      className={Styles.Slide}
      href={url}
      style={{
        left: `${left}rem`,
        transition: transition ? 'left 400ms cubic-bezier(0.455, 0.03, 0.515, 0.955)' : null,
        zIndex: zIndex ? zIndex : null,
      }}
    >
      <figure className={Styles.Slide__Figure}>
        <img src={productImageUrl} className={Styles.Slide__Image} alt={productImageAltText} />
      </figure>
      <h4 className={Styles.Slide__Name}>{name}</h4>
      <div className={Styles.Slide__Price}>
        <span className={Styles.Slide__Currency}>{formatCurrency()}</span>
        <span className={Styles.Slide__Value}>{formattedValue}</span>
      </div>
      <button className={Styles.Slide__Button}>Buy now</button>
    </a>
  );
};

export default Slide;
