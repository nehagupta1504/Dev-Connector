import React, { Fragment, useEffect } from "react";
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
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
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
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/create-profile" element={<CreateProfile />} />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
