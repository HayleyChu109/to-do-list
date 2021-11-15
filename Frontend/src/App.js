import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";

const PrivateRouter = ({ component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.authStore.auth);
  console.log(isAuthenticated);
  const Component = component;
  if (Component != null) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  } else {
    return null;
  }
};

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <PrivateRouter path="/todolist" component={HomePage} />
    </Switch>
  );
}

export default App;
