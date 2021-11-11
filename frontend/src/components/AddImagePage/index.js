import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage } from "../../store/imageStore";
import { useHistory } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import "./AddImage.css"

const AddImageForm = () => {
  const sessionUser = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [content, setContent] = useState("");
  const [albumId, setAlbumId] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const updateContent = (e) => setContent(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateAlbum = (e) => setAlbumId(e.target.value);


const handleSubmit = async (e) => {
  e.preventDefault();

  setErrors([]);
  const updated = await dispatch(addImage({ userId:sessionUser, content, imageUrl, albumId })).catch(
    async (res) => {
      const data = await res.json();
      if (data.errors){
        setErrors(data.errors);
      }
    }
  );
  if(updated) {
      history.push('/images')
  }
};

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('/images')
  };

  return (
    <section className="add-image-container">
      <form className="add-image-form" onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>Image Name</label>
        <input
          type="text"
          placeholder="Name"
          value={content}
        //   required
          onChange={updateContent}
        />
        <label>Image Url</label>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
        //   required
          onChange={updateImageUrl}
        />
        <label>Album Number</label>
        <input
          type="number"
          placeholder="Album"
          value={albumId}
          onChange={updateAlbum}
        />
        <button type="submit">Add Image</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default AddImageForm;
