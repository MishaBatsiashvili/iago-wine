import apiHandler, {getDynamicPage, getDynamicPageNames} from "../../api/api";

//action constants
const SET_DYNAMIC_PAGES = 'SET_DYNAMIC_PAGES';
const SET_SINGLE_PAGE_DATA = 'SET_SINGLE_PAGE_DATA';
const CLEAR_SINGLE_PAGE_DATA = 'CLEAR_SINGLE_PAGE_DATA';

//initial state
const initState = {
    pageNames: [],
    singlePageData: null, // object
}

//reducer
const dynamicPageReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_DYNAMIC_PAGES:
            return {
                ...state,
                pageNames: action.pageNames,
            }
        case SET_SINGLE_PAGE_DATA:
            return {
                ...state,
                singlePageData: action.singlePageData,
            }
        case CLEAR_SINGLE_PAGE_DATA:
            return {
                ...state,
                singlePageData: null,
            }
        default:
            return state;
    }
}

export default dynamicPageReducer;


//action creators
// export const follow = (userId) => ({type: FOLLOW, userId: userId});
export const setDynamicPagesAc = (pageNames) => {
    return {
        type: SET_DYNAMIC_PAGES,
        pageNames: pageNames,
    }
}

export const clearSinglePageData = () => ({
    type: CLEAR_SINGLE_PAGE_DATA,
})

//thunk creators
export const getDynamicPages = () => {
    return dispatch => {
       getDynamicPageNames()
           .then(res => {
              dispatch(setDynamicPagesAc(res.pageNames));
           })

    }
}

export const getDynamicPageData = (path) => {
    return dispatch => {
        return getDynamicPage(path)
            .then(res => {
                dispatch({type: SET_SINGLE_PAGE_DATA, singlePageData: res.page});
                return res;
            });
    }
}

