import axios from "axios";
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

export const getProducts = async (dispatch) => {
  dispatch({ type: PRODUCT_ALL_REQUEST });
  try {
    const { data } = axios.get("/api/products/");

    dispatch({ type: PRODUCT_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_ALL_FAILURE, error: error });
  }
};
