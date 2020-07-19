//action constants
import customAxios from "../../api/customAxios";
import qs from "querystring";

const GET_CART = 'GET_CART';
const ADD_CART_ITEM = 'ADD_CART_ITEM';

//initial state
const initState = {
   cartData: {

   },
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
      default:
         return state;
   }
}

export default homePageReducer;


//action creators
// export const follow = (userId) => ({type: FOLLOW, userId: userId});


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
      return customAxios.post('?action=add_cart_item', {item_id: itemId}).then(res => {
         dispatch({type: ADD_CART_ITEM, itemId: itemId});
      });
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

   }
}

