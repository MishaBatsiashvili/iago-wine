import React from "react";
import s from './HomeProducts.module.css';
import {Col, Container, Row} from "react-bootstrap";
import BaseBtn from "../../common/NormalBtns/BaseBtn";
import Products from "../../Products/Products";

import anettaImg from '../../../assets/images/bottles/anetta.png'
import chinuriGreenImg from '../../../assets/images/bottles/chinuri-green.png'
import chinuriYellowImg from '../../../assets/images/bottles/chinuri-yellow.png'
import marinaImg from '../../../assets/images/bottles/marina.png'

const HomeProducts = props => {
    return (
        <Container className={s.wrp}>
            <div className={'text-center'}>
                <span className={s.secondaryText}>Our Store</span>
                <h1 className={s.mainText}>Find Your Drink</h1>
            </div>

            <Row className={`justify-content-center ${s.productsWrp}`}>
                <Col md={10} lg={9} >
                    <Products addCartItem={props.addCartItem} lang={props.lang} productsArr={props.products} />
                </Col>
            </Row>

        </Container>
    )
}

export default HomeProducts;