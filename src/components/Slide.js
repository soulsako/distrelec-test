import React from 'react';
import Styles from './Slide.module.scss';

const Slide = ({
  name,
  price: { currency, formattedValue },
  productImageUrl,
  url,
  productImageAltText,
}) => {
  const formatCurrency = () => {
    if (currency === 'GBP') return '£';
    if (currency === 'EUR') return '€';
    if (currency === 'USD') return '$';
    else return currency;
  };
  return (
    <a className={Styles.Slide} href={url} style={{ borderRight: '1px solid #f7f7f7' }}>
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
