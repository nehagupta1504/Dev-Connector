import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layouts/spinner";
import PrivateRoute from "../layouts/PrivateRoute";
import PostItem from "./PostItem";
const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <PrivateRoute>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community
          </p>
          {/* Post Form */}
          <div className="posts">
            {posts.map((post) => {
              return <PostItem key={post._id} post={post} />;
            })}
          </div>
        </>
      )}
    </PrivateRoute>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};
export default connect(mapStateToProps, { getPosts })(Posts);
