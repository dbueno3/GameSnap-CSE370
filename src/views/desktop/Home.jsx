import { useEffect, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, getPosts] = useState([]);
  const [proPic, setPropic] = useState("");
  const [username, setUsername] = useState("");
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
          setUsername(info.username);
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
          <img
            src={proPic}
            className="profilePictureCircle"
            alt="profile"
            style={{ margin: "20px", cursor: "pointer" }}
            onClick={() => {
              navigate("/profile");
            }}
          />
        </div>
      </div>
      <div id="homeFeed">
        {posts.map((post) => {
          return (
            <div key={post.attributes.caption} className="homePost">
              <table style={{ margin: "0", borderCollapse: "collapse" }}>
                <tr>
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
                  <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                    <h6
                      style={{ margin: 0 }}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      {username}
                    </h6>
                  </td>
                </tr>
              </table>
              <img src={post.attributes.mediaUrl} className="homePostImage" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
