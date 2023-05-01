import { useEffect, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

import NavbarOwn from "../../Component/NavbarOwn.jsx";
import { useLocation } from "react-router-dom";

const SearchContent = () => {
  let navigate = useNavigate();
  const [posts, getPosts] = useState([]);
  const [proPic, setPropic] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const input = searchParams.get('data')
  const type = searchParams.get('type')
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
          getPosts(res[0]);
        }
      });
  }, []);

  return (
    <>
      <NavbarOwn />
      <div id="homeFeedMain">
        <div id="homeFeed">
          {posts.map((post) => {
            if (type === 'content'){
              if (post.attributes.caption.includes(String(input))){
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
                } else if (post.attributes && post.attributes.mediaUrl && post.attributes.mediaUrl === "video/mp4") {
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
              }
            }
            if (type === 'user'){
              if (post.author.attributes.username.includes(String(input))){
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
                } else if (post.attributes && post.attributes.mediaUrl && post.attributes.mediaUrl === "video/mp4") {
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
              }
            }
          })}
        </div>
      </div>
    </>
  );
};

export default SearchContent;