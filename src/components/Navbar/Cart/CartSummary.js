import s from "./Cart.module.css";
import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const CartSummary = props => {
    return (<Container fluid className={s.summary}>
        <Row className={'mb-1'}>
            <Col xs={7} className={s.summaryLeft}>Order Total:</Col>
            <Col xs={5} className={s.summaryRight}>10.99 GEL</Col>
        </Row>
        <Row className={'mb-1'}>
            <Col xs={7} className={s.summaryLeft}>Delivery:</Col>
            <Col xs={5} className={s.summaryRight}>5.99 GEL</Col>
        </Row>
        <hr/>
        <Row>
            <Col xs={7} className={`${s.summaryLeft} ${s.summaryLeftLg}`}>Total:</Col>
            <Col xs={5} className={`${s.summaryRight} ${s.summaryLeftLg}`}>16.98 GEL</Col>
        </Row>
    </Container>)
}

export default CartSummary;