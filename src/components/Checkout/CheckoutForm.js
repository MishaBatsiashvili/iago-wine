import React from 'react';
import {TextInput} from "../common/FormikHelpers/Helpers";
import PropTypes from "prop-types";
import {Col, Container, Row} from "react-bootstrap";
import TitleBanner from "../common/TitleBanner/TitleBanner";
import bannerImg from '../../assets/images/marani.jpg'

const CheckoutForm = (props) => {
   return (
      <Container fluid>
         <Row>
            <Col xs={12}>
               <TitleBanner
                  imageURL={bannerImg}
                  text={'Checkout'}
               />
            </Col>

            <Col md={5}>
               <TextInput label={'First Name'} name={'firstName'} {...props} />
            </Col>

         </Row>
      </Container>
   );
};

export default CheckoutForm;