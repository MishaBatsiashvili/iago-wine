import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import homePageReducer from './reducers/homePageReducer';
import appReducer from "./reducers/appReducer";
import cartReducer from "./reducers/cartReducer";

let reducers = combineReducers({
    homePage: homePageReducer,
    cart: cartReducer,
    app: appReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;