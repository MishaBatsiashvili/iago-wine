import React from "react";
import s from './Product.module.css';
import {Col} from "react-bootstrap";
import BtnPriceSide from "../common/BtnPriceSide/BtnPriceSide";

const Product = props => {
    // id: 2,
    // name: 'Beef Stake #2',
    // desc: 'Beef, Carrot, Cheese, French Fries',
    // price: '15.99',
    // imageLink: 'http://assets.suelo.pl/soup/img/products/product-pizza.jpg',
    return (
        <Col md={6} className={s.productWrp}>
            <div className={s.imgWrp}>
                <img src={props.imageLink} className={s.img} alt=""/>
            </div>
            <div className={s.wrp}>
                <p className={s.name}>{props.name}</p>
                <p className={s.desc}>{props.desc}</p>
                <BtnPriceSide
                    centered
                    btnType={'Yellow'}
                    text={'Add to Cart'}
                    price={props.price}/>
            </div>
        </Col>
    )
}

export default Product;