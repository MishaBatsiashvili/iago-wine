import React, {Component} from "react";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import Cart from "./Cart/Cart";

class Navbar extends Component {

    state={
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

    render(){
        return (
            <>
                <DesktopNavbar onCartBtnClicked={this.onCartBtnClicked} />
                <MobileNavbar
                    showSidebar={this.state.showSidebar}
                    onSidebarCloseBtnClicked={this.onSidebarCloseBtnClicked}
                    onSidebarBtnClicked={this.onSidebarBtnClicked}
                    onCartBtnClicked={this.onCartBtnClicked} />
                <Cart
                    showCart={this.state.showCart}
                    onCartCloseBtnClicked={this.onCartCloseBtnClicked} />
            </>
        )
    }
}

export default Navbar;