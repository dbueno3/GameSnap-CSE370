import { useEffect, useState } from "react";

//Post Components
import ImagePost from "../../Component/ImagePost.jsx";

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
            <>
              <ImagePost
                key={post.attributes.caption}
                imageUrl={post.attributes.mediaUrl}
                imageCaption={post.attributes.caption}
              />
            </>
          );
        } else {
          return <h1>It is what it is </h1>;
        }
      })}
    </div>
  );
};

export default UserPosts;
