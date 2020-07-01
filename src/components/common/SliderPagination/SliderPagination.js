import React from "react";
import s from './SliderPagination.module.css';

const SliderPagination = props => {

    return (
        <div className={`${s.wrp} ${props.posAbs ? s.abs : ''}`}>
            {
                props.slides.map((el, i) => {
                    return <div
                        key={i}
                        onClick={props.onPaginationClicked
                            ? (event) => props.onPaginationClicked(i)
                            : null
                        }
                        className={`
                            ${s.pagItem}
                            ${props.light ? s.light : ''}
                            ${props.activeIndex === i ? s.active : ''}
                            ${props.onPaginationClicked ? s.pointer : ''}`} />
                })
            }
        </div>
    )
}

export default SliderPagination;