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
  const [imageByte, setImageByte] = useState("");
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
          let formData = new FormData();
          let image = document.getElementById("pickNewImage").files[0];
          formData.append("uploaderID", 115);
          formData.append("attributes", {});
          formData.append("file", image);
          fetch(process.env.REACT_APP_API_PATH + `/file-uploads`, {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            body: JSON.stringify(formData),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.text();
            })
            .then((result) => {
              if (result) {
                const data = JSON.parse(result);
                console.log("Success:", data);
              } else {
                console.log("Success: Response was empty");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }}
      />
      <br />
      <input type="text" placeholder="First Name" onChange={(e) => setFname(e.target.value)} />
      <br />
      <input type="text" placeholder="Last Name" onChange={(e) => setLname(e.target.value)} />
      <br />
      <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
      <br />
      <p>Email: edy@buffalo.edu</p>
      <br />
      <textarea placeholder="Bio" onChange={(e) => setBio(e.target.value)} />
      <br />
      <button
        onClick={() => {
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
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default EditProfile;
