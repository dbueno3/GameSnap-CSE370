import { useEffect, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

import NavbarOwn from "../../Component/NavbarOwn.jsx";

const Home = () => {
  const [posts, getPosts] = useState([]);
  const [proPic, setPropic] = useState("");
  const [blocklist, setBlockList] = useState([])
  let navigate = useNavigate();
  
  useEffect(() => {
    //get the block list
    fetch(process.env.REACT_APP_API_PATH+`/post-reactions?reactorID=${sessionStorage.getItem("user")}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
            for(let i =0;i<res[0].length;i++){
              const item = res[0][i].postID
              setBlockList(preArray => [...preArray, item])
            }
          }
      });
    
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
  
  const Block = (postid) => {
    fetch(process.env.REACT_APP_API_PATH+"/post-reactions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        reactorID: sessionStorage.getItem("user"),
        postID: postid,
        name: "block"
      })
      })
      .then(
        result => {
          window.location.reload();
        },
        error => {
          alert("error!"+error);
        }
      );
  }

  return (
    <>
      <NavbarOwn />
      <div id="homeFeedMain">
        <div id="homeFeed">
          {console.log(blocklist)}
          {posts.map((post) => {
            console.log(post.id)
            if (!blocklist.includes(post.id)){
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
                  <button onClick={() => Block(post.id)}>block</button>
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
                  <button onClick={() => Block(post.id)}>block</button>
                </div>
              );
            }
          }
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
