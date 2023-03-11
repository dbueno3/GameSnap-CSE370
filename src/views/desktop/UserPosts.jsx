import { useEffect, useState } from "react";

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
        return (
          <div className="post">
            {<img src={post.attributes.mediaUrl} alt={post.attributes.caption} className="postImage" />}
            <p>{post.attributes.caption}</p>
          </div>
        );
      })}
    </div>
  );
};

export default UserPosts;
