import { useEffect, useState } from "react";

//Post Components
import EditImagePost from "./EditImagePost.jsx";
import EditVideoPost from "./EditVideoPost.jsx";
import { useNavigate } from "react-router-dom";

const EditPosts = () => {
  const navigate = useNavigate();
  const [posts, getPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  

  useEffect(() => {
    //Get the user information
    fetch(process.env.REACT_APP_API_PATH + `/users/${sessionStorage.getItem("user")}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        let info = result.attributes;
        setUsername(info.username);
        setProfilePicture(info.profilePicture);
      });
    //Get the users posts
    fetch(process.env.REACT_APP_API_PATH + `/posts?authorID=${sessionStorage.getItem("user")}&sort=newest`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          getPosts(res[0]);
        }
      });
  }, []);
  return (
    <div id="userPostsMain">
      <div id="userPostProfile">
        <div>
          <table style={{ backgroundColor: "#5F6A82", color: "black", width: "50%", borderRadius: "20px" }}>
            <tr>
              <td style={{ textAlign: "center", verticalAlign: "middle", width: "20%" }}>
                <img src={profilePicture} alt="Profile" className="profilePictureCircle" />
              </td>
              <td style={{ textAlign: "left", verticalAlign: "middle", width: "10%" }}>
                <h6 style={{ margin: 0 }}>{username}</h6>
              </td>
              <td></td>
            </tr>
            <tr>
              <th style={{ fontSize: "14px", padding: "5px", width: "33.33%" }}>Following</th>
              <th style={{ fontSize: "14px", padding: "5px", width: "33.33%" }}>Followers</th>
              <th style={{ fontSize: "14px", padding: "5px", width: "33.33%" }}>Likes</th>
            </tr>
            <tr>
              <td style={{ fontSize: "14px", padding: "5px", width: "33.33%" }}>0</td>
              <td style={{ fontSize: "14px", padding: "5px", width: "33.33%" }}>0</td>
              <td style={{ fontSize: "14px", padding: "5px", width: "33.33%" }}>0</td>
            </tr>
          </table>
        </div>
      </div>
      {/*Posts*/}
      <button className="edit_post" onClick={()=>{
        navigate("/user_posts")
      }}>Back</button>
      {posts.map((post) => {
        if (post.attributes.mediaType === "image") {
          return (
            <EditImagePost
              post={post}
            />
          );
        } else {
          return (
            <EditVideoPost
              post={post}
            />
          );
        }
      })}
    </div>
  );
};

export default EditPosts;