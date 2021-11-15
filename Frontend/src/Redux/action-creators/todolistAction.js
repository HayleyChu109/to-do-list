import axios from "axios";
import jwt_decode from "jwt-decode";

export const GET_INFO = "GET_INFO";
export const GET_LIST = "GET_LIST";
export const ADD_LIST = "ADD_LIST";
export const EDIT_LIST = "EDIT_LIST";
export const DELETE_LIST = "DELETE_LIST";

export const getUserInfoThunk = () => {
  console.log("Get User Thunk");
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let decodedToken = jwt_decode(token).id;
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/username/${decodedToken}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_INFO,
          payload: res.data[0].name,
        });
      });
  };
};

export const getListThunk = () => {
  console.log("Get List Thunk");
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let decodedToken = jwt_decode(token).id;
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/todolist/${decodedToken}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_LIST,
          payload: res.data,
        });
      });
  };
};

export const addListThunk = (todolist) => {
  console.log("Add new list");
  console.log(todolist);
  return (dispatch) => {
    let token = localStorage.getItem("token");
    let decodedToken = jwt_decode(token).id;
    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/todolist/${decodedToken}`,
        { list: todolist },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: ADD_LIST,
          payload: res.data[0],
        });
      });
  };
};

export const editListThunk = (listId, editedList) => {
  console.log("Edit list");
  console.log(listId, editedList);
  return (dispatch) => {
    let token = localStorage.getItem("token");
    axios
      .put(
        `${process.env.REACT_APP_API_SERVER}/todolist/${listId}`,
        {
          editedList: editedList,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: EDIT_LIST,
          payload: res.data[0],
        });
      });
  };
};

export const deleteListThunk = (listId) => {
  console.log("Delete list");
  console.log(listId);
  return (dispatch) => {
    let token = localStorage.getItem("token");
    axios
      .delete(`${process.env.REACT_APP_API_SERVER}/todolist/${listId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: DELETE_LIST,
          payload: res.data,
        });
      });
  };
};
