import React from "react";
import s from './YellowBtn.module.css';
import {Link} from "react-router-dom";

const YellowBtn = props => {

    const btnRender = () => {
        return <button className={s.btn} onClick={props.onBtnClicked}>{props.text}</button>
    }
    const btnLinkRender = () => {
        if(props.linkPath){
            return <Link to={props.linkPath}>{btnRender()}</Link>
        } else {
            return btnRender();
        }
    }

    return (
        btnRender()
    )
}

export default YellowBtn;