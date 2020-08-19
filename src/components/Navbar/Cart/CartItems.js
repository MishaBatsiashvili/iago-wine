import s from "./Cart.module.css";
import React from "react";
import {Link} from "react-router-dom";

class CartItems extends React.Component {

   state = {
      products: [],
   }

   componentDidMount() {
      this.setState({
         products: this.duplicateCartData(),
      });
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if(this.props.cartData !== prevProps.cartData){
         this.setState({
            products: this.duplicateCartData(),
         });
      }
   }

   duplicateCartData = () => {
      return this.props.cartData.products.map(prod => {
         return {
            ...prod
         }
      });
   }

   getStateWithChangedAmount = (id, newAmount, state) => {
      return state.products.map(el => {
         if(el.id === id && newAmount >= 1){
            return {
               ...el,
               amount: newAmount,
            }
         }
         return el;
      });
   }

   onAmountChanged = (id, newAmount) => {
      this.setState((state) => {
         return {products: this.getStateWithChangedAmount(id, newAmount, state)}
      });
   }

   render() {

      const cartItemsJSX = () => {
         return this.state.products.map((prod) => (
               <tr key={prod.id} className={s.itemwrp}>
                  <td className={s.itemTitleWrp}>
                     <Link to={'#'} className={s.itemName}>{prod[`name_${this.props.lang}`]}</Link>
                  </td>
                  <td className={s.itemPrice}>{prod.price} GEL</td>
                  <td className={s.itemActions}>
                     <input
                        type="number"
                        className={s.amntInput}
                        value={prod.amount}
                        onChange={(e) => this.onAmountChanged(prod.id, e.target.value)}
                        onBlur={(e) => this.props.changeAmnt(prod.id, e.target.value, this.props.cartData.id)}
                     />
                     <i onClick={() => this.props.removeCartItem(prod.id, this.props.cartData.id)} className="fas fa-trash-alt"></i>
                  </td>
               </tr>
            ))
      }

      return (<table className={`w-100`}>
         <tbody>
         {cartItemsJSX()}
         </tbody>
      </table>)
   }
}

export default CartItems;