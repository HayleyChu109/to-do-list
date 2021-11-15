import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const signupUserThunk = (name, email, password) => {
  console.log("Signup User Thunk", name, email, password);
  return () => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/signup`, {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
      });
  };
};

export const loginUserThunk = (email, password) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/login`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data === null) {
          console.log("Login failed");
        } else {
          console.log("Login success");
          console.log(res.data);
          localStorage.setItem("token", res.data);
          dispatch({ type: LOGIN_USER });
        }
      });
  };
};

export const logoutThunk = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT_USER,
  });
};
