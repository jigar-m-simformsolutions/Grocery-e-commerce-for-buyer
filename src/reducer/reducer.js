import {
  ADD_TO_CART,
  ALL_USER_FETCH,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  RESET_PASSWORD_CHANGE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
} from "../actions/auth";

const initialState = {
  addToCart: [],
  allusers: [],
  phoneVerifyErrorMsg: "",
  phoneVerified: false,
  PhoneVerifyUser: "",
  signupErrorMsg: "",
  signupSuccessMessage: "",
  logoutErrMsg: "",
  isSignup: false,
  signupError: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  logoutError: false,
  isAuthenticated: false,
  ispasswordResetLinkSend: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: 
      return {
        ...state,
        addToCart: action.addToCartProduct,
      }
    case ALL_USER_FETCH:
      console.log(action.userData);
      return {
        ...state,
        allusers: action.userData,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signupError: true,
        signupErrorMsg: action.msg,
      };
    case SIGNUP_SUCCESS:
      // console.log(action.userData)
      return {
        ...state,
        signupError: false,
        isSignup: true,
        signupSuccessMessage: action.msg,
        // currentUser: action.userData,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
      };
    case LOGIN_SUCCESS:
      console.log(action.user);
      return {
        ...state,
        isLoggingIn: false,
        user: action.user,
        isAuthenticated: true,
      };
    case RESET_PASSWORD_CHANGE:
      return {
        ...state,
        ispasswordResetLinkSend: true,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
      };
    case VERIFY_REQUEST:
      return {
        ...state,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
