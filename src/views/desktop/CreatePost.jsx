import Upload from "../../assets/upload.png";

import "../style.css";

const CreatePost = () => {
  return (
    <div id="createPostMain">
      <img
        src={Upload}
        alt="blank upload"
        className="uploadLogo"
        onClick={(e) => {
          document.getElementById("postImageUpload").click();
        }}
      />
      <input type="file" style={{ display: "none" }} id="postImageUpload" />
      <br />
      <textarea cols="32" rows="10" placeholder="Caption" />
      <br />
      <button>Post</button>
    </div>
  );
};

export default CreatePost;
