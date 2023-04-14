import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { CiBitcoin } from "react-icons/ci";
import { MdHome } from "react-icons/md";
import { CiUser } from "react-icons/ci";

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
    <div id="navbarOwnMain">
      <table className="navbartable">
        <tr>
          <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "10px" }}>
            <CiUser
              className="navbarIcon"
              onClick={() => {
                navigate("/user_posts");
              }}
            />
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "10px" }}>
            <MdHome
              className="navbarIcon"
              onClick={() => {
                navigate("/home");
              }}
            />
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "10px" }}>
            <BsFillPlusCircleFill
              className="navbarIcon"
              onClick={() => {
                navigate("/create_post");
              }}
            />
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "10px" }}>
            <FaUserFriends
              className="navbarIcon"
              onClick={() => {
                navigate("/friends");
              }}
            />
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "10px" }}>
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
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "10px" }}>
            <img
              src={proPic}
              className="homeFeedProfilePicture navbarIcon"
              alt="profile"
              style={{ cursor: "pointer", verticalAlign: "middle" }}
              onClick={() => {
                navigate("/profile");
              }}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default NavbarOwn;
