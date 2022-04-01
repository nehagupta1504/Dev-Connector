import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeComment } from "../../actions/post";
import PrivateRoute from "../layouts/PrivateRoute";
import Moment from "react-moment";
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  removeComment,
}) => {
  return (
    <>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              src="https://www.gravatar.com/avatar/8d64a9f7148fd270b29720266b4e6d91?s=200"
              alt=""
              className="round-img"
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {!auth.loading && user === auth.user._id && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                removeComment(postId, _id);
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  removeComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { removeComment })(CommentItem);
