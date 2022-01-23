import { useState ,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneImage } from "../../store/imageStore";
import EditImageForm from "../EditImageForm/EditImageForm";
import { deleteImage } from "../../store/imageStore"
import { deleteComment } from "../../store/commentStore";
import { editComment } from "../../store/commentStore"
import { getImages } from "../../store/imageStore";
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
  const [editedComment, setEditedComment] = useState("");
  const [editCommentId, setEditCommentId] = useState("");
  const [editSelected, setEditSelected] = useState([false, null]);


  const handleDelete = (id) => {
    dispatch(deleteImage(id));
  };

  const handleCommentDelete = async(key) => {
    await dispatch(deleteComment(key))
    await dispatch(getOneImage(id))
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
    deletebutton = (<button className="image-delete" onClick={() => handleDelete(id)}>Delete Image</button>);
    }
    
}

 let commentEdit = (
   <div className="edit-review-container">
     <textarea
       id="review-edit-input"
       type="text"
       value={editedComment}
       onChange={(e) => setEditedComment(e.target.value)}
       placeholder=""
     ></textarea>
     <span>
       <button
         id="edit-review-submit"
         onClick={() => editCommentClick(editCommentId, editedComment)}
       >
         Update
       </button>
     </span>
   </div>
 );

  const editCommentClick = async () => {
    let commentId = editCommentId;
    let comment = editedComment;
    let imageId = id
    let userId = sessionUser.id
    if (editedComment) {
      await dispatch(editComment({ commentId, comment, imageId, userId }));
      await dispatch(getOneImage(id));
    }
    setEditSelected([false, null]);
  };

const imageComments = images[id]?.Comments?.map((comment) => {
  if (sessionUser?.id === comment.userId) {
    return (
      <div className="main-comment-box" key={comment.id}>
        <div className="display-comments" key={comment.id}>
          <div className="review-contents">
            {editSelected[0] && editSelected[1] == comment.id
              ? commentEdit
              : comment?.comment}
          </div>
          <div className="posted-delete">
            <p className="posted-by">Posted by: {comment.User?.username}</p>
            <div>
              <button
                className="comment-buttons"
                onClick={() => {
                  setEditedComment(comment.comment);
                  setEditCommentId(comment.id);
                  setEditSelected([!editSelected[0], comment.id]);
                }}
              >
                Edit
              </button>
              <button
                className="comment-buttons"
                onClick={() => handleCommentDelete(comment.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
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
      {/* <div className="inner-container"> */}
      <div className="image-and-comments">
        <h2 className="details-header">{images[id]?.content}</h2>
        <img className="image-detail" src={images[id]?.imageUrl} alt="" />
        <div className="posted-delete">
          Posted by: {images[id].User?.username}
          {deletebutton}
        </div>
        {content}
      </div>
      <div className="scroll-comments">
        <h2 className="comments-header">Comments</h2>
        <div className="comments-container">{imageComments}</div>
        {addComment}
      </div>
      {/* </div> */}
    </div>
  );
};

export default ImageDetails;
