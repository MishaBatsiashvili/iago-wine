import customAxios from '../../api/customAxios';
import * as api from '../../api/api';

//action constants
const SET_PRODUCTS = 'SET_PRODUCTS';

//initial state
const initState = {
    products: [],
    slides: [],
    articles: [],
    exports: [],
}

//reducer
const homePageReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products,
            }
        default:
            return state;
    }
}

export default homePageReducer;


//action creators
// export const follow = (userId) => ({type: FOLLOW, userId: userId});


//thunk creators
export const getProducts = () => {
    return dispatch => {
        api.getProducts()
           .then(res => {
               dispatch({type: SET_PRODUCTS, products: res});
           })
    }
}

