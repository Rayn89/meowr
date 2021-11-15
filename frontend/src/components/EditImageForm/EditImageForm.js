import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateImage } from "../../store/imageStore";
import { useHistory } from "react-router-dom";
import "./EditImage.css";

const EditImageForm = ({image}) => {
  const sessionUser = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const [content, setContent] = useState("");
  const [albumId] = useState(1);
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState([]);
  const updateContent = (e) => setContent(e.target.value);
//   const updateAlbum = (e) => setAlbumId(e.target.value);


  useEffect(() => {
    let newerrors = [];
    if (content.length < 1) {
      newerrors.push("Please enter a valid Title");
    }


    setErrors(newerrors);
  }, [content]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (errors.length === 0) {
//       const updated = await dispatch(
//         updateImage({ userId: sessionUser, id: image.id, content, albumId })
//       );
//       if (updated) history.push("/images");
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (errors.length === 0) {
    const updated = await dispatch(
      updateImage({ userId: sessionUser, id: image.id, content, albumId })
    );
    if (updated) {
    //   setContent("");
      setDisplayErrors([]);
      history.push("/images");
    }
  } else {
    setDisplayErrors(errors);
  }
};

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('/images')
  };

  return (
    <section className="edit-image-container">
      <form className="edit-image-form" onSubmit={handleSubmit}>
        <ul className="error-list">
          {displayErrors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <h3 className="edit-image-header">Edit your image</h3>
        <div className="edit-image-div">
          {/* <label>Image Name</label> */}
          <input
            type="text"
            placeholder="Image Title"
            value={content}
            onChange={updateContent}
          />

          {/* <label>Image URL</label>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl}
        /> */}
          {/* <label className="edit-labels">Album Number</label>
        <input
          type="number"
          placeholder="Album"
          value={albumId}
          onChange={updateAlbum}
        /> */}
          {/* <select onChange={updateType} value={type}>
          {pokeTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select> */}
          <div className="edit-image-buttons">
            <button type="submit">Edit Image</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditImageForm;
