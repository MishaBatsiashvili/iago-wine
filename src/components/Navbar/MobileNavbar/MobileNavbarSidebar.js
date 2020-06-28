import React, {Component, createRef} from "react";
import {Link} from "react-router-dom";
import YellowBtn from "../../common/YellowBtn/YellowBtn";
import { gsap } from "gsap";

import s from "./MobileNavbarSidebar.module.css";
import GreenLogoUrl from "../../../assets/images/logo.png";

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
        if(this.props.showSidebar !== prevProps.showSidebar){
            if(this.props.showSidebar){
                // show wrapper
                gsap.set(sidebarWrpRef, {display: 'block'});
                gsap.to(sidebarWrpRef, {opacity: '1', duration: 0.3});
                // slide in sidebar
                gsap.to(sidebarRef, {x: 0, duration: 0.3});
            } else {
                // slide in sidebar
                gsap.to(sidebarRef, {x: '-100%', duration: 0.3, onComplete: () => {
                    // show wrapper
                    gsap.to(sidebarWrpRef, {opacity: '0', duration: 0.3, onComplete: () => {
                        gsap.set(sidebarWrpRef, {display: 'none'});
                    }});
                }});
            }
        }
    }

    render(){
        return (
            <div ref={this.sidebarWrpRef} className={s.mobileNavbarSidebarWrp}>
                <div onClick={this.props.onSidebarCloseBtnClicked} className={s.sidebarDarkOverlay}></div>


                <div ref={this.sidebarRef} className={s.mobileNavbarSidebar}>

                    <i className={`fas fa-times ${s.sidebarCloseBtn}`}
                        onClick={this.props.onSidebarCloseBtnClicked}></i>

                    <img src={GreenLogoUrl} className={s.sidebarLogo} alt=""/>

                    <div>
                        <Link to={'/home'} className={s.navItem}>Home</Link>
                        <Link to={'/about'} className={s.navItem}>About Us</Link>
                        <Link to={'/contact'} className={s.navItem}>Contact</Link>
                        <Link to={'/career'} className={s.navItem}>Career</Link>
                        <Link to={'/blog'} className={s.navItem}>Blog</Link>
                        <Link to={'/menu'} className={s.navItem} style={{borderBottom: 'none'}}>
                            <YellowBtn text={'Order Online'} />
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default MobileNavbarSidebar;