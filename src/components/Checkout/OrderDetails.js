import React from 'react';
import s from './OrderDetails.module.css'
import CartItems from "../Navbar/Cart/CartItems";

const OrderDetails = (props) => {


   const renderCartItems = () => {
      if(!props.cartData || props.cartData.products.length === 0){
         return <div className={'text-center'}>Cart Empty</div>
      }

      return (
         <CartItems
            removeCartItem={props.removeCartItem}
            changeAmnt={props.changeAmnt}
            lang={props.lang}
            cartData={props.cartData}
         />
      )
   }

   const renderCartSummary = () => {
      if(!props.cartData || props.cartData.products.length === 0){
         return null;
      }

      return <div className={s.summaryWrp}>
         <table className={'w-100'}>
            <tbody>
            <tr>
               <td className={s.summaryLeft}>{props.getStr('delivery')}:</td>
               <td className={s.summaryRight}>{deliveryPrice} GEL</td>
               <td></td>
            </tr>
            <tr>
               <td className={s.summaryLeft}>{props.getStr('order')}:</td>
               <td className={s.summaryRight}>{orderTotalPrice} GEL</td>
               <td></td>
            </tr>
            <tr>
               <td className={s.summaryLeft}>{props.getStr('cart_total')}:</td>
               <td className={s.summaryRight}>{totalPrice} GEL</td>
               <td></td>
            </tr>
            </tbody>
         </table>
      </div>
   }

   const getOrderTotalPrice = () => {
      const total = props.cartData.products.reduce((accum, cur) => {
         const price = parseFloat(cur.price)*100;
         const amount = parseInt(cur.amount);
         return accum + amount * price;
      }, 0)
      return total/100;
   }

   const orderTotalPrice = getOrderTotalPrice();
   const deliveryPrice = props.chosenDeliveryMethod && props.chosenDeliveryMethod.price || 0;
   const totalPrice = (orderTotalPrice*100 + deliveryPrice*100)/100;

   return (
      <div className={s.wrp}>
         <h5 className={s.title}>{props.getStr('order_details')}</h5>
         <div className={s.content}>
            {renderCartItems()}
            {renderCartSummary()}
         </div>
      </div>
   );
};

export default OrderDetails;