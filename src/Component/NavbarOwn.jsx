import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { CiBitcoin } from "react-icons/ci";
import { MdHome } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { BsFillChatFill } from "react-icons/bs";

import homeIcon from '../assets/home.svg';
import searchIcon from '../assets/search.svg';
import addIcon from '../assets/add.svg';
import messageIcon from '../assets/message.svg';

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
            <img
              className="bottombar__icon"
              src={homeIcon || 'https://via.placeholder.com/20'}
              alt="Home"
            />
            <span>Home</span>
          </Link>

          <Link to="/friends" className="navbar-item">
            <FaUserFriends
              color={"black"}
              className="bottombar__icon"/>
            <span>Friends</span>
          </Link>

          <Link to="/create_post" className="navbar-item">
              <img
                className="bottombar__icon"
                src={addIcon || 'https://via.placeholder.com/20'}
                alt="Create Post"
              />
              <span>Post</span>
          </Link>

          <Link to="/chat" className="navbar-item">
          <img
            className="bottombar__icon"
            src={messageIcon || 'https://via.placeholder.com/20'}
            alt="Chat"
          />
          <span>Chat</span>
      </Link>
          {/* <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "10px" }}>
            <CiBitcoin
              className="navbarIcon"
              onClick={() => {
                navigate("/about-team");
              }}
            />
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "10px" }}>
            <GoSignOut
              className="navbarIcon"
              onClick={() => {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("email");
                navigate("/");
              }}
            />
          </td> */}
          
        {/* </tr>
      </table> */}

<Link to="/edit_profile_mobile" className="navbar-item">
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
