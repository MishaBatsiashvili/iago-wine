//action constants
import {fetchGeneralInfo, getAllStrings} from "../../api/api";

const SET_ENG = 'SET_ENG';
const SET_GE = 'SET_GE';
const SET_STRINGS = 'SET_STRINGS';
const SET_GENERAL = 'SET_GENERAL';

//initial state
const initState = {
   lang: 'en', // 'en' or 'ge'
   strings: {},
    general: {},
}

//reducer
const appReducer = (state = initState, action) => {
   switch (action.type) {
      case SET_ENG:
         return {...state, lang: 'en'}
      case SET_GE:
         return {...state, lang: 'ge'}
      case SET_STRINGS:
         return {
            ...state,
            strings: action.strings,
         }
     case SET_GENERAL:
         return {
            ...state,
            general: action.general,
         }
      default:
         return state;
   }
}

export default appReducer;


//action creators
export const setLangGe = (userId) => ({type: SET_GE});
export const setLangEn = (userId) => ({type: SET_ENG});


//thunk creators
export const getStrings = () => {
    return dispatch => {
       getAllStrings()
           .then(res => {
              dispatch({ type: SET_STRINGS, strings: res.strings });
           })
    }
}

export const getGeneralInfo = () => {
    return dispatch => {
        fetchGeneralInfo()
            .then(res => {
                dispatch({ type: SET_GENERAL, general: res.general });
            })
    }
}

