import React, { Component } from 'react';
import Styles from './Slider.module.scss';
import Slide from './Slide';
import slideData from '../slideData.json';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import _ from 'lodash';

class Slider extends Component {
  constructor(props) {
    super(props);
    const { carouselData, numberOfItems } = slideData;

    this.state = {
      carouselData,
      numberOfItems: Number(numberOfItems),
      loading: true,
    };

    this.debounceNext = _.debounce(this.startSlider, 250);
    this.debouncePrev = _.debounce(this.prevSlideHandler, 250);
  }

  componentDidMount() {
    this.initiateSlider();
  }

  componentWillUnmount() {
    clearInterval(this.sliderInterval);
  }

  // Slider slides every 4 seconds
  initiateSlider = () => {
    this.sliderInterval = setInterval(() => {
      this.startSlider();
    }, 4000);
  };
  /*==================NEXT SLIDE ================*/
  startSlider = () => {
    const { carouselData, numberOfItems } = { ...this.state };

    carouselData.forEach(slide => {
      // Slide is out of view
      if (slide.itemPositionOneBased === 0) {
        slide.left = -26; // 26 refers to slide width
        setTimeout(() => {
          this.resetSlideOutOfView(numberOfItems, carouselData);
        }, 250);
      } else if (slide.itemPositionOneBased > 0) {
        this.slideInView(slide, numberOfItems);
      }
    });

    this.setState({ carouselData, loading: false });
  };

  resetSlideOutOfView = (numberOfItems, carouselData) => {
    const index = carouselData.findIndex(curr => curr.left === -26);
    const zeroSlide = { ...carouselData[index] };
    zeroSlide.left = numberOfItems * 26;
    zeroSlide.transition = false;
    zeroSlide.itemPositionOneBased = numberOfItems - 1;
    carouselData[index] = zeroSlide;
    this.setState({ carouselData });
  };

  slideInView = slide => {
    slide.left = (slide.itemPositionOneBased - 1) * 26;
    slide.itemPositionOneBased = slide.itemPositionOneBased - 1;
    slide.transition = true;
    return slide;
  };

  /*=================PREVIOUS SLIDE================*/
  prevSlideHandler = () => {
    const { carouselData, numberOfItems } = { ...this.state };
    carouselData.forEach(slide => {
      // Slide is out of view
      if (slide.itemPositionOneBased === numberOfItems) {
        slide.transition = false;
        slide.left = -26;

        setTimeout(() => {
          this.prevResetSlideOutOfView(slide, numberOfItems);
        }, 250);
      } else if (slide.itemPositionOneBased < numberOfItems) {
        this.prevSlideInView(slide);
      }
    });

    this.setState({ carouselData, loading: false });
  };

  prevResetSlideOutOfView = slide => {
    slide.left = 0;
    slide.transition = true;
    slide.itemPositionOneBased = 1;
    return slide;
  };

  prevSlideInView = slide => {
    slide.left = (slide.itemPositionOneBased - 1) * 26;
    slide.itemPositionOneBased = slide.itemPositionOneBased + 1;
    return slide;
  };

  goToNextSlide = () => this.debounceNext();
  goToPrevSlide = () => this.debouncePrev();

  onClearIntervalHandler = () => clearInterval(this.sliderInterval);
  render() {
    const { carouselData, loading } = this.state;
    if (!carouselData || loading) return <p className={Styles.Loader}>Loading...</p>;

    return (
      <div
        className={Styles.Slider}
        onMouseEnter={this.onClearIntervalHandler}
        onMouseLeave={this.initiateSlider}
      >
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
