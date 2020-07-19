import React from "react";
import BaseBtn from "../NormalBtns/BaseBtn";
import s from './BtnPriceSide.module.css';
import {Col, Row} from "react-bootstrap";

const BtnPriceSide = props => {

    const renderBaseBtn = (className) => (
        <BaseBtn
            onBtnClicked={props.onBtnClicked}
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