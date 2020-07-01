import React from "react";
import Product from "./Product";
import {Row} from "react-bootstrap";

const Products = props => {
    // id: 2,
    // name: 'Beef Stake #2',
    // desc: 'Beef, Carrot, Cheese, French Fries',
    // price: '15.99',
    // imageLink: 'http://assets.suelo.pl/soup/img/products/product-pizza.jpg',
    const products = () => {
        return props.productsArr.map(prod => {
            const {id, name, desc, price, imageLink} = prod;
            return <Product key={id}
                            id={id}
                            name={name}
                            desc={desc}
                            price={price}
                            imageLink={imageLink} />
        })
    }

    return (
        <Row>{products()}</Row>
    )
}

export default Products;