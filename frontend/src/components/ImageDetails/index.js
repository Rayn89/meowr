import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneImage } from "../../store/imageStore";
import EditImageForm from "../EditImageForm/EditImageForm";
import { deleteImage } from "../../store/imageStore"
import { deleteComment } from "../../store/commentStore";
import { Redirect, useHistory } from "react-router-dom"
import AddCommentForm from "../AddCommentForm"
import "./ImageDetails.css"
import "./CommentDetails.css"


const ImageDetails = () => {
  const { id } = useParams();
  const images = useSelector((state) => state.images);
  const sessionUser = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();


  const handleDelete = (id) => {
    dispatch(deleteImage(id));
  };

  const handleCommentDelete = (key) => {
    dispatch(deleteComment(key))
    history.push(`/images`)
  }

  let content = null;
  let deletebutton = null;
  let addComment = null;
  // let deleteCommentButton = null;

  if(sessionUser) {
    addComment=(
      <AddCommentForm image={images[id]} />
    )
    if(sessionUser.id === images[id]?.userId) {
    content = (
      <EditImageForm image={images[id]} />
    )
    deletebutton = (<button onClick={() => handleDelete(id)}>Delete Image</button>);
    }
    
}

const imageComments = images[id]?.Comments?.map((comment) => {
  if (sessionUser?.id === comment.userId) {
    return (
      <div className="main-comment-box" key={comment.id}>
        <li className="display-comments" key={comment.id}>
          {comment.comment}
          <p className="posted-by">Posted by: {comment.User?.username}</p>
          <button onClick={() => handleCommentDelete(comment.id)}>
            Delete
          </button>
        </li>
      </div>
    );
  } else {
    return (
      <div className="main-comment-box" key={comment.id}>
        <li className="display-comments" key={comment.id}>
          {comment.comment}
          <p className="posted-by">Posted by: {comment.User?.username}</p>
        </li>
      </div>
    );
  }
});

  useEffect(() => {
    dispatch(getOneImage(id))
  }, [dispatch, id]);

  if(!images[id]) {
    return <Redirect to="/images" />
  }

  return (
    <div className="image-detail-container">
      <h2 className="details-header">{images[id]?.content}</h2>
      <img className="image-detail" src={images[id]?.imageUrl} alt="" />
      <p>Posted by: {images[id].User?.username}</p>
      {content}
      {deletebutton}
      <h2 className="comments-header">Comments</h2>
      <div className="comments-container">
        {imageComments}
        {/* {images[id]?.Comments?.map((comment) => (
          <div className="main-comment-box" key={comment.id}>
            <li className="display-comments" key={comment.id}>
              {comment.comment}
              <button onClick={() => handleCommentDelete(comment.id)}>
                Delete
              </button>
            </li>
          </div>
        ))} */}
      </div>
      {addComment}
    </div>
  );
};

export default ImageDetails;
