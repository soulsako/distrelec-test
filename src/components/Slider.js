import React, { Component } from 'react';
import Styles from './Slider.module.scss';
import Slide from './Slide';
import slideDate from '../slideData.json';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';

class Slider extends Component {
  state = {
    currentSlides: 4,
    translateValueX: 0,
  };

  goToPrevSlide = () => {
    const { currentSlides } = this.state;
    const { numberOfItems } = slideDate;
    if (currentSlides === Number(numberOfItems)) {
      return this.setState({
        currentSlides: 4,
        translateValueX: 0,
      });
    }

    this.setState(prevState => ({
      currentSlides: prevState.currentSlides + 1,
      translateValueX: prevState.translateValueX + -(100 / Number(numberOfItems)),
    }));
  };

  goToNextSlide = () => {
    const { currentSlides } = this.state; // 0
    const { numberOfItems } = slideDate; // 10
    if (currentSlides === Number(numberOfItems)) {
      return this.setState({
        currentSlides: 4,
        translateValueX: 0,
      });
    }

    this.setState(prevState => ({
      currentSlides: prevState.currentSlides + 1,
      translateValueX: prevState.translateValueX + -(100 / Number(numberOfItems)),
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
