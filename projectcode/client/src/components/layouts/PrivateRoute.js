import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ auth: { loading, isAuthenticated }, children }) => {
  return !loading && isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace="true" />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(PrivateRoute);
