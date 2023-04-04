import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";

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
      <table style={{ margin: "0", borderCollapse: "collapse", float: "right" }}>
        <tr>
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
            <GoSignOut
              className="navbarIcon"
              onClick={() => {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                navigate("/login");
              }}
            />
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "10px" }}>
            <img
              src={proPic}
              className="homeFeedProfilePicture navbarIcon"
              alt="profile"
              style={{ margin: "20px", cursor: "pointer", verticalAlign: "middle" }}
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
