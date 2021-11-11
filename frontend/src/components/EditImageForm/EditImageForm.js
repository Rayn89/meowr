import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateImage } from "../../store/imageStore";
import { useHistory } from "react-router-dom";
import "./EditImage.css";

const EditImageForm = ({image}) => {
  const sessionUser = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const [content, setContent] = useState("");
  const [albumId, setAlbumId] = useState(1);
  const [errors, setErrors] = useState([]);

  const updateContent = (e) => setContent(e.target.value);
  const updateAlbum = (e) => setAlbumId(e.target.value);


const handleSubmit = async (e) => {
  e.preventDefault();

  setErrors([]);
  const updated = await dispatch(
    updateImage({ userId: sessionUser, id: image.id, content, albumId })
  ).catch(async (res) => {
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    }
  });
  if (updated) {
    history.push("/images");
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
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <h3>Edit your image</h3>
        <label>Image Name</label>
        <input
          type="text"
          placeholder="Name"
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
        <label className="edit-labels">Album Number</label>
        <input
          type="number"
          placeholder="Album"
          value={albumId}
          onChange={updateAlbum}
        />
        {/* <select onChange={updateType} value={type}>
          {pokeTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select> */}
        <button type="submit">Edit Image</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default EditImageForm;
