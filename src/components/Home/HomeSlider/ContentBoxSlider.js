import s from "./ContentBoxSlider.module.css";
import React from "react";

const ContentBoxSlider = props => {
    return (
        <div className={s.contentBoxWrp}>
            <div className={s.contentBox}>
                <h1 className={s.title}>Delicious Desserts</h1>
                <p className={s.text}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <div className={`${s.contentBoxBtnWrp}`}>
                <div className={s.contentBoxBtn}>
                    <i className="fas fa-arrow-left"></i>
                </div>
                <div className={s.contentBoxBtn}>
                    <i className="fas fa-arrow-right"></i>
                </div>
            </div>
        </div>
    )
}

export default ContentBoxSlider;