import React from 'react';
import s from './OutOfStockBtn.module.css';

const OutOfStockBtn = (props) => {
    return (
        <div className={s.btn}>
            {props.text}
        </div>
    );
};

export default OutOfStockBtn;