import React from "react";
import Product from "./Product";
import {Row} from "react-bootstrap";
import {imagePathGenerator} from "../../api/api";

const Products = props => {
    // id: 2,
    // name: 'Beef Stake #2',
    // desc: 'Beef, Carrot, Cheese, French Fries',
    // price: '15.99',
    // imageLink: 'http://assets.suelo.pl/soup/img/products/product-pizza.jpg',
    const products = () => {
        return props.productsArr.map(prod => {
            return <Product
                key={prod.id}
                id={prod.id}
                name={prod[`name_${props.lang}`]}
                desc={prod[`descr_${props.lang}`]}
                price={prod.price}
                addCartItem={props.addCartItem}
                imageLink={imagePathGenerator(prod.img, 'products')}
                inStock={prod.in_stock}

                lang={props.lang}
                getStr={props.getStr}
            />
        })
    }

    return (
        <Row>{products()}</Row>
    )
}

export default Products;