import React from "react";
import s from './YellowBtn.module.css';
import {Link} from "react-router-dom";

const YellowBtn = props => {

    return (
        <button
            ref={props.btnRef}
            type={props.type}
            className={`${props.baseClass} ${props.sizeClass} ${s.custom}`}
            onClick={props.onBtnClicked}>
            {props.text}
        </button>
    )
}

export default YellowBtn;