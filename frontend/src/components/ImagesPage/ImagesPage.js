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
        content = <NavLink to="/addimage" className="add-image-button">Add Image</NavLink>
    }

  return (
    <div className="imagepage-container">
      <div className="button-add">{content}</div>
      <div className="img-wrapper">
        {images.map((image) => (
          <>
            {image?.content ? (
              <div key={image?.id} className="main-image-box">
                <NavLink
                  key={image?.id}
                  className="display-images"
                  to={`/images/${image?.id}`}
                >
                  <div>
                    <img
                      className="image-square"
                      src={image?.imageUrl}
                      alt=""
                    />
                    <div className="image-content">
                      <p className="image-content-word">{image?.content}</p>
                    </div>
                  </div>
                </NavLink>
                <p className="posted-by-images">
                  post by: {image?.User?.username}
                </p>
              </div>
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
}

export default DisplayImages;
