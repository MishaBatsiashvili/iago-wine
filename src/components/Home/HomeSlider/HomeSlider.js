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
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
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

    // set buttons for slide changes
    slideBtnClickHandler = (compVal, trueVal, altVal) => {
        const currentSlideIndex = this.state.currentSlideIndex;
        if(currentSlideIndex !== compVal){
            this.setCurrentSlide(trueVal);
        } else {
            this.setCurrentSlide(altVal);
        }
    }



    render() {

        const slidesJSX = () => {
            return this.state.slides.map(slide => {

                const prevSlideFunc = () => {
                    this.slideBtnClickHandler(0, this.state.currentSlideIndex - 1, this.state.slides.length - 1);
                }
                const nextSlideFunc = () => {
                    this.slideBtnClickHandler(this.state.slides.length - 1, this.state.currentSlideIndex + 1, 0);
                }

                const renderContentBox = () => {
                    let contentBoxText = (
                        <div className={s.contentBox}>
                            <h2 className={s.title}>{slide[`title_${this.props.lang}`]}</h2>
                            <p className={s.text}>{slide[`text_${this.props.lang}`]}</p>
                        </div>
                    );

                    if(!slide[`title_${this.props.lang}`] && !slide[`text_${this.props.lang}`]){
                        contentBoxText = null;
                    }

                    return (
                        <div className={s.contentBoxWrp}>
                            {contentBoxText}
                            <div className={`${s.contentBoxBtnWrp}`}>
                                <div onClick={prevSlideFunc} className={s.contentBoxBtn} >
                                    <i className="fas fa-arrow-left"></i>
                                </div>
                                <div onClick={nextSlideFunc} className={s.contentBoxBtn} >
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </div>

                        </div>
                    )
                }

                return (
                    <div className={`swiper-slide ${s.swiperSlide}`}
                         key={slide.id}
                         style={{backgroundImage: `url(${imagePathGenerator(slide.image, 'slides')})`}}
                    >
                        {renderContentBox()}
                    </div>
                )
            })
        }

        return(
            <div className={s.sliderWrp}>
                <div ref={this.swiperRef} className={`swiper-container ${s.swiperContainer}`}>
                    <div className={`swiper-wrapper ${s.swiperWrp}`}>
                        {slidesJSX()}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeSlider;