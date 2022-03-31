import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import PropTypes from "prop-types";
import PrivateRoute from "../layouts/PrivateRoute";
const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    posttitle: "",
    text: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({ posttitle: "", text: "" });
  };
  const { posttitle, text } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <PrivateRoute>
      <div className="post-form">
        <div className="post-form-header bg-primary">
          <h3>Say Something..</h3>
        </div>
        <form className="form my-1" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              name="posttitle"
              value={posttitle}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              cols="30"
              rows="5"
              placeholder="Create a post"
              name="text"
              value={text}
              onChange={onChange}
              required
            ></textarea>
          </div>
          <input type="submit" value="Submit" className="btn btn-dark my-1" />
        </form>
      </div>
    </PrivateRoute>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
