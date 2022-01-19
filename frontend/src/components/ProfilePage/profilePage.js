import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./profilePage.css";
import { getImages } from "../../store/imageStore";


function ProfilePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const images = useSelector((state) => state.images);

  let imagesArr;
  if(images){
      imagesArr = Object.values(images)
  }
  let imageList;
  if(imagesArr){ 
  imageList = imagesArr.filter((pic) => pic.userId === user.id)
  }
  let userId;
  if(user){
      userId = user.id
  }
//   const allUsers = useSelector((state) => state.session.allUsers);

//   const userPosts = useSelector((state) => state.postStore.userPosts);
//   let userPostsArr;
//   if (userPosts) {
//     userPostsArr = Object.values(userPosts);
//   }

//   let userId;
//   if (user) {
//     userId = user.id;
//   }

//   let profileUser;
//   if (user) {
//     const profileUserIndex = user.users.findIndex((dict) => dict.id == id);
//     profileUser = allUsers.users[profileUserIndex];
//   }

  // Like post function
//   const handleFollow = async () => {
//     const followerId = user.id; // Michelle
//     const followedId = id; // Charles
//     await dispatch(postStore.thunk_followUser({ followerId, followedId }));
//     await dispatch(sessionStore.authenticate());
//     await dispatch(sessionStore.thunk_getAllUsers());
//   };


  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);
  
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/images");
    };

  return (
    <>
      <div className="header1">
        <h1>{user.username}</h1>
        <div className="user-posts-images-container">
          {imageList &&
            imageList?.map((post) => (
              <img
                onClick={() => history.push(`/posts/${post.id}`)}
                key={post?.id}
                className="user-posts-images"
                src={post?.imageUrl}
                alt=""
              />
            ))}
        </div>
        <button className="profile-button" onClick={logout}>
          Log Out
        </button>
      </div>
      {/* <div className="userInfo-container">
            <div className="userInfo-stats-container">
            <div className="userInfo-stats-header">
                <img className="profilePhoto" src={profileUser?.photoURL} alt="" />
                <div className="profile-user-name">{profileUser?.name}</div>
                {user?.followers.includes(profileUser?.id) ? (
                <button
                    onClick={() => handleFollow()}
                    className="following-button"
                >
                    Following
                </button>
                ) : (
                <button onClick={() => handleFollow()} className="follow-button">
                    Follow
                </button>
                )}
                <LogoutButton />
            </div>
            <ul className="user-stats">
                <li className="stats-li stats-li-left">
                <div className="stats-count">{userPosts?.length}</div>
                <div>Posts</div>
                </li>
                <li className="stats-li stats-li-center">
                <div className="stats-count">{profileUser?.following.length}</div>
                <div>Followers</div>
                </li>
                <li className="stats-li stats-li-right">
                <div className="stats-count">{profileUser?.followers.length}</div>
                <div>Following</div>
                </li>
            </ul>
            <div className="horizontal-line"></div>
            </div>
        </div>
        <div className="user-posts">
            <div className="user-posts-images-container">
            {userPostsArr &&
                userPostsArr.map((post) => (
                <img
                    onClick={() => history.push(`/posts/${post.id}`)}
                    key={post.id}
                    className="user-posts-images"
                    src={post.photoURL}
                    alt=""
                />
                ))}
            </div>
        </div> */}
    </>
  );
}

export default ProfilePage;
