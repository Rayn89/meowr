import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage } from "../../store/imageStore";
import { useHistory } from "react-router-dom";
import isURL from "validator/lib/isURL";
import "./AddImage.css"

const AddImageForm = () => {
  const sessionUser = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [content, setContent] = useState("");
  const [albumId] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const updateContent = (e) => setContent(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
//   const updateAlbum = (e) => setAlbumId(e.target.value);


  useEffect(() => {
    let newerrors = [];
    if (content.length < 1) {
      newerrors.push("Please enter a valid Title");
    }
    if (!isURL(imageUrl)) {
      newerrors.push("Please enter a valid Image URL");
    }

    setErrors(newerrors);
  }, [content, imageUrl])

// const handleSubmit = async (e) => {
//   e.preventDefault();
    
//     if(errors.length === 0){
//         const updated = await dispatch(
//           addImage({ userId: sessionUser, content, imageUrl, albumId })
//         );
//         if(updated) history.push('/images')
//         }
//     }

    const [displayErrors, setDisplayErrors] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (errors.length === 0) {
        const updated = await dispatch(
          addImage({
            userId: sessionUser,
            content,
            imageUrl,
            albumId,
          })
        );
        if (updated) {
        //   setComment("");
          setDisplayErrors([]);
          history.push("/images")
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
    <section className="add-image-container">
      <form className="add-image-form" onSubmit={handleSubmit}>
        <ul className="error-list">
          {displayErrors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>Image Name</label>
        <input
          type="text"
          placeholder="Name"
          value={content}
          onChange={updateContent}
        />
        <label>Image Url</label>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl}
        />
        {/* <label>Album Number</label>
        <input
          type="number"
          placeholder="Album"
          value={albumId}
          onChange={updateAlbum}
        /> */}
        <button type="submit">Add Image</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default AddImageForm;
