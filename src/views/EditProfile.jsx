//Blank profile
import BProfile from "../assets/blank_profile.png";

import { useEffect, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [proPicOld, setNewOldProPic] = useState("");
  // eslint-disable-next-line
  const [formData, addToFormData] = useState(new FormData());
  let navigate = useNavigate();
  useEffect(() => {
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
          console.log(result);
          setFname(result.firstName);
          setLname(result.lastName);
          setBio(result.bio);
          setUsername(result.username);
          setNewOldProPic(result.profilePicture);
        }
      });
  }, []);
  return (
    <div id="editProfileMain">
      <img
        src={BProfile}
        alt="blank_profile"
        className="blankProfileImage"
        onClick={() => {
          document.getElementById("pickNewImage").click();
        }}
      />
      <input
        type="file"
        id="pickNewImage"
        style={{ display: "none" }}
        onChange={() => {
          let image = document.getElementById("pickNewImage").files[0];
          formData.append("uploaderID", sessionStorage.getItem("user"));
          formData.append(
            "attributes",
            JSON.stringify({
              fileType: "profile_picture",
            })
          );
          formData.append("file", image);
        }}
      />
      <br />
      <input type="text" placeholder="First Name" onChange={(e) => setFname(e.target.value)} />
      <br />
      <input type="text" placeholder="Last Name" onChange={(e) => setLname(e.target.value)} />
      <br />
      <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
      <br />
      <br />
      <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
      <br />
      <button
        onClick={() => {
          //TODO: Check for empty image
          fetch(process.env.REACT_APP_API_PATH + `/file-uploads`, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.text();
            })
            .then((result) => {
              const data = JSON.parse(result);
              console.log(data);
              //   Create the post here
              let proPic = `https://webdev.cse.buffalo.edu${data.path}`;
              console.log(proPic);
              fetch(process.env.REACT_APP_API_PATH + `/users/${sessionStorage.getItem("user")}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                body: JSON.stringify({
                  attributes: {
                    firstName: fname,
                    lastName: lname,
                    username: username,
                    bio: bio,
                    profilePicture: proPicOld === "" ? proPicOld : proPic,
                  },
                }),
              })
                .then((res) => res.json())
                .then(
                  (result) => {
                    navigate("/profile");
                  },
                  (error) => {
                    alert("error!");
                  }
                );
            });
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default EditProfile;
