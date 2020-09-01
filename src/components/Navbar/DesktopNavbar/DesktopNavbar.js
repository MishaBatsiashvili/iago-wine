import React, {Component, createRef} from "react";
import gsap from 'gsap';
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

    fixedCartRef = createRef();
    desktopMenuWrpRef = createRef();

    componentDidMount() {
        const toggleFixedCart = (display) => {
            gsap.set(this.fixedCartRef.current, {
                display: display,
            });
        }
        window.addEventListener('scroll', (e) => {
            const scrollPos = window.scrollY;
            const desktopMenuPost = this.desktopMenuWrpRef.current.scrollTop + 100;

            if(scrollPos > desktopMenuPost){
                toggleFixedCart('block');
            } else if(scrollPos <= desktopMenuPost){
                toggleFixedCart('none');
            }

        })
    }

    render(){
        return (
            <div ref={this.desktopMenuWrpRef} className={s.desktopWrp}>
                <div className={s.desktopNavbar}>
                    <Container>
                        <Row className={'justify-content-center'}>
                            <Col lg={12}>
                                <Row>

                                    <Col md={3}>
                                        <Link to={'/'} className={s.LogoWrp}>
                                            <img src={LogoUrl} className={s.Logo} alt="logo"/>
                                        </Link>
                                    </Col>

                                    <Col md={6}>
                                        <div className={'d-flex align-items-center'}>
                                            <nav className={s.navItemsOuterWrp}>
                                                <div className={s.navItemsInnerWrp}>
                                                    <Link to={'/'} className={s.navItem}>Home</Link>
                                                    {this.props.pageNames.map(page => {
                                                        return <Link key={page.name} to={`/page/${page.name}`} className={s.navItem}>{page.title_en}</Link>
                                                    })}
                                                    <Link to={'/contact'} className={s.navItem}>Contact</Link>
                                                    <BaseBtn btnType={'Yellow'} size={'md'} text={'Online Shop'} />
                                                </div>
                                            </nav>
                                        </div>
                                    </Col>

                                    <Col md={3}>
                                        <div className={'d-flex align-items-center justify-content-end h-100'}>
                                            <div className={`d-flex justify-content-end h-100 ${s.cartWrp}`}>
                                                <div className={`d-flex align-items-center ${s.cartIconWrp}`} onClick={this.props.onCartBtnClicked} >
                                                    <div className={'position-relative'}>
                                                        <div className={`d-flex align-items-center justify-content-center ${s.cartAmount}`}>{this.props.itemsAmnt}</div>
                                                        <i className={`fas fa-shopping-cart ${s.cartIcon}`}></i>
                                                    </div>
                                                    <div className={s.cartPrice}>{this.props.totalPrice} GEL</div>
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

                <div ref={this.fixedCartRef} onClick={this.props.onCartBtnClicked} className={s.cartFixedWrp}>
                    <div className={`${s.cartFixedInnerWrp}`}>
                        <div
                            className={`d-flex align-items-center justify-content-center ${s.cartAmount}`}>{this.props.itemsAmnt}</div>
                        <i className={`fas fa-shopping-cart ${s.cartIcon}`}></i>
                    </div>
                </div>

            </div>
        )
    }
}

export default DesktopNavbar;