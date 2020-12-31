import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  authLoginReducer,
  authRegisterReducer,
  authLogoutReducer,
  authEditSelfReducer,
  authDeleteSelfReducer,
  authUpdateSelfReducer,
  authRequestResetfReducer,
  authResetReducer,
} from "./reducers/authReducer";
import {
  addProductReducer,
  getAllProductsReducer,
} from "./reducers/productReducers";

const initialState = {};

const reducer = combineReducers({
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  authLogout: authLogoutReducer,
  authEditSelf: authEditSelfReducer,
  authDeleteSelf: authDeleteSelfReducer,
  authUpdateSelf: authUpdateSelfReducer,
  authRequestReset: authRequestResetfReducer,
  authReset: authResetReducer,
  addProduct: addProductReducer,
  getAllProducts: getAllProductsReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
