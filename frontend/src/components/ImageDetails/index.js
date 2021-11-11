import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneImage } from "../../store/imageStore";
import EditImageForm from "../EditImageForm/EditImageForm";
import { deleteImage } from "../../store/imageStore"
import { Redirect } from "react-router-dom"
// import EditImageForm from "./EditImageForm";
import "./ImageDetails.css"


const ImageDetails = () => {
  const { id } = useParams();
  // const [showForm, setShowForm] = useState('false')
  const images = useSelector((state) => state.images);
  const sessionUser = useSelector((state) => state.session.user)
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteImage(id));
  };

  let content = null;
  let deletebutton = null;
  if(sessionUser) {
    if(sessionUser.id === images[id]?.userId) {
    content = (
      <EditImageForm image={images[id]} />
    )
    deletebutton = (<button onClick={() => handleDelete(id)}>Delete</button>);
    }
  }

  useEffect(() => {
    dispatch(getOneImage(id));
  }, [dispatch, id]);

  if(!images[id]) {
    return <Redirect to="/images" />
  }

  return (
    <div className="image-detail-container">
      <h2 className="details-header">{images[id]?.content}</h2>
      <img className="image-detail" src={images[id]?.imageUrl} alt="" />
      <p>Posted by: {images[id].User.username}</p>
      {content}
      {deletebutton}
    </div>
  );
};

export default ImageDetails;
