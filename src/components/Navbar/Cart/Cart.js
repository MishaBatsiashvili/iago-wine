import React, {Component, createRef} from "react";
import s from './Cart.module.css';
import DarkYellowFilledBtn from "../../common/DarkYellowFilledBtn/DarkYellowFilledBtn";
import CartTitle from "./CartTitle";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

import {gsap} from 'gsap';

class Cart extends Component {

    outerWrpRef = createRef();
    innerWrpRef = createRef();

    componentDidMount() {
        const outerWrpRef = this.outerWrpRef.current;
        const innerWrpRef = this.innerWrpRef.current;

        gsap.set(outerWrpRef, {display: 'none', opacity: '0'});
        gsap.set(innerWrpRef, {x: '100%'});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const outerWrpRef = this.outerWrpRef.current;
        const innerWrpRef = this.innerWrpRef.current;
        if(this.props.showCart !== prevProps.showCart){
            if(this.props.showCart){
                // show wrapper
                gsap.set(outerWrpRef, {display: 'block'});
                gsap.to(outerWrpRef, {opacity: '1', duration: 0.3});
                // slide in sidebar
                gsap.to(innerWrpRef, {x: 0, duration: 0.3});
            } else {
                // slide in sidebar
                gsap.to(innerWrpRef, {x: '100%', duration: 0.3, onComplete: () => {
                    // show wrapper
                    gsap.to(outerWrpRef, {opacity: '0', duration: 0.3, onComplete: () => {
                            gsap.set(outerWrpRef, {display: 'none'});
                        }});
                }});
            }
        }
    }

    render(){
        return (
            <div ref={this.outerWrpRef} className={s.outerWrp}>

                <div onClick={this.props.onCartCloseBtnClicked} className={s.cartDarkOverlay}></div>

                <div ref={this.innerWrpRef} className={s.innerWrp}>
                    <div className={s.innerScroll}>
                        <CartTitle
                            onCartCloseBtnClicked={this.props.onCartCloseBtnClicked}
                            text={'Your Cart'} />
                        <CartItems />
                        <CartSummary />
                    </div>
                    <DarkYellowFilledBtn btnClasses={s.checkoutBtn} text={'Checkout'} />
                </div>
            </div>
        )
    }
}

export default Cart;