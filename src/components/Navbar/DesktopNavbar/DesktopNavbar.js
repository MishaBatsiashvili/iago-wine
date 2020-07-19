import React, {Component} from "react";
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import LogoUrl from '../../../assets/images/logo.png';
import s from './DesktopNavbar.module.css';
import BaseBtn from "../../common/NormalBtns/BaseBtn";

import {Link} from 'react-router-dom';

class DesktopNavbar extends Component {

    calcCartTotalPrice = () => {
        const total = this.props.cartData.products.reduce((accum, cur) => {
            const price = parseFloat(cur.price)*100;
            const amount = parseInt(cur.amount);
            return accum + amount * price;
        }, 0)
        return total/100;
    }

    calcCartItemsAmnt = () => {
        return this.props.cartData.products.reduce((accum, cur) => {
            const amount = parseInt(cur.amount);
            return accum + amount;
        }, 0)
    }

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

                                    <Col md={6}>
                                        <div className={'d-flex align-items-center'}>
                                            <nav className={s.navItemsOuterWrp}>
                                                <ul className={s.navItemsInnerWrp}>
                                                    <li className={s.navItem}>Home</li>
                                                    <li className={s.navItem}>Our Story</li>
                                                    <li className={s.navItem}>Contact</li>
                                                    <BaseBtn btnType={'Yellow'} size={'md'} text={'Online Shop'} />
                                                </ul>
                                            </nav>
                                        </div>
                                    </Col>

                                    <Col md={3}>
                                        <div className={'d-flex align-items-center justify-content-end h-100'}>
                                            <div className={`d-flex justify-content-end h-100 ${s.cartWrp}`}>
                                                <div className={`d-flex align-items-center ${s.cartIconWrp}`} onClick={this.props.onCartBtnClicked} >
                                                    <div className={'position-relative'}>
                                                        <div className={`d-flex align-items-center justify-content-center ${s.cartAmount}`}>{this.calcCartItemsAmnt()}</div>
                                                        <i className={`fas fa-shopping-cart ${s.cartIcon}`}></i>
                                                    </div>
                                                    <div className={s.cartPrice}>{this.calcCartTotalPrice()} GEL</div>
                                                </div>
                                            </div>

                                            <Link to={this.props.langUrl}>
                                                <img className={s.langImg} src={this.props.langImg} alt=""/>
                                            </Link>
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