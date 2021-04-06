import React, {useRef} from "react";
import BaseBtn from "../NormalBtns/BaseBtn";
import s from './BtnPriceSide.module.css';
import gsap from 'gsap';
import {Col, Row} from "react-bootstrap";

const BtnPriceSide = props => {

    const btnRef = useRef(null);
    const btnClickHandlder = () => {
        props.onBtnClicked();
        gsap.fromTo(btnRef.current, {scaleX: 1, scaleY: 1}, {scaleX: 1.3, scaleY: 1.3, duration: .1, onComplete: () => {
            gsap.to(btnRef.current, {scaleX: 1, scaleY: 1, duration: .1});
        }})
    }

    const renderBaseBtn = (className) => (
        <BaseBtn
            btnRef={btnRef}
            onBtnClicked={btnClickHandlder}
            className={className}
            btnType={props.btnType ? props.btnType : 'YellowWhite'}
            size={'md'}
            text={props.text} />
    )

    const renderPrice = () => (
        <div className={'pr-3'}>
            <div className={`${s.side} d-flex align-items-center h-100`}>
                <span>{props.price} GEL</span>
            </div>
        </div>
    )

    const renderFullBtn = () => {
        if(props.full){
            return <Row>
                <Col className={'pr-0'}>
                    {renderBaseBtn('w-100')}
                </Col>
                {renderPrice()}
            </Row>
        } else {
            return <div className={`d-flex ${props.centered ? 'justify-content-center' : ''}`}>
                {renderBaseBtn()}
                {renderPrice()}
            </div>
        }
    }

    return renderFullBtn()
}

export default BtnPriceSide;