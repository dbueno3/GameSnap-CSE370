//Blank profile
import BProfile from "../assets/blank_profile.png";

import { useEffect, useState } from "react";

const RenderProfile = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [privateAccount, setPrivate] = useState(false);
  const [proPic, setPropic] = useState("");
  useEffect(() => {
    fetch(process.env.REACT_APP_API_PATH + `/users/${props.userId}`, {
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
          setFname(info.firstName);
          setLname(info.lastName);
          setBio(info.bio);
          setUsername(info.username);
          setEmail(result.email);
          setPrivate(info.private);
          setPropic(info.profilePicture);
        }
      });
  },);

  return (
    <div id="ProfilePageMain">
      <h4 className="center-text">{username}</h4>
      <div className="header-image-text">
      <img src={proPic === "" ? BProfile : proPic} alt="blank_profile" className="center-text blankProfileImage" />
      <div class="profile-info">
        <p className="right-text">{fname + " " + lname}</p>
        <br/>
        <p className="bio">{bio}</p>
        <br/>
        <div class="tooltip">
          {privateAccount === true ? "🔒 Private Profile" : "🔓 Public Profile"}
          <span class="tooltip-text">{privateAccount === true ? "Your Posts are only shared with your friends" : "Your Posts are visible to people who you are not friends with"}</span>
        </div>
      </div>
      </div>
      {props.children}
    </div>

  );
};

export default RenderProfile;
