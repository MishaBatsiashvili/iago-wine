import s from "./Cart.module.css";
import React from "react";

const CartTitle = props => {
    return (<div className={`d-flex align-items-center justify-content-between ${s.titleWrp}`}>
        <h5 className={s.title}>{props.text}</h5>
        <i className={`fas fa-times ${s.closeBtn}`}
           onClick={props.onCartCloseBtnClicked}></i>
    </div>)
}

export default CartTitle;