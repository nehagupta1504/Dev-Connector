import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/spinner";
import { addComment } from "../../actions/post";
import PrivateRoute from "../layouts/PrivateRoute";
const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, text);
    setText("");
  };
  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <textarea
            cols="30"
            rows="3"
            placeholder="Add Comment"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <input type="submit" value="Submit" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
