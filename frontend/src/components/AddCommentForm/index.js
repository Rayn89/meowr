import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/commentStore";
import { useHistory } from "react-router-dom";
import "./AddComment.css"


const AddCommentForm = ({image}) => {
//   const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState("");
  const [albumId] = useState(1);
//   const [imageId, setImageId] = useState("");
  const [errors, setErrors] = useState([]);

  const updateComment = (e) => setComment(e.target.value);
//   const updateImageUrl = (e) => setImageId(e.target.value);

  useEffect(() => {
    let newerrors = [];
    if (comment.length < 1 || comment.length > 50) {
      newerrors.push("Comment must be between 1-50 characters");
    }

    setErrors(newerrors);
  }, [comment]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (errors.length === 0) {
//       const updated = await dispatch(
//         addComment({ userId: sessionUser, comment, imageId:image.id, albumId })
//       );
//       if (updated) setComment('');
//     }
//   };

const [displayErrors, setDisplayErrors] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (errors.length === 0) {
    const updated = await dispatch(
      addComment({ userId: sessionUser, comment, imageId: image.id, albumId })
    );
    if (updated) {
        setComment('');
        setDisplayErrors([])
        }
  } else {
    setDisplayErrors(errors);
  }
};


  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/images");
  };

  return (
    <section className="add-comment-container">
      <form className="add-comment-form" onSubmit={handleSubmit}>
        <ul className="error-list">
          {displayErrors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        {/* <label>Post Comment</label> */}
        <input
          className="comment-input"
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={updateComment}
        />
        <div>
        <button className="web-button" type="submit">
          Submit
        </button>
        <button
          className="web-button"
          type="button"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
        </div>
      </form>
    </section>
  );
};

export default AddCommentForm;
