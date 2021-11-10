import React, { useEffect } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getImages } from '../../store/imageStore'
import "./ImagesPage.css"

function DisplayImages() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
    const imagesObj = useSelector((state) => state.images);
    const images = Object.values(imagesObj)

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  let content=null;

    if (sessionUser) {
        content = <NavLink to="/addimage">Add Image</NavLink>
    }

  return (
    <div className="imagepage-container">
      <div className="img-wrapper">
        {images.map((image) => (
          <NavLink className="display-images" key={image.id} to={`/images/${image.id}`}>
            <div>
              <img
                className="image-square"
                key={image.id}
                src={image.imageUrl}
                alt=""
              />
            </div>
          </NavLink>
        ))}
      </div>
      {content}
    </div>
  );
}

export default DisplayImages;
