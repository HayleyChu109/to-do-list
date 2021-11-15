import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Form } from "react-bootstrap";
import {
  getUserInfoThunk,
  getListThunk,
  addListThunk,
  editListThunk,
  deleteListThunk,
} from "../Redux/action-creators/todolistAction";
import { logoutThunk } from "../Redux/action-creators/authAction";

export default function Home() {
  const [todolist, setTodolist] = useState("");
  const [editedList, setEditedList] = useState("");
  const [search, setSearch] = useState("");

  const usernameFromStore = useSelector(
    (state) => state.todolistStore.username
  );
  const todolistFromStore = useSelector(
    (state) => state.todolistStore.todolist
  );

  const filterTodolistFromStore = (search) => {
    const searchItem = search.toLowerCase();
    return todolistFromStore.filter((list) => {
      return list.content.toLowerCase().includes(searchItem);
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfoThunk());
    dispatch(getListThunk());
  }, [dispatch]);

  const addList = (event) => {
    event.preventDefault();
    if (todolist.length > 0) {
      dispatch(addListThunk(todolist));
    }
    setTodolist("");
  };

  const editList = (event, listId) => {
    event.preventDefault();
    if (editedList.length > 0) {
      dispatch(editListThunk(listId, editedList));
    }
  };

  const deleteList = (event, listId) => {
    dispatch(deleteListThunk(listId));
  };

  const logout = () => {
    dispatch(logoutThunk());
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container fluid>
          <h1 className="mainTitle ms-5 mt-2">TO DO LIST</h1>
          <button className="btn-orange me-5" onClick={logout}>
            Logout
          </button>
        </Container>
      </Navbar>

      <h2 className="text-center mt-5 mb-3">
        Welcome back, {usernameFromStore}
      </h2>
      <Form className="d-flex justify-content-center mb-4">
        <div className="me-3">
          <Form.Group controlId="todolist">
            <Form.Control
              className="addListInput"
              type="text"
              value={todolist}
              onChange={(event) => setTodolist(event.target.value)}
            />
          </Form.Group>
        </div>
        <div>
          <button
            className="btn-orange"
            type="submit"
            onClick={(event) => addList(event)}
          >
            Add your list
          </button>
        </div>
      </Form>
      <hr className="separateLine" />

      <div className="d-flex align-items-center justify-content-center mt-4">
        <h4 className="me-4 mt-2">Search for:</h4>
        <input
          className="searchInput p-1"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="mt-5">
        {filterTodolistFromStore(search).map((list) => {
          return (
            <div key={list.id} className="d-flex justify-content-center">
              <div className="me-2 mb-3">
                <input
                  className="listInput p-1"
                  id={list.id}
                  type="text"
                  defaultValue={list.content}
                  onChange={(event) => setEditedList(event.target.value)}
                  onBlur={(event) => {
                    editList(event, list.id);
                  }}
                />
              </div>
              <div>
                <i
                  className="fas fa-trash-alt fa-2x"
                  style={{ cursor: "pointer" }}
                  onClick={(event) => deleteList(event, list.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
