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
import {changeAmnt, removeCartItem} from "../../store/reducers/cartReducer";
import {getDeliveryMethods} from "../../api/api";

class Checkout extends Component {

   state={
      deliveryMethods: [],
      /*
      id
      name
      price
       */

      chosenDeliveryMethodIndex: 0,
      // should be equal to index of chosen delivery method -> inital value is 0

      paymentMethods: [],
      /*
      id
      name
      */
      deliveryDate: new Date(),
   }

   validationSchema = () => {
      const configObj = {
         firstName: Yup.string()
            .required('Required'),
         lastName: Yup.string()
            .required('Required'),
         street: Yup.string()
            .required('Required'),
         phone: Yup.string()
            .matches(/^(\+?)([\d]+)$/g, 'Incorrent Number Format (e.g. +995123456789)')
            .required('Required'),
         email: Yup.string()
            .email('Invalid email')
            .required('Required'),
         comment: Yup.string()
            .max(150, 'Maximum character count reached'),
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

   componentDidMount() {
      getDeliveryMethods()
         .then(res => {
            if(res.status === 1){
               this.setState({
                  deliveryMethods: res.methods,
               })
            }
         })
   }

   render() {
      return (
         <div className={s.wrp}>
            <TitleBanner imageURL={bannerImg} text={'Checkout'}/>
            <Container>
               <Row>
                  <Col className={`order-lg-2`} xs={12} lg={5} xl={4}>
                     <OrderDetails
                        removeCartItem={this.props.removeCartItem}
                        changeAmnt={this.props.changeAmnt}
                        lang={this.props.lang}
                        cartData={this.props.cartData}
                     />
                  </Col>
                  <Col className={`order-lg-1`} xs={12} lg={7} xl={8}>
                     <Formik
                        initialValues={{
                           firstName: '',
                           lastName: '',
                           street: '',
                           phone: '',
                           email: '',
                           comment: '',
                           deliveryMethod: 1,
                           deliveryTime: '',
                           paymentMethod: 1,
                        }}
                        validationSchema={() => this.validationSchema()}
                        onSubmit={(values, {setSubmitting}) => {
                           if (!this.props.cartData || this.props.cartData.length === 0) {
                              return;
                           }
                           setSubmitting(false);
                        }}
                     >
                        {(fmk) => {
                           return (
                              <CheckoutForm
                                 deliveryMethods={this.state.deliveryMethods}
                                 chosenDeliveryMethodIndex={this.state.chosenDeliveryMethodIndex}
                                 deliveryMethodChanged={this.deliveryMethodChanged}
                                 onDeliveryDateChanged={this.onDeliveryDateChanged}
                                 deliveryDate={this.state.deliveryDate}
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
   lang: state.app.lang,
   cartData: state.cart.cartData,
})

const mapDispatchToProps = dispatch => ({
   removeCartItem: (id, cartId) => dispatch(removeCartItem(id, cartId)),
   changeAmnt: (id, newAmnt, cartId) => dispatch(changeAmnt(id, newAmnt, cartId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);