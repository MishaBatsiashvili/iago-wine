//action constants
import customAxios from "../../api/customAxios";
import qs from "querystring";
import {sendFormToCheckout, sendVerifCodeApi} from "../../api/api";

const GET_CART = 'GET_CART';
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const SAVE_CHECKOUT_FORM_DATA = 'SAVE_CHECKOUT_FORM_DATA';
const RESET_CHECKOUT_FORM_DATA = 'RESET_CHECKOUT_FORM_DATA';

//initial state
const initState = {
   cartData: {

   },
   checkoutFormData: null,
}

//reducer
const homePageReducer = (state = initState, action) => {
   switch (action.type) {
      case GET_CART:
         return {
            ...state,
            cartData: action.cartData
         }
         break;
      case ADD_CART_ITEM:
         return {
            ...state,
         }
         break;
      case SAVE_CHECKOUT_FORM_DATA:
         return {
            ...state,
            checkoutFormData: action.formData,
         }
         break;
      case RESET_CHECKOUT_FORM_DATA:
         return {
            ...state,
            checkoutFormData: null,
         }
      default:
         return state;
   }
}

export default homePageReducer;


//action creators
export const saveCheckoutFormData = (formData) => {
   return {
      type: SAVE_CHECKOUT_FORM_DATA,
      formData: formData,
   }
}

export const resetCheckoutFormData = () => {
   return {
      type: RESET_CHECKOUT_FORM_DATA,
   }
}

//thunk creators
const fetchCart = (dispatch) => {
   return customAxios.get('?action=get_cart').then(res => {
      dispatch({type: GET_CART, cartData: res.data});
   });
}
export const getCart = () => {
    return dispatch => {
       fetchCart(dispatch);
    }
}

export const addCartItem = (itemId) => {
   return dispatch => {
      return customAxios.post('?action=add_cart_item', {item_id: itemId})
   }
}

export const changeAmnt = (id, newAmnt, cartId) => {
   return dispatch => {
      if(newAmnt >= 1){
         customAxios.post('?action=change_amount', {id: id, newAmnt: newAmnt, cartId: cartId})
            .then(res => {
               fetchCart(dispatch);
            })
      }
   }
}

export const removeCartItem = (id, cartId) => {
   return dispatch => {
      customAxios.post('?action=remove_cart_item', {id: id, cartId: cartId})
         .then(res => {
            if(res.data.status === 1){
               fetchCart(dispatch);
            } else {
               console.error('some error has occured');
            }
         })
         .catch(error => {
            console.error(error);
         })
   }
}


export const sendVerifCode = (phone, cartId) => {
   return dispatch => {
      return sendVerifCodeApi(phone, cartId);
   }
}

export const checkout = (formData, verifCode) => {
   return dispatch => {

      // including verification code
      formData.verif = verifCode;

      // submitting checkout form
      return sendFormToCheckout(formData);
   }
}



