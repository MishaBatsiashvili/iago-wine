import React from 'react';
import './App.css';
import 'swiper/css/swiper.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { connect } from 'react-redux';
import { addCartItem, changeAmnt, getCart, removeCartItem } from './store/reducers/cartReducer';
import Checkout from './components/Checkout/Checkout';
import DynamicPage from './components/DynamicPage/DynamicPage';
import { getDynamicPages } from './store/reducers/dynamicPageReducer';
import { getGeneralInfo, getStrings } from './store/reducers/appReducer';
import Contact from './components/Contact/Contact';
import PropTypes from 'prop-types';
import InjectLanguageSpecificFontStyles from './components/common/InjectLanguageSpecificFontStyles/InjectLanguageSpecificFontStyles';
import LoaderWrapper from './components/common/Loader/LoaderWrapper';

class App extends React.Component {
  state = {
    /**
    We store prevLanguage in state so that we can then use it outside of componentDidUpdate and
    be able to use it inside this.languageIsChanged method to then use it in
    LoaderWrapper's shouldToggleLoader prop
    */
    prevLanguage: null
  };

  componentDidMount() {
    this.fetchInitialComponentData();
  }

  componentDidUpdate(prevProps) {
    this.syncPrevLanguageWithState(prevProps);
  }

  syncPrevLanguageWithState = (prevProps) => {
    if (prevProps.lang !== this.props.lang) {
      this.setState({ prevLanguage: prevProps.lang });
    }
  };

  isLanguageChanged = () => {
    if (!this.props || !this.state.prevLanguage) {
      return false;
    }

    return this.props.lang !== this.state.prevLanguage;
  };

  isInitialComponentDataLoadedAndValid = () => {
    return (
      this.props.cartData &&
      this.props.pageNames &&
      this.props.strings &&
      Object.keys(this.props.cartData).length > 0 &&
      Object.keys(this.props.general).length > 0
    );
  };

  fetchInitialComponentData = () => {
    this.props.getCart();
    this.props.getDynamicPages();
    this.props.getStrings();
    this.props.getGeneralInfo();
  };

  addCartItem = (id) => {
    this.props.addCartItem(id).then(() => {
      this.props.getCart();
    });
  };

  render() {
    return (
      <LoaderWrapper
        shouldToggleLoader={this.isInitialComponentDataLoadedAndValid() || this.isLanguageChanged()}
      >
        <InjectLanguageSpecificFontStyles />

        <Navbar
          changeAmnt={this.props.changeAmnt}
          cartData={this.props.cartData}
          removeCartItem={this.props.removeCartItem}
          pageNames={this.props.pageNames}
        />

        <div className={'h-100 d-flex flex-column justify-content-between'}>
          <div className={'flex-grow-1'}>
            <Switch>
              <Route
                exact
                path={'/'}
                render={(renderProps) => <Home {...renderProps} addCartItem={this.addCartItem} />}
              />

              <Route exact path={'/index.html'}>
                <Redirect to={'/'} />
              </Route>

              <Route exact path={'/checkout'} component={Checkout} />

              <Route exact path={'/page/:pageName'} component={DynamicPage} />

              <Route exact path={'/contact'} component={Contact} />
            </Switch>
          </div>

          <div>
            <Footer general={this.props.general} />
          </div>
        </div>
      </LoaderWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  lang: state.app.lang,
  cartData: state.cart.cartData,
  pageNames: state.dynamicPage.pageNames,
  strings: state.app.strings,
  general: state.app.general
});

const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(getCart()),
  addCartItem: (itemId) => dispatch(addCartItem(itemId)),
  changeAmnt: (id, newAmnt, cartId) => dispatch(changeAmnt(id, newAmnt, cartId)),
  removeCartItem: (id, cartId) => dispatch(removeCartItem(id, cartId)),
  getDynamicPages: () => dispatch(getDynamicPages()),
  getStrings: () => dispatch(getStrings()),
  getGeneralInfo: () => dispatch(getGeneralInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  getCart: PropTypes.func,
  getDynamicPages: PropTypes.func,
  getStrings: PropTypes.func,
  getGeneralInfo: PropTypes.func,
  addCartItem: PropTypes.func,
  changeAmnt: PropTypes.func,
  removeCartItem: PropTypes.func,
  lang: PropTypes.string,
  cartData: PropTypes.shape({
    id: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object)
  }),
  pageNames: PropTypes.array,
  general: PropTypes.shape({
    status: PropTypes.oneOfType([PropTypes.exact(1), PropTypes.exact(0)]),
    general: PropTypes.object
  }),
  strings: PropTypes.shape({
    status: PropTypes.oneOfType([PropTypes.exact(1), PropTypes.exact(0)]),
    strings: PropTypes.object
  })
};
