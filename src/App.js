import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'swiper/css/swiper.min.css';

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

class App extends React.Component {

   componentDidMount() {
      this.props.getCart();
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      console.log(this.props)
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

      if(!this.props.cartData || Object.keys(this.props.cartData).length === 0){
         return <div>Loading...</div>;
      }

      return (
         <>
            <Navbar changeAmnt={this.props.changeAmnt} cartData={this.props.cartData} lang={this.props.lang}/>

            <Switch>
               <Route exact path={'/'} render={(renderProps) =>
                  <Home {...renderProps} addCartItem={this.addCartItem} />
               }/>
               <Route exact path={'/about'} component={About} />
            </Switch>

            <Footer/>
         </>
      );
   }
}

const mapStateToProps = state => ({
   lang: state.app.lang,
   cartData: state.cart.cartData,
});

const mapDispatchToProps = dispatch => ({
   getCart: () => dispatch(getCart()),
   addCartItem: (itemId) => dispatch(addCartItem(itemId)),
   changeAmnt: (id, newAmnt, cartId) => dispatch(changeAmnt(id, newAmnt, cartId)),
   removeCartItem: (id, cartId) => dispatch(removeCartItem(id, cartId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
