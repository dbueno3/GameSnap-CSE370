import { useEffect, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

import NavbarOwn from "../../Component/NavbarOwn.jsx";

const Home = () => {
  const [posts, getPosts] = useState([]);
  const [proPic, setPropic] = useState("");
  const [blocklist, setBlockList] = useState([])
  const [searchinput, setSearchInput] = useState("");
  const [searchresult, setSearchResult] = useState([])

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
    if (window.confirm("Are you sure you want to block this post?")) {
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
};

  const SearchByContent = (searchinput) =>{
    navigate(`/searchcontent?data=${searchinput}&type=${'content'}`)
  };

  const SearchByUser = (searchinput) =>{
    navigate(`/searchcontent?data=${searchinput}&type=${'user'}`)
  };



  return (
    <>
      <NavbarOwn />
      <div id="homeFeedMain">
      <div>
          <input className="Search"
            type="text"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <br />
        </div>
        <button className="SearchByUser"
            onClick={() => {
              SearchByUser(searchinput, posts)
            }}
          >search by user
          </button>
          <button className="SearchByContent"
            onClick={() => {
              SearchByContent(searchinput, posts)
            }}
          >search by content
          </button>
        <div id="homeFeed">
          {posts.map((post) => {
            if (!blocklist.includes(post.id)){
            if (post.attributes.mediaType === "image") {
              return (
                <div key={post.attributes.caption} className="homePost">
                  <button onClick={() => Block(post.id)} className="blockButton">Block</button>
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
                  <button onClick={() => Block(post.id)} className="blockButton">Block</button>
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
          })}
        </div>
      </div>
    </>
  );
};

export default Home;