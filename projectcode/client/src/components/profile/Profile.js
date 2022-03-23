import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/spinner";
import { getProfileById } from "../../actions/profile";
import { useParams, Link } from "react-router-dom";
const Profile = ({ auth, profile: { profile, loading }, getProfileById }) => {
  const { id } = useParams();
  useEffect(() => {
    // To get the id of the page which we are having in url
    console.log(id);
    getProfileById(id);
  }, [id, getProfileById]);
  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profile
          </Link>
          {auth.isAuthenticated &&
            !auth.loading &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { getProfileById })(Profile);
