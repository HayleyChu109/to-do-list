import React from "react";
import Login from "../Components/login";
import Signup from "../Components/signup";
import "../stylesheet/login.css";

export default function LoginPage() {
  return (
    <div className="loginPage">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mt-5">
            <Login />
          </div>
          <div className="col-lg-6 mt-5">
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}
