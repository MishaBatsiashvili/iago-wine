import React, {Component, createRef, PureComponent} from "react";
import gsap from 'gsap';
import {
    Container,
    Row,
    Col, Dropdown
} from 'react-bootstrap';
import LogoUrl from '../../../assets/images/logo.png';
import s from './DesktopNavbar.module.css';
import BaseBtn from "../../common/NormalBtns/BaseBtn";

import {Link} from 'react-router-dom';
import {HashLink} from "react-router-hash-link";
import {componentWillUnmount} from "react-style-tag/es/Style";
import {bounceAnimation} from "../../../helpers/helpers";

class DesktopNavbar extends PureComponent {

    fixedCartRef = createRef();
    desktopMenuWrpRef = createRef();
    cartIconRef = createRef();

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.itemsAmnt !== prevProps.itemsAmnt){
            bounceAnimation(this.fixedCartRef.current);
            bounceAnimation(this.cartIconRef.current);
        }
    }

    render(){
        const customDropdownToggle = React.forwardRef(({ children, onClick }, ref) => (
            <div
                className={'cursor-pointer'}
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
                {children}

                <span className={s.dropdownArrow}>&#x25bc;</span>
            </div>
        ));

        return (
            <div ref={this.desktopMenuWrpRef} className={s.desktopWrp}>
                <div className={s.desktopNavbar}>
                    <Container>
                        <Row className={'justify-content-center'}>
                            <Col lg={12}>
                                <Row>

                                    <Col md={2}>
                                        <Link to={this.props.linkWithLang('/')} className={s.LogoWrp}>
                                            <img src={LogoUrl} className={s.Logo} alt="logo"/>
                                        </Link>
                                    </Col>

                                    <Col md={8}>
                                        <div className={'d-flex align-items-center'}>
                                            <nav className={s.navItemsOuterWrp}>
                                                <div className={s.navItemsInnerWrp}>

                                                    <Link to={this.props.linkWithLang('/')} className={s.navItem}>{this.props.getStr('nav_home')}</Link>

                                                    {this.props.pageNames.map(page => {
                                                        return <Link key={page.name} to={this.props.linkWithLang(`/page/${page.name}`)} className={s.navItem}>{page[`title_${this.props.lang}`]}</Link>
                                                    })}

                                                    <HashLink className={s.navItem} smooth to={this.props.linkWithLang('/#winery')}>
                                                        {this.props.getStr('nav_winery')}
                                                    </HashLink>


                                                    <Dropdown className={s.navItem}>
                                                        <Dropdown.Toggle as={customDropdownToggle} variant="success" id="dropdown-basic">
                                                            <div className={`${s.navItem} m-0 d-inline-block`}>{this.props.getStr('nav_more')}</div>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>

                                                            <HashLink className={`${s.navItem} dropdown-item`} smooth to={this.props.linkWithLang('/#export')}>
                                                                {this.props.getStr('nav_export')}
                                                            </HashLink>

                                                            <HashLink className={`${s.navItem} dropdown-item`} smooth to={this.props.linkWithLang('/#articles')}>
                                                                {this.props.getStr('nav_articles')}
                                                            </HashLink>

                                                        </Dropdown.Menu>
                                                    </Dropdown>

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
                                                    <div ref={this.cartIconRef} className={'position-relative'}>
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