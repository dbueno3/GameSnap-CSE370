import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = ({ user }) => {
  return (
    // <div className="header">
    //   <div className="center"><p class="bold">{user.username}</p></div>
    //   <div className="header__user">
    //     <div className="header__userProfile">
    //       <img
    //         className="header__userProfilePic"
    //         src={user.profilePic}
    //         alt="Profile"
    //       />
    //       <div className="header__userProfileName">
    //         <p>{user.name}</p>
    //       </div>
    //       <p class="small-text">{user.bio}</p>
    //     </div>
    //     <div className="header__userInfo">
    //       <div className="header__userInfoStats">
    //         <div className="header__userInfoStatsPosts">
    //           <h2>{user.posts.length}</h2>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="editProfilerow">
    //     <Link to="/settings">
    //       <button className="header__editProfileBtn">
    //         Edit Profile
    //       </button>
    //     </Link>
    //   </div>
    // </div>
    <div className="header">
      <div className="top-div">
        <div className="center"><p class="bold">{user.username}</p></div>
        {/* <div className="right"><img src="./assets/help.svg"/></div> */}
      </div>
      <div className="header__user">
        <div className="header__userProfile">
          <div className="header__userProfilePicContainer">
            <img
              className="header__userProfilePic"
              src={user.profilePic}
              alt="Profile"
            />
          </div>
          <div className="header__userProfileName">
            <p>{user.name}</p>
          </div>
          <p className="small-text">{user.bio}</p>
        </div>
        <div className="header__userInfo">
          <div className="header__userInfoStats">
            <div className="header__userInfoStatsPosts">
              <h1>{user.posts.length}</h1>
              <p className="small-text">posts</p>
            </div>
            <div className="header__userInfoStatsFollowers">
              <h1>{user.followers}</h1>
              <p className="small-text">followers</p>
            </div>
            <div className="header__userInfoStatsFollowing">
              <h1>{user.following}</h1>
              <p className="small-text">following</p>
            </div>
          </div>
        </div>
      </div>
      <div className="editProfilerow">
        <Link to="/settings">
          <button className="header__editProfileBtn">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};


export default Header;