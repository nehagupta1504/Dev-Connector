import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
const Dashboard = ({
  auth: { isAuthenticated, loading },
  getCurrentProfile,
}) => {
  return (
    <div>
      {!isAuthenticated && !loading ? (
        <Navigate replace="true" to="/login" />
      ) : (
        <Profile props={{ isAuthenticated, loading, getCurrentProfile }} />
      )}
    </div>
  );
};
const Profile = ({
  props: { isAuthenticated, loading, getCurrentProfile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return <>dashboard;</>;
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

// to get the auth state to redirect
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
