import React, {createRef} from 'react';
import Swiper from 'swiper';
import s from './HomeSlider.module.css';

import {Container} from "react-bootstrap";
import ContentBoxSlider from './ContentBoxSlider';
import {imagePathGenerator} from "../../../api/api";
import HomeProducts from "../HomeProducts/HomeProducts";

class HomeSlider extends React.Component {
    swiperRef = createRef();

    constructor(props){
        super(props);

        this.state={
            slides: props.slides,
            currentSlideIndex: 0,
        }
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
                         style={{backgroundImage: `url(${imagePathGenerator(slide.image, 'slides')})`}} />
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
                                slides={this.state.slides}
                                lang={this.props.lang}
                                getStr={this.props.getStr}
                            />
                        </div>

                    </Container>
                </div>
            </div>
        )
    }
}

export default HomeSlider;