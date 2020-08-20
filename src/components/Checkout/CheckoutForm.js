import React from 'react';
import {InputTop, SelectInput, TextInput} from "../common/FormikHelpers/Helpers";
import PropTypes from "prop-types";
import {Col, Container, Row} from "react-bootstrap";
import s from './CheckoutForm.module.css';
import BaseBtn from "../common/NormalBtns/BaseBtn";
import DatePicker from "react-datepicker";

const CheckoutForm = (props) => {

   const renderDatepicker = () => {
      if(props.deliveryMethods
         && props.deliveryMethods.length > 0
         && props.deliveryMethods[props.chosenDeliveryMethodIndex].type === '1'){

         return (
            <Col md={6} className={'mb-4'}>
               <div>
                  <InputTop
                     name={'deliveryDate'}
                     label={'Delivery Date'}
                     noErrors={true}
                  />
               </div>
               <DatePicker
                  className={`form-control mt-2`}
                  selected={props.deliveryDate}
                  onChange={props.onDeliveryDateChanged}
                  minDate={new Date()}
               />
            </Col>
         )

      }

   }

   return (
      <div className={s.wrp}>
         <h4 className={s.formTitle}><i className={`fas fa-shopping-cart ${s.formTitleIcon}`}></i>Checkout Form</h4>
         <form onSubmit={props.handleSubmit} className={'row align-items-end'}>
            <TextInput label={'First Name'} name={'firstName'} {...props} />
            <TextInput label={'Last Name'} name={'lastName'} {...props} />
            <TextInput label={'Street Address'} name={'street'} {...props} />

            <TextInput
               {...props}
               label={'Phone Number'}
               name={'phone'}
               onChangeHandler={(e) => {
                  let val = e.target.value.replace(/ /g, '');
                  props.setFieldValue('phone', val);
               }}
            />

            <TextInput label={'Email'} name={'email'} {...props} />
            <TextInput
               {...props}
               label={'Comment'}
               name={'comment'}
               isTextarea={true}
               bootstrapSizeConfig={{xs: 12}}
            />

            <SelectInput
               {...props}
               label={'Delivery Method'}
               name={'deliveryMethod'}
               options={props.deliveryMethods}
               onChangeHandler={(e) => {
                  const value = e.target.value;
                  const index = props.deliveryMethods.findIndex(el => el.id === value);
                  props.deliveryMethodChanged(index);
                  props.handleChange(e);
               }}
            />

            {/*<SelectInput*/}
            {/*   {...props}*/}
            {/*   label={'Payment Method'}*/}
            {/*   name={'paymentMethod'}*/}
            {/*   options={props.deliveryMethods}*/}
            {/*/>*/}

            {renderDatepicker()}


            <Col xs={12} className={'mt-4'}>
               <BaseBtn
                  text={'Submit Order'}
                  btnType={'Yellow'}
                  size={'md'}
               />
            </Col>

         </form>
      </div>
   );
};

export default CheckoutForm;