import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_RESET,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_RESET,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_RESET,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_FAILURE,
  AUTH_DELETE_SELF_FAILURE,
  AUTH_DELETE_SELF_REQUEST,
  AUTH_DELETE_SELF_RESET,
  AUTH_DELETE_SELF_SUCCESS,
  AUTH_UPDATE_SELF_SUCCESS,
  AUTH_UPDATE_SELF_RESET,
  AUTH_UPDATE_SELF_REQUEST,
  AUTH_UPDATE_SELF_FAILURE,
  AUTH_REQUEST_RESET_FAILURE,
  AUTH_REQUEST_RESET_REQUEST,
  AUTH_REQUEST_RESET_RESET,
  AUTH_REQUEST_RESET_SUCCESS,
  AUTH_RESET_FAILURE,
  AUTH_RESET_REQUEST,
  AUTH_RESET_RESET,
  AUTH_RESET_SUCCESS,
} from "../constants/authConstants";

export const authLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { loading: true };
    case AUTH_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case AUTH_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case AUTH_LOGIN_RESET:
      return {};
    default:
      return { ...state };
  }
};

export const authRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_REGISTER_REQUEST:
      return { loading: true };
    case AUTH_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };
    case AUTH_REGISTER_FAILURE:
      return { loading: false, error: action.payload };
    case AUTH_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const authLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGOUT_REQUEST:
      return { loading: true };
    case AUTH_LOGOUT_SUCCESS:
      return { loading: false, success: true };
    case AUTH_LOGOUT_FAILURE:
      return { loading: false, success: false, error: action.payload };
    case AUTH_LOGOUT_RESET:
      return {};
    default:
      return state;
  }
};

export const authEditSelfReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGOUT_REQUEST:
      return { loading: true };
    case AUTH_LOGOUT_SUCCESS:
      return { loading: false, user: action.data };
    case AUTH_LOGOUT_FAILURE:
      return { loading: false, success: false, error: action.payload };
    case AUTH_LOGOUT_RESET:
      return {};
    default:
      return state;
  }
};
export const authDeleteSelfReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_DELETE_SELF_REQUEST:
      return { loading: true };
    case AUTH_DELETE_SELF_SUCCESS:
      return { loading: false, success: true };
    case AUTH_DELETE_SELF_FAILURE:
      return { loading: false, success: false, error: action.payload };
    case AUTH_DELETE_SELF_RESET:
      return {};
    default:
      return state;
  }
};
export const authUpdateSelfReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_UPDATE_SELF_REQUEST:
      return { loading: true };
    case AUTH_UPDATE_SELF_SUCCESS:
      return { loading: false, user: action.payload };
    case AUTH_UPDATE_SELF_FAILURE:
      return { loading: false, error: action.payload };
    case AUTH_UPDATE_SELF_RESET:
      return {};
    default:
      return state;
  }
};
export const authRequestResetfReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_REQUEST_RESET_REQUEST:
      return { loading: true };
    case AUTH_REQUEST_RESET_SUCCESS:
      return { loading: false, success: true };
    case AUTH_REQUEST_RESET_FAILURE:
      return { loading: false, error: action.payload };
    case AUTH_REQUEST_RESET_RESET:
      return {};
    default:
      return state;
  }
};
export const authResetReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_RESET_REQUEST:
      return { loading: true };
    case AUTH_RESET_SUCCESS:
      return { loading: false, user: action.payload };
    case AUTH_RESET_FAILURE:
      return { loading: false, error: action.payload };
    case AUTH_RESET_RESET:
      return {};
    default:
      return state;
  }
};
