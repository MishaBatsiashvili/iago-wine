import s from "./ContentBoxSlider.module.css";
import React, {Component, createRef} from "react";

import Swiper from 'swiper';
import BtnPriceSide from "../../common/BtnPriceSide/BtnPriceSide";

class ContentBoxSlider extends Component {

    swiperRef = createRef();
    prevSlideBtnRef = createRef();
    nextSlideBtnRef = createRef();

    componentDidMount() {
        this.swiperInstance = new Swiper(this.swiperRef.current, {});
        const swiperInstance = this.swiperInstance;
        console.log(swiperInstance);
        const setCurrentSlide = this.props.setCurrentSlide;

        //init slideTo using slideIndex in state
        swiperInstance.slideTo(this.props.currentSlideIndex);
        // set event handler for slide change
        swiperInstance.on('slideChange', () => {
            setCurrentSlide(swiperInstance.activeIndex);
        });

        // set buttons for slide changes
        const slideBtnClickHandler = (compVal, trueVal, altVal) => {
            const currentSlideIndex = this.props.currentSlideIndex;
            if(currentSlideIndex !== compVal){
                setCurrentSlide(trueVal);
            } else {
                setCurrentSlide(altVal);
            }
        }

        this.prevSlideBtnRef.current.addEventListener('click', () => {
            slideBtnClickHandler(0, this.props.currentSlideIndex - 1, this.props.slides.length - 1);
        });

        this.nextSlideBtnRef.current.addEventListener('click', () => {
            slideBtnClickHandler(this.props.slides.length - 1, this.props.currentSlideIndex + 1, 0);
        })

    }

    componentDidUpdate(prevProps) {
        if(this.props.currentSlideIndex !== prevProps.currentSlideIndex){
            const swiperInstance = this.swiperInstance;
            swiperInstance.slideTo(this.props.currentSlideIndex);
        }
    }

    render(){
        const slidesJSX = () => {
            return this.props.slides.map(slide => {
                return (
                    <div className={`swiper-slide ${s.swiperSlide}`} key={slide.id} >
                        <h2 className={s.title}>{slide[`title_${this.props.lang}`]}</h2>
                        <p className={s.text}>{slide[`text_${this.props.lang}`]}</p>
                    </div>
                )
            })
        }

        return (
            <div className={s.contentBoxWrp}>

                <div className={s.contentBox}>
                    <div ref={this.swiperRef} className={`swiper-container ${s.swiperContainer}`}>
                        <div className="swiper-wrapper">
                            {slidesJSX()}
                        </div>
                    </div>
                </div>

                <div className={`${s.contentBoxBtnWrp}`}>
                    <div ref={this.prevSlideBtnRef} className={s.contentBoxBtn}>
                        <i className="fas fa-arrow-left"></i>
                    </div>
                    <div ref={this.nextSlideBtnRef} className={s.contentBoxBtn}>
                        <i className="fas fa-arrow-right"></i>
                    </div>
                </div>

            </div>
        )
    }
}

export default ContentBoxSlider;