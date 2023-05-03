import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditImagePost from "../views/desktop/EditImagePost.jsx";
import EditVideoPost from "../views/desktop/EditVideoPost.jsx";

const OtherUserPosts = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_PATH + `/users/${props.user}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result) {
              console.log("Username", result);
              console.log(result.attributes);
              setUsername(result.attributes.username);
              setEmail(result.email);
            }
          });
      });
      useEffect(() => {
        console.log("Check username", username);
        if (username !== "") {
          fetch(process.env.REACT_APP_API_PATH + `/posts`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res) {
                let filteredPosts = res[0].filter((post) => {
                  return post.author.attributes.username === username;
                });
                console.log("Filtered Posts", filteredPosts);
                setPosts(filteredPosts);
              }
            });
        }
      }, [username]);

    return (
    
      <div id="homeFeedMain">
        <div className="userPostFeed">
            <br/>
          {posts.map((post) => {
            console.log("usernameperpost",username);
            if (post.attributes.mediaType === "image" && post.author.attributes.username === username) {
              return (
                <div key={post.attributes.caption} className="userPost">
                  <table style={{ margin: "0", borderCollapse: "collapse" }}>
                    <tr>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                        <img
                          src={post.author.attributes.profilePicture}
                          className="homeFeedProfilePicture"
                          alt="profile"
                          style={{ margin: "20px", cursor: "pointer" }}
                        /> 
                      </td>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                        <h6 style={{ margin: 0, cursor: "pointer" }}>{post.author.attributes.username}</h6>
                      </td>
                    </tr>
                  </table>
                  <img alt="post" src={post.attributes.mediaUrl} className="homePostImage" />
                  <h6>Caption: {post.attributes.caption}</h6>
                </div>
              );
            } else {
              return (
                <div key={post.attributes.caption} className="homePost">
                  <table style={{ margin: "0", borderCollapse: "collapse" }}>
                    <tr>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                        <img
                          src={post.author.attributes.profilePicture}
                          className="homeFeedProfilePicture"
                          alt="profile"
                          style={{ margin: "20px", cursor: "pointer" }}
                        />
                      </td>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                        <h6 style={{ cursor: "pointer" }}>{post.author.attributes.username}</h6>
                      </td>
                    </tr>
                  </table>
                  <video controls className="HomePostVideo" width="100%" height="0">
                    <source src={post.attributes.mediaUrl} type="video/mp4" />
                  </video>
                  <h6>Caption: {post.attributes.caption}</h6>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
};

export default OtherUserPosts;