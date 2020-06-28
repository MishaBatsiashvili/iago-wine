import React, {Component} from "react";
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import LogoUrl from '../../../assets/images/logo.png';
import s from './DesktopNavbar.module.css';
import YellowBtn from "../../common/YellowBtn/YellowBtn";

class DesktopNavbar extends Component {
    render(){
        return (
                <div className={s.desktopNavbar}>
                    <Container>
                        <Row className={'justify-content-center'}>
                            <Col lg={12}>
                                <Row>

                                    <Col md={3}>
                                        <div className={s.LogoWrp}>
                                            <img src={LogoUrl} className={s.Logo} alt="logo"/>
                                        </div>
                                    </Col>

                                    <Col md={7}>
                                        <div className={'d-flex align-items-center'}>
                                            <nav className={s.navItemsOuterWrp}>
                                                <ul className={s.navItemsInnerWrp}>
                                                    <li className={s.navItem}>Home</li>
                                                    <li className={s.navItem}>About Us</li>
                                                    <li className={s.navItem}>Contact</li>
                                                    <li className={s.navItem}>Career</li>
                                                    <li className={s.navItem}>Blog</li>
                                                    <YellowBtn text={'Online Shop'} />
                                                </ul>
                                            </nav>
                                        </div>
                                    </Col>

                                    <Col md={2}>
                                        <div className={`d-flex justify-content-end h-100 ${s.cartWrp}`}>
                                            <div className={`d-flex align-items-center ${s.cartIconWrp}`} onClick={this.props.onCartBtnClicked} >
                                                <div className={'position-relative'}>
                                                    <div className={`d-flex align-items-center justify-content-center ${s.cartAmount}`}>3</div>
                                                    <i className={`fas fa-shopping-cart ${s.cartIcon}`}></i>
                                                </div>
                                                <div className={s.cartPrice}>13.99 GEL</div>
                                            </div>
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
        )
    }
}

export default DesktopNavbar;