import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import CheckoutForm from './CheckoutForm';
import * as Yup from 'yup';
import { Col, Container, Row } from 'react-bootstrap';
import TitleBanner from '../common/TitleBanner/TitleBanner';
import bannerImg from '../../assets/images/marani.jpg';
import s from './Checkout.module.css';
import OrderDetails from './OrderDetails';
import { connect } from 'react-redux';
import {
  changeAmnt,
  checkout,
  removeCartItem,
  resetCheckoutFormData,
  saveCheckoutFormData,
  sendVerifCode
} from '../../store/reducers/cartReducer';
import { getDeliveryMethods, getPaymentMethods } from '../../api/api';
import PhoneValidator from './PhoneValidator';
import CheckoutSuccess from './CheckoutSuccess';
import { compose } from 'redux';
import withLang from '../../hoc/withLang';
import withStrs from '../../hoc/withStrs';
import Loader from '../common/Loader/Loader';

/**
 * This component handles checkout, general checkout process:
 *
 * step 1: Submit form and recieve verification code as message
 *
 * step 2: Send verification code and form fields together to verify identity and complete checkout
 */
class Checkout extends Component {
  state = {
    deliveryMethods: [],
    chosenDeliveryMethodIndex: 0,
    paymentMethods: [],
    deliveryDate: new Date(),
    showPhoneValidator: false,
    serverError: '',
    showCheckoutSuccess: false,
    invoiceId: null,
    invoiceKey: null,
    formData: {},
    showLoader: true
  };

  componentDidMount() {
    this.fetchAndSetInitialComponentData();
  }

  componentDidUpdate() {
    this.hideLoaderWhenInitialComponentDataIsLoaded();
  }

  componentWillUnmount() {
    this.props.resetCheckoutFormData();
  }

  hideLoaderWhenInitialComponentDataIsLoaded = () => {
    const isRequiredDataLoaded =
      this.state.deliveryMethods.length > 0 && this.state.paymentMethods.length > 0;

    if (this.state.showLoader && isRequiredDataLoaded) {
      setTimeout(() => {
        this.setState({
          showLoader: false
        });
      }, 300);
    }
  };

  generateFormValidationSchema = () => {
    const configObj = {
      firstName: Yup.string().required(this.props.getStr('required_error')),
      lastName: Yup.string().required(this.props.getStr('required_error')),
      address: Yup.string().required(this.props.getStr('required_error')),
      phone: Yup.string()
        // This regex expression matches a phone number, e.g: +1 551345384
        .matches(/^(\+?)([\d]+)$/g, this.props.getStr('number_error'))
        .required(this.props.getStr('required_error')),
      email: Yup.string().email('Invalid email').required(this.props.getStr('required_error')),
      comment: Yup.string().max(150, this.props.getStr('maximum_char_count_error'))
    };

    const yupObj = Yup.object().shape(configObj);

    return yupObj;
  };

  onDeliveryMethodChanged = (index) => {
    this.setState({
      chosenDeliveryMethodIndex: index
    });
  };

  onDeliveryDateChanged = (val) => {
    this.setState({
      deliveryDate: val
    });
  };

  generateDeliveryMethodsForSelect = () => {
    return this.state.deliveryMethods.map((el) => ({
      ...el,
      name_en: `${el.name_en} - ${el.price} GEL`,
      name_ge: `${el.name_ge} - ${el.price} GEL`
    }));
  };

  setShowPhoneValidatorModal = (isVisible) => {
    this.setState({
      showPhoneValidator: isVisible
    });
  };

  setShowSuccessModal = (isVisible) => {
    this.setState({
      showCheckoutSuccess: isVisible
    });
  };

  resetServerFormError = () => {
    this.setState({
      serverError: ''
    });
  };

  setServerFormError = (text = '') => {
    this.setState({
      serverError: text
    });
  };

  showCheckoutSuccessModal = (res) => {
    this.setState({
      showCheckoutSuccess: true,
      invoiceId: res.invoice_id,
      invoiceKey: res.invoice_key
    });
  };

  /**
   * Send verification code with form fields to verify and complete checkout
   */
  handleFinalCheckoutSubmit = (numberVerifCode) => {
    const isCheckoutSuccessful = (res) => res.status === 1;

    const submitFormDataWithNumberVerifCode = () => {
      this.resetServerFormError();
      this.props.checkout(this.props.checkoutFormData, numberVerifCode).then((res) => {
        this.setShowPhoneValidatorModal(false);
        if (isCheckoutSuccessful(res)) {
          this.showCheckoutSuccessModal(res);
        } else {
          this.setServerFormError('Error occured, try again later');
        }
      });
    };

    submitFormDataWithNumberVerifCode();
  };

  handleRecieveNumberVerifCode = (values, { setSubmitting }) => {
    this.setState({
      serverError: ''
    });

    const isInvalidValidCart = !this.props.cartData || this.props.cartData.products.length === 0;

    if (isInvalidValidCart) {
      this.setState({
        serverError: 'Cart is Empty'
      });

      return;
    }

    this.setShowPhoneValidatorModal(true);
    this.props.saveCheckoutFormData(this.generateSubmitFormData(values));
    this.props.sendVerifCode(values.phone, this.props.cartData.id);

    setSubmitting(false);
  };

  generateSubmitFormData = (values) => {
    const date = this.state.deliveryDate;

    return {
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      phone: values.phone,
      email: values.email,
      comment: values.comment,
      deliveryMethod: values.deliveryMethod,
      paymentMethod: values.paymentMethod,
      cartId: this.props.cartData.id,
      deliveryDate: date.toISOString().slice(0, 10)
    };
  };

  fetchAndSetInitialComponentData = () => {
    Promise.all([getDeliveryMethods(), getPaymentMethods()]).then((res) => {
      if (res[0].status === 1 && res[1].status === 1) {
        this.setState({
          deliveryMethods: res[0].methods,
          paymentMethods: res[1].methods
        });
      }
    });
  };

  generateCheckoutSuccessComponentProps = () => ({
    showCheckoutSuccess: this.state.showCheckoutSuccess,
    onClosePopup: () => this.setShowSuccessModal(false),
    invoiceId: this.state.invoiceId,
    invoiceKey: this.state.invoiceKey,
    email: this.props.checkoutFormData ? this.props.checkoutFormData.email : '',
    getStr: this.props.getStr
  });

  generatePhoneValidatorComponentProps = () => ({
    onSubmitHandler: this.handleFinalCheckoutSubmit,
    onClosePopup: () => this.setShowPhoneValidatorModal(false),
    showPhoneValidator: this.state.showPhoneValidator,
    getStr: this.props.getStr
  });

  generateOrderDetailsComponentProps = () => ({
    removeCartItem: this.props.removeCartItem,
    changeAmnt: this.props.changeAmnt,
    lang: this.props.lang,
    getStr: this.props.getStr,
    cartData: this.props.cartData,
    chosenDeliveryMethod: this.state.deliveryMethods[this.state.chosenDeliveryMethodIndex]
  });

  generateCheckoutFormComponentProps = (formikProps) => ({
    paymentMethods: this.state.paymentMethods,
    deliveryMethods: this.generateDeliveryMethodsForSelect(),
    chosenDeliveryMethodIndex: this.state.chosenDeliveryMethodIndex,
    deliveryMethodChanged: this.onDeliveryMethodChanged,
    onDeliveryDateChanged: this.onDeliveryDateChanged,
    deliveryDate: this.state.deliveryDate,
    serverError: this.state.serverError,
    lang: this.props.lang,
    getStr: this.props.getStr,
    ...formikProps
  });

  render() {
    if (this.state.showLoader) {
      return <Loader />;
    }

    const initialFormValues = {
      firstName: 'mish',
      lastName: 'bats',
      address: '123',
      phone: '551384184',
      email: 'mishabatsiashvili@yahoo.com',
      comment: '',
      deliveryMethod: 1,
      paymentMethod: 2
    };

    return (
      <div className={s.wrp}>
        <TitleBanner imageURL={bannerImg} text={this.props.getStr('checkout')} />

        <CheckoutSuccess {...this.generateCheckoutSuccessComponentProps()} />

        <PhoneValidator {...this.generatePhoneValidatorComponentProps()} />

        <Container>
          <Row>
            <Col className={`order-lg-2`} xs={12} lg={5} xl={4}>
              <OrderDetails {...this.generateOrderDetailsComponentProps()} />
            </Col>

            <Col className={`order-lg-1`} xs={12} lg={7} xl={8}>
              <Formik
                initialValues={initialFormValues}
                validationSchema={() => this.generateFormValidationSchema()}
                onSubmit={this.handleRecieveNumberVerifCode}
              >
                {(formikProps) => {
                  return <CheckoutForm {...this.generateCheckoutFormComponentProps(formikProps)} />;
                }}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartData: state.cart.cartData,
  checkoutFormData: state.cart.checkoutFormData
});

const mapDispatchToProps = (dispatch) => ({
  removeCartItem: (id, cartId) => dispatch(removeCartItem(id, cartId)),
  changeAmnt: (id, newAmnt, cartId) => dispatch(changeAmnt(id, newAmnt, cartId)),
  saveCheckoutFormData: (formData) => dispatch(saveCheckoutFormData(formData)),
  resetCheckoutFormData: () => dispatch(resetCheckoutFormData()),
  sendVerifCode: (phone, cartId) => dispatch(sendVerifCode(phone, cartId)),
  checkout: (formData, verifCode) => dispatch(checkout(formData, verifCode))
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withLang, withStrs)(Checkout);

Checkout.propTypes = {
  getCart: PropTypes.func,
  removeCartItem: PropTypes.func,
  changeAmnt: PropTypes.func,
  saveCheckoutFormData: PropTypes.func,
  resetCheckoutFormData: PropTypes.func,
  sendVerifCode: PropTypes.func,
  checkout: PropTypes.func,
  getStr: PropTypes.func,
  cartData: PropTypes.shape({
    id: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object)
  }),
  checkoutFormData: PropTypes.object,
  lang: PropTypes.string
};
