import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileHome = () => {
  const [posts, getPosts] = useState([]);
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
          let info = result.attributes;
          setPropic(info.profilePicture);
        }
      });

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
          getPosts(res[0]);
        }
      });
  }, []);

  return (
    <div id="homeFeedMain">
      <div id="homeFeedHeader">
        <h6
          style={{ margin: 0, cursor: "pointer" }}
          onClick={() => {
            navigate("/create_post");
          }}
        >
          Create a post
        </h6>
        <img
          src={proPic}
          className="homeFeedProfilePicture"
          alt="profile"
          style={{ margin: "20px", cursor: "pointer" }}
          onClick={() => {
            navigate("/profile");
          }}
        />
      </div>
      <div id="homeFeed">
        {posts.map((post) => {
          if (post.attributes.mediaType === "image") {
            return (
              <div key={post.attributes.caption} className="homePost">
                <img alt="post" src={post.attributes.mediaUrl} className="homePostImage" />
                <h6>Caption: {post.attributes.caption}</h6>
              </div>
            );
          } else {
            return (
              <div key={post.attributes.caption} className="homePost">
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

export default MobileHome;
