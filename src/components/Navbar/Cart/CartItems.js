import s from "./Cart.module.css";
import React from "react";
import {Link} from "react-router-dom";

class CartItems extends React.Component {

   state = {
      products: [],
   }

   componentDidMount() {
      this.setState({
         products: this.props.cartData.products.map(prod => {
            return {
               id: prod.id,
               amount: prod.amount,
            }
         }),
      });
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if(this.props.cartData !== prevProps.cartData){
         const newState = this.props.cartData.products.map(prod => {
            return {
               id: prod.id,
               amount: prod.amount,
            }
         });
         this.setState({
            products: newState,
         });
      }
   }

   onAmountChanged = (id, newAmount) => {
      this.setState((state) => {
         const newState = state.products.map(el => {
            if(el.id === id && newAmount >= 1){
               return {
                  ...el,
                  amount: newAmount,
               }
            }
            return el;
         });
         // debugger;

         return {products: newState}
      });
   }

   render() {

      if(this.state.products.length === 0) return <div>Loading...</div>;

      const cartItemsJSX = () => {
         // debugger;
         return this.props.cartData.products.map((prod, i) => (
            <tr className={s.itemwrp}>
               <td className={s.itemTitleWrp}>
                  <Link to={'#'} className={s.itemName}>{prod[`name_${this.props.lang}`]}</Link>
               </td>
               <td className={s.itemPrice}>{prod.price} GEL</td>
               <td className={s.itemActions}>
                  <input
                     type="number"
                     className={s.amntInput}
                     value={this.state.products[i].amount}
                     onChange={(e) => this.onAmountChanged(prod.id, e.target.value)}
                     onBlur={(e) => this.props.changeAmnt(prod.id, e.target.value, this.props.cartData.id)}
                  />
                  <i className="fas fa-trash-alt"></i>
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