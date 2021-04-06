import React, {Component} from 'react';
import {Formik} from "formik";
import CheckoutForm from "./CheckoutForm";
import * as Yup from 'yup';
import {Col, Container, Row} from "react-bootstrap";
import TitleBanner from "../common/TitleBanner/TitleBanner";
import bannerImg from "../../assets/images/marani.jpg";
import s from './Checkout.module.css'
import OrderDetails from "./OrderDetails";
import {connect} from "react-redux";
import {
   changeAmnt,
   checkout,
   removeCartItem, resetCheckoutFormData,
   saveCheckoutFormData,
   sendVerifCode
} from "../../store/reducers/cartReducer";
import {getDeliveryMethods, getPaymentMethods, sendFormToCheckout} from "../../api/api";
import PhoneValidator from "./PhoneValidator";
import CheckoutSuccess from "./CheckoutSuccess";
import {compose} from "redux";
import withLang from "../../hoc/withLang";
import withStrs from "../../hoc/withStrs";
import Loader from "../common/Loader/Loader";
import moment from 'moment';

class Checkout extends Component {

   state={
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

      showLoader: true,
   }



   validationSchema = () => {
      const configObj = {
         firstName: Yup.string()
            .required(this.props.getStr('required_error')),
         lastName: Yup.string()
            .required(this.props.getStr('required_error')),
         address: Yup.string()
            .required(this.props.getStr('required_error')),
         phone: Yup.string()
            .matches(/^(\+?)([\d]+)$/g, this.props.getStr('number_error'))
            .required(this.props.getStr('required_error')),
         email: Yup.string()
            .email('Invalid email')
            .required(this.props.getStr('required_error')),
         comment: Yup.string()
            .max(150, this.props.getStr('maximum_char_count_error')),
      }


      const yupObj = Yup.object().shape(configObj);

      return yupObj;
   }

   deliveryMethodChanged = (index) => {
      this.setState({
         chosenDeliveryMethodIndex: index,
      })
   }

   onDeliveryDateChanged = (val) => {
      this.setState({
         deliveryDate: val
      })
   }

   generateDeliveryMethodsForSelect = () => {
      return this.state.deliveryMethods.map(el => ({
         ...el,
         name_en: `${el.name_en} - ${el.price} GEL`,
         name_ge: `${el.name_ge} - ${el.price} GEL`,
      }))
   }

   setShowPhoneValidator = (isVisible) => {
      this.setState({
         showPhoneValidator: isVisible,
      })
   }

   setShowSuccessPopup = (isVisible) => {
      this.setState({
         showCheckoutSuccess: isVisible,
      })
   }

   onSubmitHandler = (verifCode) => {
      // reset server error
      this.setState({
         serverError: '',
      });
      // debugger;
      this.props.checkout(this.props.checkoutFormData, verifCode)
          .then(res => {
             this.setShowPhoneValidator(false);
             if(res.status === 1){
                // show checkout success modal
               this.setState({
                  showCheckoutSuccess: true,
                  invoiceId: res.invoice_id,
                  invoiceKey: res.invoice_key,
               });
             } else {
                // show error on top of form
                this.setState({
                   serverError: 'Error occured, try again later',
                });
             }
          });
   }

   generateSubmitFormData = (values) => {

       const date = this.state.deliveryDate;
   // debugger;
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

         // deliveryDate: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
         deliveryDate: date.toISOString().slice(0, 10),
      }
   }


   componentDidMount() {
      Promise.all([getDeliveryMethods(), getPaymentMethods()])
         .then(res => {
            if(res[0].status === 1 && res[1].status === 1){
               this.setState({
                  deliveryMethods: res[0].methods,
                  paymentMethods: res[1].methods
               });
            }
         })
   }

   componentWillUnmount() {
      this.props.resetCheckoutFormData();
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if(this.state.showLoader){
         if(this.state.deliveryMethods.length > 0 && this.state.paymentMethods.length > 0){
            setTimeout(() => {
               this.setState({
                  showLoader: false,
               })
            }, 300);
         }
      }
   }

   render() {

      if(this.state.showLoader){
         return <Loader />
      }

      return (
         <div className={s.wrp}>
            <TitleBanner imageURL={bannerImg} text={this.props.getStr('checkout')}/>

            <CheckoutSuccess
                showCheckoutSuccess={this.state.showCheckoutSuccess}
                onClosePopup={() => this.setShowSuccessPopup(false)}
                invoiceId={this.state.invoiceId}
                invoiceKey={this.state.invoiceKey}
                email={this.props.checkoutFormData ? this.props.checkoutFormData.email : ''}
                getStr={this.props.getStr}
            />

            <PhoneValidator
                onSubmitHandler={this.onSubmitHandler}
                onClosePopup={() => this.setShowPhoneValidator(false)}
                showPhoneValidator={this.state.showPhoneValidator}
                getStr={this.props.getStr}
            />

            <Container>
               <Row>
                  <Col className={`order-lg-2`} xs={12} lg={5} xl={4}>
                     <OrderDetails
                        removeCartItem={this.props.removeCartItem}
                        changeAmnt={this.props.changeAmnt}
                        lang={this.props.lang}
                        getStr={this.props.getStr}
                        cartData={this.props.cartData}
                        chosenDeliveryMethod={this.state.deliveryMethods[this.state.chosenDeliveryMethodIndex]}
                     />
                  </Col>
                  <Col className={`order-lg-1`} xs={12} lg={7} xl={8}>
                     <Formik
                        initialValues={{
                           firstName: 'mish',
                           lastName: 'bats',
                           address: '123',
                           phone: '551384184',
                           email: 'mishabatsiashvili@yahoo.com',
                           comment: '',
                           deliveryMethod: 1,
                           paymentMethod: 2,
                        }}
                        validationSchema={() => this.validationSchema()}
                        onSubmit={(values, {setSubmitting}) => {

                           this.setState({
                              serverError: '',
                           });

                           if (!this.props.cartData || this.props.cartData.products.length === 0) {
                              this.setState({
                                 serverError: 'Cart is Empty',
                              });
                              return;
                           }

                           // show mobile verification number
                           this.setShowPhoneValidator(true);

                           // save checkout form data in redux
                           this.props.saveCheckoutFormData(this.generateSubmitFormData(values));

                           // send mobile verification code
                           this.props.sendVerifCode(values.phone, this.props.cartData.id);


                           setSubmitting(false);
                        }}
                     >
                        {(fmk) => {
                           return (
                              <CheckoutForm
                                 paymentMethods={this.state.paymentMethods}
                                 deliveryMethods={this.generateDeliveryMethodsForSelect()}
                                 chosenDeliveryMethodIndex={this.state.chosenDeliveryMethodIndex}
                                 deliveryMethodChanged={this.deliveryMethodChanged}
                                 onDeliveryDateChanged={this.onDeliveryDateChanged}
                                 deliveryDate={this.state.deliveryDate}
                                 serverError={this.state.serverError}

                                 lang={this.props.lang}
                                 getStr={this.props.getStr}
                                 {...fmk}
                              />
                           )
                        }
                        }
                     </Formik>
                  </Col>
               </Row>
            </Container>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   cartData: state.cart.cartData,
   checkoutFormData: state.cart.checkoutFormData,
})

const mapDispatchToProps = dispatch => ({
   removeCartItem: (id, cartId) => dispatch(removeCartItem(id, cartId)),
   changeAmnt: (id, newAmnt, cartId) => dispatch(changeAmnt(id, newAmnt, cartId)),
   saveCheckoutFormData: (formData) => dispatch(saveCheckoutFormData(formData)),
   resetCheckoutFormData: () => dispatch(resetCheckoutFormData()),
   sendVerifCode: (phone, cartId) => dispatch(sendVerifCode(phone, cartId)),
   checkout: (formData, verifCode) => dispatch(checkout(formData, verifCode))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLang,
    withStrs,
    )(Checkout);