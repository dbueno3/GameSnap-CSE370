import Upload from "../../assets/upload.png";

import { useState } from "react";

import "../style.css";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [mediaType, setMediaType] = useState("");
  // eslint-disable-next-line
  const [formData, addToFormData] = useState(new FormData());
  return (
    <div id="createPostMain">
      <img src={Upload} alt="blank upload" className="uploadLogo" id="NewPostImage" style={{ display: "none" }} />
      <br />
      <video id="newVideoPreview" width="640" height="480" controls style={{ display: "none" }}>
        <source src="" type="video/mp4" />
      </video>
      <br />
      <input
        type="file"
        id="postImageUpload"
        onChange={() => {
          let media = document.getElementById("postImageUpload").files[0];
          formData.append("uploaderID", sessionStorage.getItem("user"));
          // formData.append("attributes", JSON.stringify({}));
          formData.append("file", media);
          const input = document.getElementById("postImageUpload");
          if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
              const file = input.files[0];
              const mediaElement = file.type.startsWith("image/")
                ? document.getElementById("NewPostImage")
                : document.getElementById("newVideoPreview");
              mediaElement.src = e.target.result;
              mediaElement.style.display = "inline";
            };
            reader.readAsDataURL(input.files[0]);
          }
        }}
      />
      <br />
      <textarea
        cols="32"
        rows="10"
        placeholder="Caption"
        onChange={(e) => {
          setCaption(e.target.value);
        }}
      />
      <br />
      <label htmlFor="my-media_type">Select media type: </label>
      <select
        id="media_type"
        name="media_type"
        onChange={(e) => {
          setMediaType(e.target.value);
        }}
      >
        <option value="none">none</option>
        <option value="image">image</option>
        <option value="video">video</option>
      </select>
      <br />
      <button
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
                  },
                }),
              })
                .then((res) => res.json())
                .then(
                  (result) => {
                    console.log("Post was successful");
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
  );
};

export default CreatePost;
