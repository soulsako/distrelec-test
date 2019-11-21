import React, { Component } from 'react';
import Styles from './Slider.module.scss';
import Slide from './Slide';
import slideDate from '../slideData.json';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';

class Slider extends Component {
  state = {
    currentIndex: 0,
    translateValueX: 0,
  };

  goToPrevSlide = () => {
    console.log('====================================');
    console.log('Left Arrow clicked!');
    console.log('====================================');
  };

  goToNextSlide = () => {
    const { currentIndex } = this.state;
    const { numberOfItems } = slideDate;
    if (currentIndex === numberOfItems - 1) {
      return this.setState({
        currentIndex: 0,
        translateValueX: 0,
      });
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValueX: prevState.translateValueX + -(100 / numberOfItems),
    }));
  };

  render() {
    const { translateValueX } = this.state;
    const { carouselData } = slideDate;
    return (
      <div className={Styles.Slider}>
        <h3 className={Styles.Slider__Heading}>Related Products</h3>
        <div className={Styles.Slider__Wrapper}>
          <ul
            className={Styles.Slider__List}
            style={{
              transform: `translateX(${translateValueX}%)`,
            }}
          >
            {carouselData.map((slide, index) => {
              return (
                <li>
                  <Slide key={index} {...slide} />
                </li>
              );
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
