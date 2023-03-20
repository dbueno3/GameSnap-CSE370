import { useEffect, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, getPosts] = useState([]);
  const [proPic, setPropic] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    //Get the user
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
          let info = result.attributes;
          setPropic(info.profilePicture);
        }
      });
    //Get the users posts
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
          //   console.log(res[0]);
          getPosts(res[0]);
        }
      });
  }, []);
  return (
    <div id="homeFeedMain">
      <div id="homeFeedHeader">
        <div style={{ float: "right" }}>
          <table style={{ margin: "0", borderCollapse: "collapse" }}>
            <tr>
              <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                <h6
                  style={{ margin: 0, cursor: "pointer" }}
                  onClick={() => {
                    navigate("/create_post");
                  }}
                >
                  Create a post
                </h6>
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                <img
                  src={proPic}
                  className="homeFeedProfilePicture"
                  alt="profile"
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/profile");
                  }}
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div id="homeFeed">
        {posts.map((post) => {
          if (post.attributes.mediaType === "image") {
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

export default Home;