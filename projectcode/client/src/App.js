import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Redux
import { Provider } from "react-redux";
import store from "./store";
const App = () => {
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route
            exact
            path="/register"
            element={
              <section className="container">
                <Register />
              </section>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <section className="container">
                <Login />
              </section>
            }
          />
        </Routes>
      </Fragment>
    </Router>
  </Provider>;
};

export default App;
