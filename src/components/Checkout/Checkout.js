import React, {Component} from 'react';
import {Formik} from "formik";
import CheckoutForm from "./CheckoutForm";
import * as Yup from 'yup';

class Checkout extends Component {

   validationSchema = () => {
      const configObj = {
         firstName: Yup.string()
            .required('Required'),
         lastName: Yup.string()
            .required('Required'),
         street: Yup.string()
            .required('Required'),
         phone: Yup.string()
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

   render() {
      return (
         <div>
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
               onSubmit={(values, { setSubmitting }) => {
                  if(!this.props.cartData || this.props.cartData.length === 0){
                     return;
                  }
                  setSubmitting(false);
               }}
            >
               {(fmk) => {
                  return (
                     <div>
                        <CheckoutForm {...fmk}/>
                     </div>
                  )
               }
               }
            </Formik>
         </div>
      );
   }
}

export default Checkout;