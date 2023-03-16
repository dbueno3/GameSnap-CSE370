import { useEffect, useState } from "react";

const Posts_mobile = () => {
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
      {posts.map((post) => {
        return (
          <div className="post_list">
            {post.attributes.mediaUrl && post.attributes.mediaUrl.endsWith('mp4')?(
              <video src={post.attributes.mediaUrl} controls autoPlay className="post_list_image"/>
            ):(
              <img src={post.attributes.mediaUrl} className="post_list_image"/>
            )}
            <p className="caption_mobile">{post.attributes.caption}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Posts_mobile;