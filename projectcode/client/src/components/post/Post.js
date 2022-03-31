import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/spinner";
import { getPost } from "../../actions/post";
import PrivateRoute from "../layouts/PrivateRoute";
import { useParams, Link } from "react-router-dom";
import PostItem from "../posts/PostItem";
const Post = ({ post: { post, loading }, getPost }) => {
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);
  return (
    <PrivateRoute>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <>
          <Link to="/posts" className="btn">
            Back to Post
          </Link>
          <PostItem post={post} showActions={false} />
        </>
      )}
    </PrivateRoute>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post,
  };
};
export default connect(mapStateToProps, { getPost })(Post);
