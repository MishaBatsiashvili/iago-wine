import React from "react";
import s from './FeaturedProducts.module.css';
import {Container} from "react-bootstrap";
import Products from "../../Products/Products";
import BaseBtn from "../../common/NormalBtns/BaseBtn";

const placeholderData = [
    {
        id: 1,
        name: 'Beef Stake #1',
        desc: 'Beef, Carrot, Cheese, French Fries',
        price: '15.99',
        imageLink: 'http://assets.suelo.pl/soup/img/products/product-chicken-burger.jpg',
    },
    {
        id: 2,
        name: 'Beef Stake #2',
        desc: 'Beef, Carrot, Cheese, French Fries',
        price: '10.99',
        imageLink: 'http://assets.suelo.pl/soup/img/products/product-pizza.jpg',
    },
    {
        id: 3,
        name: 'Beef Stake #3',
        desc: 'Beef, Carrot, Cheese, French Fries',
        price: '12.99',
        imageLink: 'http://assets.suelo.pl/soup/img/products/product-chicken-burger.jpg',
    },
]

const FeaturedProducts = props => {
    return (
        <div className={s.wrp}>

        </div>
    )
}

export default FeaturedProducts;