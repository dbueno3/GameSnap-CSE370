import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { CiBitcoin } from "react-icons/ci";
import { MdHome } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { BsFillChatFill } from "react-icons/bs";

import homeIcon from "../assets/home.svg";
import searchIcon from "../assets/search.svg";
import addIcon from "../assets/add.svg";
import messageIcon from "../assets/message.svg";

const NavbarOwn = () => {
  let navigate = useNavigate();
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
  return (
    <nav class="navbar">
      {/* <table className="navbartable">
        <tr> */}
      {/* <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "10px" }}>
            <CiUser
              className="navbarIcon"
              onClick={() => {
                navigate("/user_posts");
              }}
            />
          </td> */}
      <Link to="/home" className="navbar-item">
        <img className="bottombar__icon" src={homeIcon || "https://via.placeholder.com/20"} alt="Home" />
        <span className="navbarText">Home</span>
      </Link>
      <Link to="/explore" className="navbar-item">
        <img className="bottombar__icon" src={searchIcon || "https://via.placeholder.com/20"} alt="explore" />
        <span className="navbarText">Explore</span>
      </Link>

      <Link to="/friends" className="navbar-item">
        <FaUserFriends color={"black"} className="bottombar__icon" />
        <span className="navbarText">Friends</span>
      </Link>

      <Link to="/create_post" className="navbar-item">
        <img className="bottombar__icon" src={addIcon || "https://via.placeholder.com/20"} alt="Create Post" />
        <span className="navbarText">Post</span>
      </Link>

      <Link to="/chat" className="navbar-item">
        <img className="bottombar__icon" src={messageIcon || "https://via.placeholder.com/20"} alt="Chat" />
        <span className="navbarText">Chat</span>
      </Link>
      <Link to="/profile" className="navbar-item">
        <img
          src={proPic}
          className="bottombar__icon bottombar_profile"
          alt="profile"
          style={{ cursor: "pointer", verticalAlign: "middle" }}
          onClick={() => {
            navigate("/edit_profile_mobile");
          }}
        />
        <span className="navbarText">Profile</span>
      </Link>
    </nav>
  );
};

export default NavbarOwn;
