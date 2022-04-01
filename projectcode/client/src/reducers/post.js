import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from "../actions/constants";
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) => {
          return post._id === payload.postId
            ? { ...post, likes: payload.likes }
            : post;
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== payload.id;
        }),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter((comment) => {
            console.log("commentid ", comment._id, "payload", payload);
            return comment._id !== payload;
          }),
        },
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
}
