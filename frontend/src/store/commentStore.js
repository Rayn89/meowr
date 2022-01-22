import { csrfFetch } from "./csrf";

export const LOAD_COMMENTS = "comments/loadComments";
export const ADD_COMMENT = "comments/ADD_COMMENT";
export const REMOVE_COMMENT = "comments/REMOVE_COMMENT"

const add = (comment) => (
    {
    type: ADD_COMMENT,
    comment,
    }
);

const removeComment = (id) => ({
  type: REMOVE_COMMENT,
  payload: id,
});

export const addComment = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(add(comment));
    return comment;
  }
};

export const deleteComment = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${id}`, {
    method: "delete",
  });

  if (response.ok) {
    // const image = await response.json();
    // dispatch(removeComment(id));
  }
};

export const editComment =
  ({ commentId, comment, userId, imageId }) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId,
        comment,
        userId,
        imageId
      }),
    });

  if (res.ok) {

  }
  };



const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case ADD_COMMENT:
      newState = { ...state, [action.comment.id]: action.comment };
      return newState;
    case REMOVE_COMMENT: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
};

export default commentsReducer;
