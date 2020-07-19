import React from "react";
import s from './Footer.module.css';
import {Col, Container, Row, Form} from "react-bootstrap";

import logoUrl from '../../assets/images/logo.png';

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
                            <h4>Phone</h4>
                            <p>+123456789</p>
                        </div>

                        <div className={s.textItemWrp}>
                            <h4>Address</h4>
                            <p>Address placeholder #1</p>
                        </div>
                    </Col>

                    <Col sm={6} md={4}>
                        <div className={s.textItemWrp}>
                            <h4>E-Mail</h4>
                            <p>example@example.com</p>
                        </div>

                        <div className={s.textItemWrp}>
                            <h4>Social</h4>
                            <div className={'d-flex mt-3'}>
                                <div className={s.iconWrp}>
                                    <i className="fab fa-facebook-f"></i>
                                </div>

                                <div className={s.iconWrp}>
                                    <i className="fab fa-instagram"></i>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer;