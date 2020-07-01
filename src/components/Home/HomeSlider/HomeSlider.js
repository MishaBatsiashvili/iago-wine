import React, {createRef} from 'react';
import Swiper from 'swiper';
import s from './HomeSlider.module.css';

import {Container} from "react-bootstrap";
import ContentBoxSlider from './ContentBoxSlider';

class HomeSlider extends React.Component {
    swiperRef = createRef();
    state={
        slides: [
            {
                id: 1,
                imgLink: 'http://assets.suelo.pl/soup/img/photos/slider-pasta.jpg',
                slideTitle: 'This is title #1',
                slideText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                slideBoundType: 0, // 0 - product bound; 1 - category bound
                slideBoundId: 0, // id of either product if slideBoundType is 0 or category if slideBoundType is 1
            },
            {
                id: 2,
                imgLink: 'http://assets.suelo.pl/soup/img/photos/slider-dessert.jpg',
                slideTitle: 'This is title #2',
                slideText: '###2 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                slideBoundType: 0, // 0 - product bound; 1 - category bound
                slideBoundId: 0, // id of either product if slideBoundType is 0 or category if slideBoundType is 1
            },
            {
                id: 3,
                imgLink: 'http://assets.suelo.pl/soup/img/photos/slider-dessert.jpg',
                slideTitle: 'This is title #3',
                slideText: '###3 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                slideBoundType: 0, // 0 - product bound; 1 - category bound
                slideBoundId: 0, // id of either product if slideBoundType is 0 or category if slideBoundType is 1
            },
        ],
        currentSlideIndex: 0,
    }

    // lifecycle methods
    componentDidMount() {
        this.swiperInstance = new Swiper(this.swiperRef.current, {
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            // },
        });
        const swiperInstance = this.swiperInstance;

        swiperInstance.slideTo(this.state.currentSlideIndex);
        swiperInstance.on('slideChange', () => {
            this.setCurrentSlide(swiperInstance.activeIndex);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.currentSlideIndex !== prevState.currentSlideIndex){
            const swiperInstance = this.swiperInstance;
            swiperInstance.slideTo(this.state.currentSlideIndex);
        }
    }

    // /.

    setCurrentSlide = (newSlideIndex) => {
        this.setState({
            currentSlideIndex:  newSlideIndex,
        });
    }

    render() {
        const slidesJSX = () => {
            return this.state.slides.map(slide => {
                return (
                    <div className={`swiper-slide ${s.swiperSlide}`}
                         key={slide.id}
                         style={{backgroundImage: `url(${slide.imgLink})`}} />
                )
            })
        }

        return(
            <div className={s.sliderWrp}>
                <div className={`w-100 h-100 ${s.bgGray}`}>
                    <Container className={'h-100'}>
                        <div className={'d-flex h-100 align-items-center'}>
                            <div ref={this.swiperRef} className={`swiper-container ${s.swiperContainer}`}>
                                <div className="swiper-wrapper">
                                    {slidesJSX()}
                                </div>
                            </div>

                            <ContentBoxSlider
                                currentSlideIndex={this.state.currentSlideIndex}
                                setCurrentSlide={this.setCurrentSlide}
                                slides={this.state.slides} />
                        </div>

                    </Container>
                </div>
            </div>
        )
    }
}

export default HomeSlider;