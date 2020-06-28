import s from "./Cart.module.css";
import React from "react";
import {Link} from "react-router-dom";

const CartItems = props => {
    return (<table className={`w-100`}>
        <tbody>
            <tr className={s.itemwrp}>
                <td className={s.itemTitleWrp}>
                    <Link className={s.itemName}>Beef Burger</Link>
                    <p className={s.itemOptions}>Normal (200g)</p>
                </td>
                <td className={s.itemPrice}>10.99 GEL</td>
                <td className={s.itemActions}>
                    <i className="fas fa-pencil-alt"></i>
                    <i className="fas fa-trash-alt"></i>
                </td>
            </tr>
        </tbody>
    </table>)
}

export default CartItems;