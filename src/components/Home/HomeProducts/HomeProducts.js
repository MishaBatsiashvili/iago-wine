import React from "react";
import s from './HomeProducts.module.css';
import {Col, Container, Row} from "react-bootstrap";
import BaseBtn from "../../common/NormalBtns/BaseBtn";
import Products from "../../Products/Products";

import anettaImg from '../../../assets/images/bottles/anetta.png'
import chinuriGreenImg from '../../../assets/images/bottles/chinuri-green.png'
import chinuriYellowImg from '../../../assets/images/bottles/chinuri-yellow.png'
import marinaImg from '../../../assets/images/bottles/marina.png'

const placeholderData = [
    {
        id: 1,
        name: 'Chinuri Wine #1',
        desc: 'Beef, Carrot, Cheese, French Fries',
        price: '15.99',
        imageLink: anettaImg,
    },
    {
        id: 2,
        name: 'Chinuri Wine #2',
        desc: 'Beef, Carrot, Cheese, French Fries',
        price: '10.99',
        imageLink: chinuriGreenImg,
    },
    {
        id: 3,
        name: 'Chinuri Wine #3',
        desc: 'Beef, Carrot, Cheese, French Fries',
        price: '12.99',
        imageLink: chinuriYellowImg,
    },
    {
        id: 3,
        name: 'Chinuri Wine #3',
        desc: 'Beef, Carrot, Cheese, French Fries',
        price: '12.99',
        imageLink: marinaImg,
    },
]

const HomeProducts = props => {
    return (
        <Container className={s.wrp}>
            <div className={'text-center'}>
                <span className={s.secondaryText}>Our Store</span>
                <h1 className={s.mainText}>Find Your Drink</h1>
            </div>

            <Row className={`justify-content-center ${s.productsWrp}`}>
                <Col md={'9'}>
                    <Products productsArr={placeholderData} />
                </Col>
            </Row>

        </Container>
    )
}

export default HomeProducts;