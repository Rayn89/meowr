import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateImage } from "../../store/imageStore";
import { useHistory } from "react-router-dom";
// import "./AddImage.css";

const EditImageForm = ({image}) => {
  const sessionUser = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(image.id)

  const [content, setContent] = useState("");
  const [albumId, setAlbumId] = useState(1);
  const [imageUrl, setImageUrl] = useState("");

  const updateContent = (e) => setContent(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateAlbum = (e) => setAlbumId(e.target.value);

  //   useEffect(() => {
  //     dispatch(getPokemonTypes());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     if (pokeTypes.length && !type) {
  //       setType(pokeTypes[0]);
  //     }
  //   }, [pokeTypes, type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: image.id,
      userId: sessionUser,
      content,
      imageUrl,
      albumId,
    };
    dispatch(updateImage(payload));
    console.log(image.id, sessionUser.id, albumId)
    history.push(`/images`);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    // hideForm();
  };

  return (
    <section className="add-image-container">
      <form className="add-image-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={content}
          onChange={updateContent}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl}
        />
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
        <button type="submit">Add Image</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default EditImageForm;
