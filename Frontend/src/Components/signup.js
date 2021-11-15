import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUserThunk } from "../Redux/action-creators/authAction";
import { Form } from "react-bootstrap";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("Frontend signup", name, email, password);

  const dispatch = useDispatch();
  const signup = () => {
    dispatch(signupUserThunk(name, email, password));
  };

  return (
    <Form>
      <h2 className="mt-5 mb-3 loginTitle">SIGNUP A NEW ACCOUNT</h2>
      <Form.Group className="mb-3" controlId="signupFormBasicUsername">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupFormBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupFormBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <button
        className="btn-orange"
        type="submit"
        value="submit"
        onClick={signup}
      >
        Sign up
      </button>
    </Form>
  );
}
