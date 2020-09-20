import React, {Component} from "react";
import LogoUrl from '../../../assets/images/logo.png';
import s from './MobileNavbar.module.css';
import MobileNavbarSidebar from "./MobileNavbarSidebar";
import {Link} from "react-router-dom";

class DesktopNavbar extends Component {
    render() {
        return (
            <div className={s.mobileNavbar}>

                <MobileNavbarSidebar
                    pageNames={this.props.pageNames}

                    getStr={this.props.getStr}
                    lang={this.props.lang}
                    langUrl={this.props.langUrl}
                    langImg={this.props.langImg}
                    linkWithLang={this.props.linkWithLang}

                    onSidebarCloseBtnClicked={this.props.onSidebarCloseBtnClicked}
                    showSidebar={this.props.showSidebar}/>

                <div className={'position-relative w-100 text-center'}>

                    <Link className={'d-inline-block'} to={this.props.linkWithLang('/')}>
                        <img src={LogoUrl} className={s.logo} alt=""/>
                    </Link>

                    {/*burger icon*/}
                    <div onClick={this.props.onSidebarBtnClicked}
                         className={`d-flex justify-content-start h-100 ${s.burgerWrp}`}>
                        <div className={'d-flex align-items-center'}>
                            <i className={`fas fa-bars ${s.burgerIcon}`}></i>
                        </div>
                    </div>
                    {/*/.*/}

                    {/*cart*/}
                    <div onClick={this.props.onCartBtnClicked}
                         className={`d-flex justify-content-end h-100 ${s.cartWrp}`}>
                        <div className={'d-flex align-items-center'}>
                            <div className={s.cartIconWrp}>
                                <div className={`d-flex align-items-center justify-content-center ${s.cartAmount}`}>
                                    {this.props.itemsAmnt}
                                </div>
                                <i className={`fas fa-shopping-cart ${s.cartIcon}`}></i>
                            </div>
                        </div>
                    </div>
                    {/*/.*/}

                </div>
            </div>
        )
    }
}

export default DesktopNavbar;