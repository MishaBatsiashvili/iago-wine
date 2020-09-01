import React from "react";
import s from './TwoColLayout.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import BaseBtn from "../../common/NormalBtns/BaseBtn";
import List from "./List";

const TwoColLayout = props => {

    return (
        <Container className={props.marginTop ? s.marginTop : s.marginTopMobile}>
            <Row>
                <Col lg={6} className={`${props.reverseMode ? `${s.reverse} ${s.rightImgCol}` : s.leftImgCol} ${s.marginBottom}`}>
                    <div className={s.imgWrp}>
                        <img src={props.imgLink} className={s.img} alt=""/>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className={s.textWrp}>
                        <h1 className={s.title}>{props.title}</h1>
                        <p className={s.text}>{props.text}</p>
                        {props.btnText
                            ? <BaseBtn
                                linkPath={props.btnLink}
                                text={props.btnText}
                                btnType={'Yellow'}
                                size={'md'}
                            />
                            : null
                        }

                        {props.listArr ? <List listArr={props.listArr} /> : null}

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default TwoColLayout;