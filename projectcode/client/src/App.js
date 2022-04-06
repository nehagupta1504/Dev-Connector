import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
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
          {/* <section className="container"> */}
          <Alert />

          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route
              exact
              path="/register"
              element={
                <Container>
                  {" "}
                  <Register />
                </Container>
              }
            />
            <Route
              exact
              path="/login"
              element={
                <Container>
                  <Login />
                </Container>
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                <Container>
                  <Dashboard />
                </Container>
              }
            />
            <Route
              exact
              path="/create-profile"
              element={
                <Container>
                  {" "}
                  <CreateProfile />
                </Container>
              }
            />
            <Route
              exact
              path="/edit-profile"
              element={
                <Container>
                  <EditProfile />
                </Container>
              }
            />
            <Route
              exact
              path="/add-experience"
              element={
                <Container>
                  <AddExperience />
                </Container>
              }
            />
            <Route
              exact
              path="/add-education"
              element={
                <Container>
                  <AddEducation />
                </Container>
              }
            />
            <Route
              exact
              path="/profiles"
              element={
                <Container>
                  <Profiles />
                </Container>
              }
            />
            <Route
              exact
              path="/profile/:id"
              element={
                <Container>
                  <Profile />
                </Container>
              }
            />
            <Route
              exact
              path="/posts"
              element={
                <Container>
                  <Posts />
                </Container>
              }
            />
            <Route
              exact
              path="/posts/:id"
              element={
                <Container>
                  <Post />
                </Container>
              }
            />
          </Routes>
          {/* </section> */}
        </Fragment>
      </Router>
    </Provider>
  );
};

const Container = ({ children }) => {
  return <section className="container">{children}</section>;
};

export default App;
