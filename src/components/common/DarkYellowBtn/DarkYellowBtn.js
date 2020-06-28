import React from "react";
import s from './DarkYellowBtn.module.css';
import {Link} from "react-router-dom";

const DarkYellowBtn = props => {

    const btnRender = () => {
        return <button className={`${s.btn} ${props.btnClasses}`} onClick={props.onBtnClicked}>{props.text}</button>
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

export default DarkYellowBtn;