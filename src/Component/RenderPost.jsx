import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../views/style.css"

const RenderPost = () => {
  const params = useParams();
  const userId = params.userId;
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    fetch(process.env.REACT_APP_API_PATH + `/posts?authorID=${userId}&sort=newest`,{
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }).then((res) => res.json()).then((res) => {
      if (res) {
        //   console.log(res[0]);
        setPosts(res[0]);
      }
    });
    // eslint-disable-next-line
  },[])
  return (
    <>
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
    </>
  );
};

export default RenderPost;
