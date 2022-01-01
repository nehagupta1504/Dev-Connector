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
import Alert from "./components/layouts/alert";
// Redux
import { Provider } from "react-redux";
import store from "./store";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/" element={<Landing />} />

              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/login"
                element={
                  <section>
                    <Login />
                  </section>
                }
              />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
