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
    const outOfViewSlide = { ...carouselData[index] };
    outOfViewSlide.left = (numberOfItems - 1) * 26;
    outOfViewSlide.transition = false;
    outOfViewSlide.itemPositionOneBased = numberOfItems - 1;
    carouselData[index] = outOfViewSlide;
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
    //Move slide at 0 to position 1 (to the right), then move slide at position 9 to the left (-26)
    carouselData.forEach(slide => {
      if (slide.left === 0) {
        slide.left = 26;
        slide.itemPositionOneBased = slide.itemPositionOneBased + 1;
      } else if (slide.left === (numberOfItems - 1) * 26) {
        slide.transition = false;
        slide.left = -26;
        setTimeout(() => {
          this.prevResetSlideOutOfView(carouselData);
        }, 250);
      } else {
        this.prevSlideInView(slide);
      }
    });
    this.setState({ carouselData });
  };

  prevResetSlideOutOfView = carouselData => {
    const index = carouselData.findIndex(curr => curr.left === -26);
    const outOfViewSlide = { ...carouselData[index] };
    outOfViewSlide.left = 0;
    outOfViewSlide.transition = true;
    outOfViewSlide.itemPositionOneBased = 0;
    carouselData[index] = outOfViewSlide;
    this.setState({ carouselData });
  };

  prevSlideInView = slide => {
    slide.left = slide.left + 26;
    slide.itemPositionOneBased = slide.itemPositionOneBased + 1;
    return slide;
  };

  goToNextSlide = () => this.debounceNext();
  goToPrevSlide = () => this.debouncePrev();

  onClearIntervalHandler = () => clearInterval(this.sliderInterval);
  render() {
    const { carouselData, loading } = this.state;
    if (!carouselData || loading) return <p className={Styles.Loader}>Loading...</p>;
    console.log('====================================');
    console.log('CarouselData', carouselData);
    console.log('====================================');
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
