import { csrfFetch } from "./csrf";
// import { LOAD_COMMENTS } from "./commentStore"
export const LOAD_IMAGES = "images/loadImages";
export const ADD_ONE_IMAGE = "images/addOneImage";
export const REMOVE_IMAGE = "items/REMOVE_IMAGE";
const ADD_COMMENT = "comments/ADD_COMMENT";

const load = (images) => ({
  type: LOAD_IMAGES,
  images,
});

const addOneImage = (image2) => ({
    type: ADD_ONE_IMAGE,
    payload: image2,
});

const remove = (id) => ({
  type: REMOVE_IMAGE,
  payload: id,
});

export const getImages = () => async (dispatch) => {
  const response = await csrfFetch(`/api/images`);
  const images = await response.json();
  dispatch(load(images));
};

export const addImage = (image2) => async (dispatch) => {
  console.log("REQ BODY ===========>");
  const { userId, image, content, albumId } = image2;
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("content", content);
  formData.append("albumId", albumId);
  if (image) formData.append("image", image);
  

  const response = await csrfFetch("/api/images/addimage/", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

    const data = await response.json();
    dispatch(addOneImage(data.image2));
    return data.image2
};

export const getOneImage = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${id}`);
  if (response.ok) {
    const image = await response.json();
    dispatch(addOneImage(image));
  }
};

export const updateImage = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${data.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const image = await response.json();
    dispatch(addOneImage(image));
    return image;
  }
};

export const deleteImage = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${id}`, {
    method: "delete",
  });

  if (response.ok) {
    // const image = await response.json();
    dispatch(remove(id));
  }
};

const initialState = {};

const imagesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_IMAGES: {
      const newState = { ...state };
      action.images.forEach((image) => {
        newState[image.id] = image;
      });
      return newState;
    }
    case ADD_ONE_IMAGE:
      newState = { ...state, [action.payload?.id]: action.payload };
      return newState;
    case REMOVE_IMAGE: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case ADD_COMMENT: {
        const newState = {...state}
        if(!newState[action.comment.imageId].Comments){
            newState[action.comment.imageId].Comments = [];
        }
        newState[action.comment.imageId].Comments?.push(action.comment)
        return newState;
    }
    default:
      return state;
  }
};

export default imagesReducer;
