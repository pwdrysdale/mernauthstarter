import axios from "axios";
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_RESET,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_RESET,
  AUTH_REGISTER_SUCCESS,
  AUTH_UPDATE_SELF_FAILURE,
  AUTH_UPDATE_SELF_REQUEST,
  AUTH_UPDATE_SELF_SUCCESS,
  AUTH_DELETE_SELF_FAILURE,
  AUTH_DELETE_SELF_REQUEST,
  AUTH_DELETE_SELF_SUCCESS,
  AUTH_REQUEST_RESET_REQUEST,
  AUTH_REQUEST_RESET_SUCCESS,
  AUTH_REQUEST_RESET_FAILURE,
  AUTH_RESET_REQUEST,
  AUTH_RESET_SUCCESS,
  AUTH_RESET_FAILURE,
} from "../constants/authConstants";

export const registerUser = ({
  emailAddress,
  displayName,
  firstName,
  lastName,
  image,
  password,
}) => async (dispatch) => {
  dispatch({ type: AUTH_REGISTER_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/auth/",
      { emailAddress, displayName, firstName, lastName, image, password },
      config
    );
    dispatch({ type: AUTH_REGISTER_SUCCESS, payload: data });
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AUTH_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = ({ emailAddress, password }) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/login",
      { emailAddress, password },
      config
    );

    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AUTH_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOGOUT_REQUEST });
    dispatch({ type: AUTH_REGISTER_RESET });
    dispatch({ type: AUTH_LOGIN_RESET });
    const { data } = await axios.get("/api/auth/login");

    if (data) {
      dispatch({ type: AUTH_LOGOUT_SUCCESS });
    }
  } catch (error) {
    dispatch({
      type: AUTH_LOGOUT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSelf = ({
  emailAddress,
  firstName,
  lastName,
  displayName,
  password,
  image,
}) => async (dispatch, getState) => {
  dispatch({ type: AUTH_UPDATE_SELF_REQUEST });
  try {
    const {
      authLogin: { user },
    } = getState();

    if (user.emailAddress !== emailAddress) {
      dispatch({ type: AUTH_UPDATE_SELF_FAILURE, payload: "Thats not you!" });
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/auth/${user._id}`,
      { emailAddress, displayName, firstName, lastName, image, password },
      config
    );

    dispatch({
      type: AUTH_UPDATE_SELF_SUCCESS,
      payload: { ...data, token: user.token },
    });
    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: { ...data, token: user.token },
    });
  } catch (error) {
    dispatch({
      type: AUTH_UPDATE_SELF_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSelf = () => async (dispatch, getState) => {
  dispatch({ type: AUTH_DELETE_SELF_REQUEST });

  try {
    const {
      authLogin: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    console.log(user._id);
    await axios.delete(`/api/auth/${user._id}`, config);
    dispatch({ type: AUTH_LOGIN_RESET });
    dispatch({ type: AUTH_REGISTER_RESET });
    dispatch({ type: AUTH_DELETE_SELF_SUCCESS });
  } catch (error) {
    dispatch({
      type: AUTH_DELETE_SELF_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createResetRequest = (emailAddress) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST_RESET_REQUEST });
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/auth/reset",
      { emailAddress },
      config
    );
    dispatch({ type: AUTH_REQUEST_RESET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AUTH_REQUEST_RESET_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const passwordReset = ({ emailAddress, _id, password }) => async (
  dispatch
) => {
  dispatch({ type: AUTH_RESET_REQUEST });
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/auth/reset/${_id}`,
      { emailAddress, password },
      config
    );
    dispatch({ type: AUTH_RESET_SUCCESS, payload: data });
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AUTH_RESET_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const checkAuth = () => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_REQUEST });

  try {
    const { data } = await axios.get("/api/auth");

    if (data) {
      dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
    } else {
      dispatch({
        type: AUTH_LOGIN_FAILURE,
        error: "There is no JWT to work with",
      });
    }
  } catch (error) {
    console.log("Tried, no dice");
  }
};
