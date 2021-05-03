import db, { auth } from "../firebaseConfig/firebaseConfig";

export const ALL_USER_FETCH = "ALL_USER_FETCH";
export const ADD_TO_CART = "ADD_TO_CART";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const RESET_PASSWORD_CHANGE = "RESET_PASSWORD_CHANGE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const SignupUser = (fullname, email, phone_number, password) => (
  dispatch
) => {
 // auth
  //   .createUserWithEmailAndPassword(email, password)
  //   .then((dataBeforeEmail) => {
  //     auth.onAuthStateChanged((user) => {
  //       user.sendEmailVerification();
  //     });
  //   }); 
  try {
    db.collection("buyer-users").add({
      fullname,
      email,
      password,
      phone_number,
    });
    dispatch({
      type: SIGNUP_SUCCESS,
      msg : "Successfully Created Your Account."
    })
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILURE,
      msg:
        "Something went wrong, we couldn't create your account.Please try again.",
    });
  }
};

export const fetchUsers = () => (dispatch) => {
  db.collection("buyer-users")
  .get()
  .then((snapshot) => {
    let userData = [];
    snapshot.forEach((doc) => {
      let userId = doc.id;
      let data = doc.data();
      let obj = { ...data, userId };
      userData.push(obj);
    });
    dispatch({
      type: ALL_USER_FETCH,
      userData,
    });
  });
}

export const LoginUser = (email, password) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        user,
      });
    })
    .catch(() => {
      dispatch({
        type: LOGIN_FAILURE,
      });
    });
};

export const resetPassword = (email) => (dispatch) => {
  auth.sendPasswordResetEmail(email).then((user) => {
    dispatch({
      type: RESET_PASSWORD_CHANGE,
    });
  });
};
