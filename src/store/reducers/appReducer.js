//action constants
const SET_ENG = 'SET_ENG';
const SET_GE = 'SET_GE';

//initial state
const initState = {
   lang: 'en', // 'en' or 'ge'
   strs: {},
}

//reducer
const appReducer = (state = initState, action) => {
   switch (action.type) {
      case SET_ENG:
         return {...state, lang: 'en'}
      case SET_GE:
         return {...state, lang: 'ge'}
      default:
         return state;
   }
}

export default appReducer;


//action creators
export const setLangGe = (userId) => ({type: SET_GE});
export const setLangEn = (userId) => ({type: SET_ENG});


//thunk creators
// export const requestUsers = (currentPage, pageSize) => {
//     return dispatch => {
//
//     }
// }

