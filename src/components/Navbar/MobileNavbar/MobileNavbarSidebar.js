import React, {Component, createRef} from "react";
import {Link} from "react-router-dom";
import {gsap} from "gsap";

import s from "./MobileNavbarSidebar.module.css";
import GreenLogoUrl from "../../../assets/images/logo.png";
import BaseBtn from "../../common/NormalBtns/BaseBtn";
import {HashLink} from "react-router-hash-link";

class MobileNavbarSidebar extends Component {
    sidebarWrpRef = createRef();
    sidebarRef = createRef();

    componentDidMount() {
        const sidebarWrpRef = this.sidebarWrpRef.current;
        const sidebarRef = this.sidebarRef.current;

        gsap.set(sidebarWrpRef, {display: 'none', opacity: '0'});
        gsap.set(sidebarRef, {x: '-100%'});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const sidebarWrpRef = this.sidebarWrpRef.current;
        const sidebarRef = this.sidebarRef.current;
        if (this.props.showSidebar !== prevProps.showSidebar) {
            if (this.props.showSidebar) {
                // show wrapper
                gsap.set(sidebarWrpRef, {display: 'block'});
                gsap.to(sidebarWrpRef, {opacity: '1', duration: 0.3});
                // slide in sidebar
                gsap.to(sidebarRef, {x: 0, duration: 0.3});
            } else {
                // slide in sidebar
                gsap.to(sidebarRef, {
                    x: '-100%', duration: 0.3, onComplete: () => {
                        // show wrapper
                        gsap.to(sidebarWrpRef, {
                            opacity: '0', duration: 0.3, onComplete: () => {
                                gsap.set(sidebarWrpRef, {display: 'none'});
                            }
                        });
                    }
                });
            }
        }
    }

    render() {
        return (
            <div ref={this.sidebarWrpRef} className={s.mobileNavbarSidebarWrp}>
                <div onClick={this.props.onSidebarCloseBtnClicked} className={s.sidebarDarkOverlay}></div>


                <div ref={this.sidebarRef} className={s.mobileNavbarSidebar}>

                    <i className={`fas fa-times ${s.sidebarCloseBtn}`}
                       onClick={this.props.onSidebarCloseBtnClicked}></i>

                    {/*<img src={GreenLogoUrl} className={s.sidebarLogo} alt=""/>*/}

                    <div className={'pt-3'}>

                        <Link
                            to={this.props.linkWithLang('/')}
                            className={s.navItem}
                            onClick={this.props.onSidebarCloseBtnClicked}>
                            {this.props.getStr('nav_home')}
                        </Link>

                        {this.props.pageNames.map(page => {
                            return (
                                <Link
                                    key={page.name}
                                    to={this.props.linkWithLang(`/page/${page.name}`)}
                                    className={s.navItem}
                                    onClick={this.props.onSidebarCloseBtnClicked}>
                                    {page[`title_${this.props.lang}`]}
                                </Link>
                            )
                        })}

                        <HashLink
                            className={s.navItem}
                            smooth
                            to={this.props.linkWithLang('/#winery')}
                            onClick={this.props.onSidebarCloseBtnClicked}>

                            {this.props.getStr('nav_winery')}
                        </HashLink>

                        <HashLink
                            className={s.navItem}
                            smooth
                            to={this.props.linkWithLang('/#export')}
                            onClick={this.props.onSidebarCloseBtnClicked}>

                            {this.props.getStr('nav_export')}
                        </HashLink>

                        <HashLink
                            className={s.navItem}
                            smooth
                            to={this.props.linkWithLang('/#articles')}
                            onClick={this.props.onSidebarCloseBtnClicked}>

                            {this.props.getStr('nav_articles')}
                        </HashLink>

                        <Link
                            to={this.props.linkWithLang('/contact')}
                            className={s.navItem}
                            onClick={this.props.onSidebarCloseBtnClicked}>
                            {this.props.getStr('nav_contact')}
                        </Link>

                        <HashLink
                            smooth
                            onClick={this.props.onSidebarCloseBtnClicked}
                            to={this.props.linkWithLang('/#shop')}
                            className={s.navItem} style={{borderBottom: 'none'}}>
                            <BaseBtn btnType={'Yellow'} text={this.props.getStr('nav_shop')}/>
                        </HashLink>

                        <Link to={this.props.langUrl}>
                            <img className={s.langImg} src={this.props.langImg} alt=""/>
                        </Link>

                    </div>
                </div>
            </div>
        )
    }
}

export default MobileNavbarSidebar;