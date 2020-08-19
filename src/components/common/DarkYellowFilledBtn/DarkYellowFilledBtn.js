import React from "react";
import s from './DarkYellowFilledBtn.module.css';
import {Link} from "react-router-dom";

const DarkYellowFilledBtn = props => {

    const btnRender = () => {
        return <button className={`${s.btn} ${props.btnClasses}`} onClick={props.callback}>{props.text}</button>
    }
    const btnLinkRender = () => {
        if(props.linkPath){
            return <Link to={props.linkPath}>{btnRender()}</Link>
        } else {
            return btnRender();
        }
    }

    return (
       btnLinkRender()
    )
}

export default DarkYellowFilledBtn;