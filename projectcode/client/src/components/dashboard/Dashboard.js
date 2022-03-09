import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = ({ auth: { isAuthenticated, loading } }) => {
  return (
    <div>
      {!isAuthenticated && !loading ? (
        <Navigate replace="true" to="/login" />
      ) : (
        <span>dashboard</span>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
};

// to get the auth state to redirect
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
