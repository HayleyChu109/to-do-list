import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { loginUserThunk } from "../Redux/action-creators/authAction";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("Frontend login", email, password);

  let dispatch = useDispatch();
  let history = useHistory();

  let authenticated = useSelector((state) => state.authStore.auth);

  useEffect(() => {
    if (authenticated) {
      history.push("/todolist");
    }
  }, [authenticated, history]);

  const login = (event) => {
    event.preventDefault();
    dispatch(loginUserThunk(email, password));
  };

  return (
    <Form>
      <h2 className="mt-5 mb-3 loginTitle">LOGIN</h2>
      <Form.Group className="mb-3" controlId="loginFormBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginFormBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <button
        className="btn-orange"
        type="submit"
        value="submit"
        onClick={login}
      >
        Login
      </button>
    </Form>
  );
}
