import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import PrivateRoute from "../layouts/PrivateRoute";
import Spinner from "../layouts/spinner";
import DashboardActions from "./DashboardActions";
const Dashboard = ({ getCurrentProfile, profile }) => {
  return (
    <PrivateRoute>
      <Profile props={{ getCurrentProfile, profile }} />
    </PrivateRoute>
  );
};
const Profile = ({
  props: {
    isAuthenticated,
    user,
    getCurrentProfile,
    profile: { loading, profile },
  },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary"> Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.name}</i>
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, Please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

// to get the auth state to redirect
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
