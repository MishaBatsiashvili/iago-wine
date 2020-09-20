import React, {Component, createRef, PureComponent} from "react";
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
import {HashLink} from "react-router-hash-link";
import {componentWillUnmount} from "react-style-tag/es/Style";

class DesktopNavbar extends PureComponent {

    fixedCartRef = createRef();
    desktopMenuWrpRef = createRef();

    scrollHandler = (e) => {

        // debugger;
        const scrollPos = window.scrollY;
        const desktopMenuPost = this.desktopMenuWrpRef.current.scrollTop + 100;

        if(scrollPos > desktopMenuPost){
            this.toggleFixedCart('block');
        } else if(scrollPos <= desktopMenuPost){
            this.toggleFixedCart('none');
        }

    }

    toggleFixedCart = (display) => {
        gsap.set(this.fixedCartRef.current, {
            display: display,
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.scrollHandler);
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
                                        <Link to={this.props.linkWithLang('/')} className={s.LogoWrp}>
                                            <img src={LogoUrl} className={s.Logo} alt="logo"/>
                                        </Link>
                                    </Col>

                                    <Col md={7}>
                                        <div className={'d-flex align-items-center'}>
                                            <nav className={s.navItemsOuterWrp}>
                                                <div className={s.navItemsInnerWrp}>

                                                    <Link to={this.props.linkWithLang('/')} className={s.navItem}>{this.props.getStr('nav_home')}</Link>

                                                    {this.props.pageNames.map(page => {
                                                        return <Link key={page.name} to={this.props.linkWithLang(`/page/${page.name}`)} className={s.navItem}>{page[`title_${this.props.lang}`]}</Link>
                                                    })}

                                                    <Link to={this.props.linkWithLang('/contact')} className={s.navItem}>{this.props.getStr('nav_contact')}</Link>

                                                    <HashLink smooth to={this.props.linkWithLang('/#shop')}>
                                                        <BaseBtn
                                                            btnType={'Yellow'}
                                                            size={'md'}
                                                            text={this.props.getStr('nav_shop')}
                                                        />
                                                    </HashLink>

                                                </div>
                                            </nav>
                                        </div>
                                    </Col>

                                    <Col md={2}>
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