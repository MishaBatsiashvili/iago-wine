import React, {Component} from "react";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import Cart from "./Cart/Cart";
import {withRouter} from "react-router-dom";
import usaFlag from "../../assets/images/flag.png";
import geoFlag from "../../assets/images/georgia.png";
import {compose} from "redux";
import withLang from "../../hoc/withLang";
import withStrs from "../../hoc/withStrs";

class Navbar extends Component {

    state = {
        showSidebar: false,
        showCart: false,
    }

    onSidebarBtnClicked = () => {
        this.setState({
            showSidebar: true,
        });
    }

    onSidebarCloseBtnClicked = () => {
        this.setState({
            showSidebar: false,
        });
    }

    onCartBtnClicked = () => {
        this.setState({
            showCart: true,
        });
    }

    onCartCloseBtnClicked = () => {
        this.setState({
            showCart: false,
        });
    }

    calcCartTotalPrice = () => {
        const total = this.props.cartData.products.reduce((accum, cur) => {
            const price = parseFloat(cur.price) * 100;
            const amount = parseInt(cur.amount);
            return accum + amount * price;
        }, 0)
        return total / 100;
    }

    calcCartItemsAmnt = () => {
        return this.props.cartData.products.reduce((accum, cur) => {
            const amount = parseInt(cur.amount);
            return accum + amount;
        }, 0)
    }

    render() {

        //parsing lang(language) query param
        const searchParams = new URLSearchParams(this.props.location.search);
        searchParams.set('lang', this.props.lang === 'ge' ? 'en' : 'ge');
        const langUrl = `${this.props.location.pathname}?${searchParams.toString()}`;
        const langImg = this.props.lang === 'ge' ? usaFlag : geoFlag;
        ///.

        return (
            <>
                <DesktopNavbar
                    pageNames={this.props.pageNames}
                    totalPrice={this.calcCartTotalPrice()}
                    itemsAmnt={this.calcCartItemsAmnt()}
                    cartData={this.props.cartData}
                    lang={this.props.lang}
                    langUrl={langUrl}
                    langImg={langImg}
                    onCartBtnClicked={this.onCartBtnClicked}/>

                <MobileNavbar
                    pageNames={this.props.pageNames}
                    totalPrice={this.calcCartTotalPrice()}
                    itemsAmnt={this.calcCartItemsAmnt()}
                    cartData={this.props.cartData}
                    lang={this.props.lang}
                    langUrl={langUrl}
                    langImg={langImg}
                    showSidebar={this.state.showSidebar}
                    onSidebarCloseBtnClicked={this.onSidebarCloseBtnClicked}
                    onSidebarBtnClicked={this.onSidebarBtnClicked}
                    onCartBtnClicked={this.onCartBtnClicked}/>

                <Cart
                    removeCartItem={this.props.removeCartItem}
                    changeAmnt={this.props.changeAmnt}
                    lang={this.props.lang}
                    getStr={this.props.getStr}
                    cartData={this.props.cartData}
                    showCart={this.state.showCart}
                    onCartCloseBtnClicked={this.onCartCloseBtnClicked}/>
            </>
        )
    }
}

export default compose(withRouter, withLang, withStrs)(Navbar);