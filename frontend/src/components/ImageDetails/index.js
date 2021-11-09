import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneImage } from "../../store/imageStore";
import EditImageForm from "../EditImageForm/EditImageForm";
// import EditImageForm from "./EditImageForm";


const ImageDetails = () => {
  const { id } = useParams();
  const images = useSelector((state) => state.images);
  const sessionUser = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  // const [showEditImageForm, setShowEditImageForm] = useState(false);
  let content = null;
  if(sessionUser) {
    if(sessionUser.id === images[id].userId)
    content = (
      <EditImageForm image={images[id]} />
    )
  }

  useEffect(() => {
    dispatch(getOneImage(id));
    // setShowEditImageForm(false);
  }, [dispatch, id]);

  return (
    <div className="image-detail">
      <h2>{images[id].content}</h2>
      <img src={images[id].imageUrl} alt=""/>
      {content}
    </div>
  );
};

export default ImageDetails;
