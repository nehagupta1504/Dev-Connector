import axios from "axios";
import { setAlert } from "./alert";

import {
  CLEAR_PROFILE,
  EXPERIENCE_DELETED,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
} from "./constants";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statustext,
        status: err.response.status,
      },
    });
  }
};

// Create or update a profile
// history to navigate to previous page
// edit if true then updating if false then creating

export const createProile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
      if (!edit) {
        navigate("/dashboard");
      }
    } catch (err) {
      const error = err.response.data.errors;

      if (error.length > 0) {
        error.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statustext,
          status: err.response.status,
        },
      });
    }
  };

// Add Experience update profile
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Added", "success"));
    navigate("/dashboard");
  } catch (err) {
    const error = err.response.data.errors;

    if (error.length > 0) {
      error.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statustext,
        status: err.response.status,
      },
    });
  }
};
// Add Education update profile
export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success"));
    navigate("/dashboard");
  } catch (err) {
    const error = err.response.data.error;
    if (error.length > 0) {
      error.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statustext,
        status: err.response.status,
      },
    });
  }
};

// to delete an experience
export const deleteExperience = (expId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${expId}`);
    console.log(res.data);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statustext,
        status: err.response.status,
      },
    });
  }
};
// to delete an education
export const deleteEducation = (eduId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${eduId}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statustext,
        status: err.response.status,
      },
    });
  }
};

// to delete an account
export const deleteAccount = () => async (dispatch) => {
  console.log("In delete account");
  // if (window.confirm("Are you sure? This can't be undone")) {
  //   try {
  //     const res = await axios.delete(`/api/profile`);
  //     dispatch({
  //       type: CLEAR_PROFILE,
  //     });
  //     dispatch({
  //       type: ACCOUNT_DELETED,
  //     });
  //     dispatch(setAlert("Your account has been permenantly deleted"));
  //   } catch (err) {
  //     dispatch({
  //       type: PROFILE_ERROR,
  //       payload: {
  //         msg: err.response.statustext,
  //         status: err.response.status,
  //       },
  //     });
  //   }
  // }
};
