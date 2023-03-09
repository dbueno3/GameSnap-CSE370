//Blank profile
import BProfile from "../../assets/blank_profile.png";

import { useEffect, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [proPic, setPropic] = useState("");
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
          formData.append("uploaderID", sessionStorage.getItem("user"));
          formData.append(
            "attributes",
            JSON.stringify({
              profilePicture: "",
            })
          );
          formData.append("file", image);
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
              if (result) {
                const data = JSON.parse(result);
                console.log(data);
                let newForm = new FormData();
                newForm.append("uploaderID", data.uploaderID);
                newForm.append(
                  "attributes",
                  JSON.stringify({
                    profilePicture: `https://webdev.cse.buffalo.edu${data.path}`,
                  })
                );
                setPropic(`https://webdev.cse.buffalo.edu${data.path}`);
                fetch(process.env.REACT_APP_API_PATH + `/file-uploads/${data.id}`, {
                  method: "PATCH",
                  headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                  },
                  body: newForm,
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    } else {
                      fetch(process.env.REACT_APP_API_PATH + `/users/${sessionStorage.getItem("user")}`, {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Bearer " + sessionStorage.getItem("token"),
                        },
                        body: JSON.stringify({
                          attributes: {
                            profilePicture: proPic,
                          },
                        }),
                      });
                    }
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
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
                profilePicture: proPic,
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
