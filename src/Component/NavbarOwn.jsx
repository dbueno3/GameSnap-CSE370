import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { FaUserFriends } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

import homeIcon from '../assets/home.svg';
import searchIcon from '../assets/search.svg';
import addIcon from '../assets/add.svg';
import messageIcon from '../assets/message.svg';

const NavbarOwn = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [proPic, setPropic] = useState("");
  
  useEffect(() => {
    //Get the user
    fetch(process.env.REACT_APP_API_PATH + `/users/${sessionStorage.getItem("user")}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          let info = result.attributes;
          setPropic(info.profilePicture);
        }
      });
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <Link to="/home" className={`navbar-item ${isActive("/home")}`}>
        <img
          className="bottombar__icon"
          src={homeIcon || 'https://via.placeholder.com/20'}
          alt="Home"
        />
        <span>Home</span>
      </Link>
      <Link to="/explore" className={`navbar-item ${isActive("/explore")}`}>
        <img
          className="bottombar__icon"
          src={searchIcon || 'https://via.placeholder.com/20'}
          alt="explore"
        />
        <span>Explore</span>
      </Link>

      <Link to="/friends" className={`navbar-item ${isActive("/friends")}`}>
        <FaUserFriends
          color={"black"}
          className="bottombar__icon"
        />
        <span>Friends</span>
      </Link>

      <Link to="/create_post" className={`navbar-item ${isActive("/create_post")}`}>
        <img
          className="bottombar__icon"
          src={addIcon || 'https://via.placeholder.com/20'}
          alt="Create Post"
        />
        <span>Post</span>
      </Link>

      <Link to="/chat" className={`navbar-item ${isActive("/chat")}`}>
        <img
          className="bottombar__icon"
          src={messageIcon || 'https://via.placeholder.com/20'}
          alt="Chat"
        />
        <span>Chat</span>
      </Link>

      <Link to="/profile" className={`navbar-item ${isActive("/profile")}`}>
        <img
          src={proPic}
          className="bottombar__icon"
          alt="profile"
          style={{ cursor: "pointer", verticalAlign: "middle" }}
          onClick={() => {
            navigate("/edit_profile_mobile");
          }}
        />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default NavbarOwn;
