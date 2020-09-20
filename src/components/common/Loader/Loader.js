import React from 'react';
import s from './Loader.module.css';

const Loader = () => {
    return (
        <div className={s.loader}>
            <div>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div className={`${s.wineglass} ${s.left}`}>
                    <div className={s.top}></div>
                </div>
                <div className={`${s.wineglass} ${s.right}`}>
                    <div className={s.top}></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;