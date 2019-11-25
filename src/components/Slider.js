import React, { Component } from 'react';
import Styles from './Slider.module.scss';
import Slide from './Slide';
import slideData from '../slideData.json';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';

class Slider extends Component {
  constructor(props) {
    super(props);
    const { carouselData, numberOfItems } = slideData;

    this.state = {
      carouselData,
      numberOfItems: Number(numberOfItems),
      loading: true,
    };
  }

  componentDidMount() {
    this.initiateSlider();
  }

  initiateSlider = () => {
    this.sliderInterval = setInterval(() => {
      this.startSlider();
    }, 4000);
  };

  startSlider = () => {
    const { carouselData, numberOfItems } = { ...this.state };
    carouselData.forEach(slide => {
      if (slide.itemPositionOneBased === 0) {
        slide.left = numberOfItems * 26;
        slide.transition = false;
        slide.itemPositionOneBased = numberOfItems - 1;
      } else if (slide.itemPositionOneBased > 0) {
        slide.left = (slide.itemPositionOneBased - 1) * 26;
        slide.itemPositionOneBased = slide.itemPositionOneBased - 1;
        slide.transition = true;
      }
    });

    this.setState({ carouselData, loading: false });
  };

  render() {
    const { carouselData, numberOfItems, loading } = this.state;
    if (!carouselData || loading) return <p>Loading...</p>;
    return (
      <div className={Styles.Slider}>
        <h3 className={Styles.Slider__Heading}>Related Products</h3>
        <div className={Styles.Slider__Wrapper}>
          <ul className={Styles.Slider__List}>
            {carouselData.map((slide, index) => {
              return <Slide key={index} {...slide} />;
            })}
          </ul>
        </div>
        <LeftArrow arrowClick={this.goToPrevSlide} />
        <RightArrow arrowClick={this.goToNextSlide} />
      </div>
    );
  }
}

export default Slider;
