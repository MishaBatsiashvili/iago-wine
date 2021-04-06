import React from "react";
import {Link} from "react-router-dom";
import YellowWhiteBtn from "./YellowWhiteBtn/YellowWhiteBtn";
import YellowBtn from "./YellowBtn/YellowBtn";
import GrayBtn from "./GrayBtn/GrayBtn";
import s from "./BaseBtn.module.css";


const BaseBtn = props => {

    let sizeClass = '';
    switch (props.size) {
        case 'md':
            sizeClass = s.md;
            break;
        case 'lg':
            sizeClass = s.lg;
            break;
    }

    let BtnComp = null;
    switch (props.btnType) {
        case 'YellowWhite':
            BtnComp = YellowWhiteBtn;
            break;
        case 'Yellow':
            BtnComp = YellowBtn;
            break;
        case 'Gray':
            BtnComp = GrayBtn;
            break;
    }

    const btnRender = () => {
        // ${props.baseClass} ${props.sizeClass} ${s.custom}
        return (
            <BtnComp
                btnRef={props.btnRef}
                onBtnClicked={props.onBtnClicked}
                baseClass={`${s.btn} ${props.className}`}
                sizeClass={sizeClass}
                text={props.text}
                type={props.type}
            />
        )
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

export default BaseBtn;