import s from "./Cart.module.css";
import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const CartSummary = props => {
    const deliveryPrice = 5;
    const calcCartTotalPrice = () => {
        const total = props.cartData.products.reduce((accum, cur) => {
            const price = parseFloat(cur.price)*100;
            const amount = parseInt(cur.amount);
            return accum + amount * price;
        }, 0)
        return total/100;
    }
    const cartTotalPrice = calcCartTotalPrice();

    return (<Container fluid className={s.summary}>
        <Row className={'mb-1'}>
            <Col xs={7} className={s.summaryLeft}>Order Total:</Col>
            <Col xs={5} className={s.summaryRight}>{cartTotalPrice} GEL</Col>
        </Row>
        <Row className={'mb-1'}>
            <Col xs={7} className={s.summaryLeft}>Delivery:</Col>
            <Col xs={5} className={s.summaryRight}>{deliveryPrice} GEL</Col>
        </Row>
        <hr/>
        <Row>
            <Col xs={7} className={`${s.summaryLeft} ${s.summaryLeftLg}`}>Total:</Col>
            <Col xs={5} className={`${s.summaryRight} ${s.summaryLeftLg}`}>{deliveryPrice + cartTotalPrice} GEL</Col>
        </Row>
    </Container>)
}

export default CartSummary;