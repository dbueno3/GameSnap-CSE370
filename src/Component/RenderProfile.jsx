//Blank profile
import BProfile from "../assets/blank_profile.png";

import { useEffect, useState } from "react";

const RenderProfile = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [option, setPrivate] = useState(false)
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
          setPrivate(result.option)
          setPropic(info.profilePicture);
        }
      });
  }, []);
  return (
    <div id="ProfilePageMain">
      <img src={proPic === "" ? BProfile : proPic} alt="blank_profile" className="blankProfileImage" />
      <h4>First Name: {fname}</h4>
      <h4>Last Name: {lname}</h4>
      <h4>Username: {username}</h4>
      <h4>Email: {email}</h4>
      <h4>ProfilePrivacy:{option}</h4>
      <h4>Bio : {bio}</h4>
      {props.children}
      {/* <button
        onClick={() => {
          navigate("/edit_profile");
        }}
      >
        Edit
      </button> */}
    </div>
  );
};

export default RenderProfile;
