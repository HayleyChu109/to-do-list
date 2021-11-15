import { LOGIN_USER, LOGOUT_USER } from "../action-creators/authAction";

const initialState = {
  auth: false || localStorage.getItem("token") != null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log("LOGIN_USER");
      return Object.assign({}, state, { auth: true });
    case LOGOUT_USER:
      console.log("LOGOUT_USER");
      return Object.assign({}, state, { auth: false });
    default:
      return state;
  }
}
