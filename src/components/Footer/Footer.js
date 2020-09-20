import React from "react";
import s from './Footer.module.css';
import {Col, Container, Row, Form} from "react-bootstrap";

import logoUrl from '../../assets/images/logo.png';
import withLang from "../../hoc/withLang";
import withStrs from "../../hoc/withStrs";

const Footer = props => {
    return (
        <div className={s.wrp}>
            <Container>
                <Row>
                    <Col xs={12} lg={2} className={s.footerLogoWrp}>
                        <img src={logoUrl} className={s.footerLogo} alt=""/>
                    </Col>

                    <Col xs={12} sm={6} lg={4} className={'pl-lg-5'}>
                        <div className={s.textItemWrp}>

                            <h4>{props.getStr('phone', props.lang)}</h4>

                            <p>{props.general.phone[`text_${props.lang}`]}</p>

                        </div>

                        <div className={s.textItemWrp}>

                            <h4>{props.getStr('address', props.lang)}</h4>

                            <p>{props.general.address[`text_${props.lang}`]}</p>

                        </div>
                    </Col>

                    <Col sm={6} md={4}>
                        <div className={s.textItemWrp}>
                            <h4>{props.getStr('email', props.lang)}</h4>

                            <p>{props.general.email[`text_${props.lang}`]}</p>

                        </div>

                        <div className={s.textItemWrp}>
                            <h4>{props.getStr('social', props.lang)}</h4>
                            <div className={'d-flex mt-3'}>
                                <a href={props.general.facebook[`text_${props.lang}`]} className={s.iconWrp}>
                                    <i className="fab fa-facebook-f"></i>
                                </a>

                                <a href={props.general.instagram[`text_${props.lang}`]} className={s.iconWrp}>
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default withStrs(Footer);