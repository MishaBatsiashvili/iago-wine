import React from "react";
import s from './YellowWhiteBtn.module.css';
import baseS from '../BaseBtn.module.css';
import {Link} from "react-router-dom";

const YellowWhiteBtn = props => {
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

export default YellowWhiteBtn;