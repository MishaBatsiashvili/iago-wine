import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'swiper/css/swiper.min.css';
import "react-datepicker/dist/react-datepicker.css";

import {
  Switch,
  Route
} from 'react-router-dom';
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import {connect} from "react-redux";
import customAxios from "./api/customAxios";

import {addCartItem, changeAmnt, getCart, removeCartItem} from "./store/reducers/cartReducer";
import Checkout from "./components/Checkout/Checkout";
import DynamicPage from "./components/DynamicPage/DynamicPage";
import {getDynamicPages} from "./store/reducers/dynamicPageReducer";
import {getGeneralInfo, getStrings} from "./store/reducers/appReducer";
import Contact from "./components/Contact/Contact";
import {Style} from "react-style-tag";
import Loader from "./components/common/Loader/Loader";

class App extends React.Component {

   state = {
      showLoader: true,
   }

   componentDidMount() {
      this.props.getCart();
      this.props.getDynamicPages();
      this.props.getStrings();
      this.props.getGeneralInfo();
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if(this.state.showLoader){
         if(this.props.cartData && Object.keys(this.props.cartData).length > 0 && Object.keys(this.props.general).length > 0){
            setTimeout(() => {
               this.setState({showLoader: false});
            }, 600);
         }
      } else {
         if(this.props.lang !== prevProps.lang){
            // debugger;
            this.setState({showLoader: true});
         }
      }

   }

   addCartItem = (id) => {
      this.props.addCartItem(id)
         .then(res => {
            this.props.getCart();
         });
   }

   changeAmnt = () => {
      this.props.changeAmnt();
   }

   render() {

      if(this.state.showLoader){
         return <Loader />;
      }

      const fontStylesJSX = () => {
         if(this.props.lang === 'ge'){
            return (
                <Style>
                   {`
                      body{
                        font-family: 'georgianReg'
                      }
                      h1,h2,h3,h4,h5,h6{
                        font-family: 'georgianBold'
                      }
                  `}
                </Style>
            )
         } else if(this.props.lang === 'en') {
            return (
                <Style>
                   {`
                      body{
                        font-family: 'englishReg'
                      }
                      h1,h2,h3,h4,h5,h6{
                        font-family: 'englishBold'
                      }
                  `}
                </Style>
            )
         }
      }

      return (
         <>

            {fontStylesJSX()}

            <Navbar
               changeAmnt={this.props.changeAmnt}
               cartData={this.props.cartData}
               removeCartItem={this.props.removeCartItem}
               pageNames={this.props.pageNames}
            />

            <div className={'h-100 d-flex flex-column justify-content-between'}>
               <div className={'flex-grow-1'}>
                  <Switch>

                     <Route exact path={'/'} render={(renderProps) =>
                        <Home {...renderProps} addCartItem={this.addCartItem} />
                     }/>

                     <Route exact path={'/checkout'} component={Checkout}/>

                     <Route exact path={'/page/:pageName'} component={DynamicPage} />

                     <Route exact path={'/contact'} component={Contact} />

                  </Switch>
               </div>

               <div>
                  <Footer
                      general={this.props.general}
                  />
               </div>
            </div>
         </>
      );
   }
}

const mapStateToProps = state => ({
   lang: state.app.lang,
   cartData: state.cart.cartData,
   pageNames: state.dynamicPage.pageNames,
   strings: state.app.strings,
   general: state.app.general,
});

const mapDispatchToProps = dispatch => ({
   getCart: () => dispatch(getCart()),
   addCartItem: (itemId) => dispatch(addCartItem(itemId)),
   changeAmnt: (id, newAmnt, cartId) => dispatch(changeAmnt(id, newAmnt, cartId)),
   removeCartItem: (id, cartId) => dispatch(removeCartItem(id, cartId)),
   getDynamicPages: () => dispatch(getDynamicPages()),
   getStrings: () => dispatch(getStrings()),
   getGeneralInfo: () => dispatch(getGeneralInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
