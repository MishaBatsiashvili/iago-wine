import React, {Component, createRef} from 'react';
import s from './ModalWrp.module.css';
import gsap from 'gsap';

class ModalWrp extends Component {
    popupWrpRef = createRef();
    popupBoxRef = createRef();


    componentDidMount(){
        this.initPopup();
        if(this.props.showPopup){
            this.showPopupAnimation();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.showPopup !== this.props.showPopup){
            if(this.props.showPopup){
                this.showPopupAnimation();
            } else {
                this.closePopupAnimation();
            }
        }
    }


    // popup show/hide methods
    // popup SHOW/HIDE animation methods
    initPopup = () => {
        // this.props.onClosePopup();
        //init styles for popup reveal animation
        const popupWrpRef = this.popupWrpRef.current;
        const popupBoxRef = this.popupBoxRef.current;

        gsap.set(popupWrpRef, {display: 'none', opacity: 0});
        gsap.set(popupBoxRef, {opacity: 0, scaleX: 0.8, scaleY: 0.8, x: '-50%', y: '-50%'});
    }

    showPopupAnimation = () => {
        const popupWrpRef = this.popupWrpRef.current;
        const popupBoxRef = this.popupBoxRef.current;

        //animation wrapper
        gsap.set(popupWrpRef, {display: 'block'});
        gsap.to(popupWrpRef, {opacity: 1, duration: 0.2});

        //animation popupbox
        gsap.to(popupBoxRef, {opacity: 1, scaleX: 1, scaleY: 1, duration: 0.2});
    }

    closePopupAnimation = () => {
        const popupWrpRef = this.popupWrpRef.current;
        const popupBoxRef = this.popupBoxRef.current;

        //animation wrapper
        gsap.to(popupWrpRef, {opacity: 0, duration: 0.2, onComplete: () => {
                gsap.set(popupWrpRef, {display: 'none'});
            }
        });

        //animation popupbox
        gsap.to(popupBoxRef, {opacity: 0, scaleX: 0.8, scaleY: 0.8, duration: 0.2});
    }
    ///.

    render() {
        return (
            <div className={s.wrp} ref={this.popupWrpRef}>
                <div className={s.darkBg} onClick={this.props.onClosePopup}></div>
                <div className={s.box} ref={this.popupBoxRef}>

                    <div className={s.closeBtn} onClick={this.props.onClosePopup}>
                        <i className="fas fa-times"></i>
                    </div>

                    {this.props.children}

                </div>
            </div>
        );
    }
}

export default ModalWrp;