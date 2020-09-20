import s from "./Cart.module.css";
import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const CartSummary = props => {

    if(!props.cartData.products || props.cartData.products.length === 0){
        return <div className={s.cartEmptyText}>{props.getStr('cart_empty')}</div>
    }

    const calcCartTotalPrice = () => {
        const total = props.cartData.products.reduce((accum, cur) => {
            const price = parseFloat(cur.price)*100;
            const amount = parseInt(cur.amount);
            return accum + amount * price;
        }, 0)
        return total/100;
    }
    const cartTotalPrice = calcCartTotalPrice();

    return (
        <table>
            <tbody>
                <tr>
                    <td className={s.summaryLeft}>{props.getStr('order', props.lang)}:</td>
                    <td className={s.summaryRight}>{cartTotalPrice} GEL</td>
                </tr>
            </tbody>
        </table>
    )
}

export default CartSummary;