import { useEffect, useState } from "react";

//Post Components
import ImagePost from "../../Component/ImagePost.jsx";
import VideoPost from "../../Component/VideoPost.jsx";

const UserPosts = () => {
  const [posts, getPosts] = useState([]);
  useEffect(() => {
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
      <h1>Your Posts</h1>
      {/*Posts*/}
      {posts.map((post) => {
        if (post.attributes.mediaType === "image") {
          return (
            <ImagePost
              key={post.attributes.caption}
              mediaUrl={post.attributes.mediaUrl}
              mediaCaption={post.attributes.caption}
            />
          );
        } else {
          return (
            <VideoPost
              key={post.attributes.caption}
              mediaUrl={post.attributes.mediaUrl}
              mediaCaption={post.attributes.caption}
            />
          );
        }
      })}
    </div>
  );
};

export default UserPosts;
