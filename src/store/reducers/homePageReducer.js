import customAxios from '../../api/customAxios';
import * as api from '../../api/api';

//action constants
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_ALL_SECTIONS = 'SET_ALL_SECTIONS';
const SET_ALL_SLIDES = 'SET_ALL_SLIDES';

//initial state
const initState = {
    products: [],
    articles: [],
    exports: [],
    slides: null,
    sections: null,
}

//reducer
const homePageReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products,
            }
        case SET_ALL_SECTIONS:
            return {
                ...state,
                sections: action.sections,
            }
        case SET_ALL_SLIDES:
            return {
                ...state,
                slides: action.slides,
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

export const getAllSections = () => {
    return dispatch => {
        api.getAllSections()
            .then(res => {
               dispatch({type: SET_ALL_SECTIONS, sections: res.sections})
            });
    }
}

export const getAllSlides = () => {
    return dispatch => {
        api.getAllSlides()
            .then(res => {
               dispatch({type: SET_ALL_SLIDES, slides: res.slides})
            });
    }
}

