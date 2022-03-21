import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import PrivateRoute from "../layouts/PrivateRoute";
import Spinner from "../layouts/spinner";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";
const Dashboard = ({ profile, getCurrentProfile, deleteAccount }) => {
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
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                console.log("clicking on delete");
                deleteAccount();
              }}
            >
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
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
  deleteAccount: PropTypes.func.isRequired,
};

// to get the auth state to redirect
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
