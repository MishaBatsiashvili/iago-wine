import React from 'react';
import {InputTop, SelectInput, TextInput} from "../common/FormikHelpers/Helpers";
import PropTypes from "prop-types";
import {Col, Container, Row} from "react-bootstrap";
import s from './CheckoutForm.module.css';
import BaseBtn from "../common/NormalBtns/BaseBtn";
import DatePicker from "react-datepicker";

const CheckoutForm = (props) => {

    const renderDatepicker = () => {
        if (props.deliveryMethods
            && props.deliveryMethods.length > 0
            && props.deliveryMethods[props.chosenDeliveryMethodIndex].type === 1) {

            return (
                <Col md={6} className={'mb-4'}>
                    <div>
                        <InputTop
                            name={'deliveryDate'}
                            label={props.getStr('delivery_date_field')}
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

                <div className={`col-12 ${s.serverError}`}>
                    {props.serverError}
                </div>

                <TextInput label={props.getStr('first_name')} name={'firstName'} {...props} />
                <TextInput label={props.getStr('last_name')} name={'lastName'} {...props} />
                <TextInput label={props.getStr('address')} name={'address'} {...props} />

                <TextInput
                    {...props}
                    label={props.getStr('phone_field')}
                    name={'phone'}
                    onChangeHandler={(e) => {
                        let val = e.target.value.replace(/ /g, '');
                        props.setFieldValue('phone', val);
                    }}
                />

                <TextInput label={props.getStr('email_field')} name={'email'} {...props} />
                <TextInput
                    {...props}
                    label={props.getStr('comment_field')}
                    name={'comment'}
                    isTextarea={true}
                    bootstrapSizeConfig={{xs: 12}}
                />

                <SelectInput
                    {...props}
                    label={props.getStr('delivery_method_field')}
                    name={'deliveryMethod'}
                    options={props.deliveryMethods}
                    onChangeHandler={(e) => {
                        const value = e.target.value;
                        const index = props.deliveryMethods.findIndex(el => el.id === parseInt(value));
                        props.deliveryMethodChanged(index);
                        props.handleChange(e);
                    }}
                    handleBlur={props.handleBlur}
                />

                <SelectInput
                    {...props}
                    label={props.getStr('payment_method_field')}
                    name={'paymentMethod'}
                    options={props.paymentMethods}
                />

                {renderDatepicker()}


                <Col xs={12} className={'mt-4'}>
                    <BaseBtn
                        type={'submit'}
                        text={props.getStr('submit_order')}
                        btnType={'Yellow'}
                        size={'md'}
                    />
                </Col>

            </form>
        </div>
    );
};

export default CheckoutForm;