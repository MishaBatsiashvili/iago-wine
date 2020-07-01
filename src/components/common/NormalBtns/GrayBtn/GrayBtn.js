import React from "react";
import s from './GrayBtn.module.css';
import {Link} from "react-router-dom";

const GrayBtn = props => {

    return (
        <button
            className={`${props.baseClass} ${props.sizeClass} ${s.custom}`}
            onClick={props.onBtnClicked}>
            {props.text}
        </button>
    )
}

export default GrayBtn;