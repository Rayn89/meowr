export const LOAD_IMAGES = "images/loadImages";
export const ADD_ONE_IMAGE = "images/addOneImage"

const load = (images) => ({
  type: LOAD_IMAGES,
  images,
});

const addOneImage = (payload) => {
  return {
    type: ADD_ONE_IMAGE,
    payload,
  };
};

export const getImages = () => async (dispatch) => {
  const response = await fetch(`/api/images`);
  const images = await response.json();
  dispatch(load(images));
};

export const addImage = (image) => async (dispatch) => {
  const response = await fetch("/api/images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(image),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addOneImage(data.image));
  }
};

const initialState = {};

const imagesReducer = (state = initialState, action) => {
    let newState={}
  switch (action.type) {
    case LOAD_IMAGES: {
      const newState = { ...state };
      action.images.forEach((image) => {
        newState[image.id] = image;
      });
      return newState;
    }
    case ADD_ONE_IMAGE:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    default:
      return state;
  }
};

export default imagesReducer;