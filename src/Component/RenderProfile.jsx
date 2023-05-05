//Blank profile
import BProfile from "../assets/blank_profile.png";

import { useEffect, useState } from "react";

import twitch_logo from "../assets/twitch_logo.png";
import youtube_logo from "../assets/youtube_logo.png";

const RenderProfile = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [privateAccount, setPrivate] = useState(false);
  const [proPic, setPropic] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitch, setTwitch] = useState("");
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
          setYoutube(info.youtube || "");
          setTwitch(info.twitch || "");
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
          <br />
          <p className="bio">{bio}</p>
          <br />
          <div class="tooltip">
            {privateAccount === true ? "🔒 Private Profile" : "🔓 Public Profile"}
            <span class="tooltip-text">
              {privateAccount === true
                ? "Private profile's post will not be visible in Explore Page"
                : "Your Posts are visible to people who you are not friends with on Explore Page"}
            </span>
          </div>
          <br />
          <a href={youtube}>
            <img style={youtube != "" ? { height: "30px" } : { display: "none" }} src={youtube_logo} />
          </a>
          <a href={twitch}>
            <img style={twitch != "" ? { height: "30px" } : { display: "none" }} src={twitch_logo} />
          </a>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default RenderProfile;
