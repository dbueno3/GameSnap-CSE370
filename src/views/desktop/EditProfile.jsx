//Blank profile
import BProfile from "../../assets/blank_profile.png";

import { useEffect, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

import NavbarOwn from "../../Component/NavbarOwn.jsx";

const EditProfile = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [proPicOld, setNewOldProPic] = useState("");
  const [privateAccount, setPrivate] = useState(false);

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
          setPrivate(result.privateAccount);
          setNewOldProPic(result.profilePicture);
        }
      });
  }, []);
  return (
    <>
      <NavbarOwn />
      <br />
      <br />
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
        <select
          name="Profile Privacy"
          id="PrivacySelect"
          onChange={(e) => {
            setPrivate(e.target.value);
          }}
        >
          <option value="Select"> Select Profile Option</option>
          <option value={true}> Profile Privacy: Private</option>
          <option value={false}> Profile Privacy: Public</option>
        </select>
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
                if (privateAccount === "Private Account") {
                  setPrivate(true);
                } else if (privateAccount === "Public Account") {
                  setPrivate(false);
                }
                //   Create the post here
                let proPic = `https://webdev.cse.buffalo.edu${data.path}`;
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
                      privateAccount: privateAccount,
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
    </>
  );
};

export default EditProfile;
