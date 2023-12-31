import Upload from "../../assets/upload.png";

import { useState } from "react";

import "../style.css";

//Router
import { useNavigate } from "react-router-dom";

import NavbarOwn from "../../Component/NavbarOwn.jsx";

import Alert from "../../Component/Alert.jsx";

const CreatePost = () => {
  let navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [mediaType, setMediaType] = useState("");
  // eslint-disable-next-line
  const [formData, addToFormData] = useState(new FormData());

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleOkButtonAction = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Alert showAlert={showAlert} message={errorMessage} alertType="error" okButtonAction={handleOkButtonAction} />
      <NavbarOwn />
      <div id="createPostMain">
        <div id="createPostHolder">
          <img src={Upload} alt="blank upload" className="uploadLogo" id="NewPostImage" style={{ display: "none" }} />
          <br />
          <video id="newVideoPreview" width="640" height="480" controls style={{ display: "none" }}>
            <source src="" type="video/mp4" />
          </video>
          <br />
          <div style={{ textAlign: "left" }}>
            <input
              type="file"
              id="postImageUpload"
              accept="image/png, image/jpeg, image/jpg, video/mp4, image/gif"
              onChange={() => {
                let media = document.getElementById("postImageUpload").files[0];
                formData.append("uploaderID", sessionStorage.getItem("user"));
                console.log(media.type);
                formData.append("file", media);
                const input = document.getElementById("postImageUpload");
                if (input.files && input.files[0]) {
                  const reader = new FileReader();
                  reader.onload = function (e) {
                    const file = input.files[0];
                    if (file.type.startsWith("image/")) {
                      setMediaType("image");
                      const mediaElement = file.type.startsWith("image/")
                        ? document.getElementById("NewPostImage")
                        : document.getElementById("newVideoPreview");
                      mediaElement.src = e.target.result;
                      mediaElement.style.display = "inline";
                    } else if (file.type.startsWith("video/")) {
                      setMediaType("video");
                      const mediaElement = file.type.startsWith("image/")
                        ? document.getElementById("NewPostImage")
                        : document.getElementById("newVideoPreview");
                      mediaElement.src = e.target.result;
                      mediaElement.style.display = "inline";
                    } else {
                      handleShowAlert();
                      setErrorMessage("unsupported media type");
                    }
                  };
                  reader.readAsDataURL(input.files[0]);
                }
              }}
            />
            <br />
            <p style={{ fontSize: "10px", color: "grey" }}>accepted formats: /png, /jpg, /jpeg, /mp4, /gif</p>
          </div>

          <textarea
            className="input-box-white"
            placeholder="Caption"
            style={{ borderRadius: "1%", height: "200px", width: "90%" }}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />

          <button
            className="submit-button"
            onClick={() => {
              formData.append(
                "attributes",
                JSON.stringify({
                  mediaType: mediaType,
                })
              );
              //Upload the file first
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
                  let postMediaUrl = `https://webdev.cse.buffalo.edu${data.path}`;
                  fetch(process.env.REACT_APP_API_PATH + "/posts", {
                    method: "post",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                      authorID: sessionStorage.getItem("user"),
                      content: mediaType,
                      attributes: {
                        caption: caption,
                        mediaUrl: postMediaUrl,
                        mediaType: mediaType,
                        comment: [],
                      },
                    }),
                  })
                    .then((res) => res.json())
                    .then(
                      (result) => {
                        console.log("Post was successful");
                        navigate("/home");
                      },
                      (error) => {
                        console.log(`error!: ${error}`);
                      }
                    );
                });
            }}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
