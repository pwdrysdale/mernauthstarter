import {
  PRODUCT_ADD_FAILURE,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_RESET,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ALL_FAILURE,
  PRODUCT_ALL_REQUEST,
  PRODUCT_ALL_RESET,
  PRODUCT_ALL_SUCCESS,
} from "../constants/productConstants";

export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADD_REQUEST:
      return { loading: true };
    case PRODUCT_ADD_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_ADD_FAILURE: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
export const getAllProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ALL_REQUEST:
      return { loading: true };
    case PRODUCT_ALL_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_ALL_FAILURE: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
