import { useEffect, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

import NavbarOwn from "../../Component/NavbarOwn.jsx";
import { FaUserCircle } from "react-icons/fa";
import CommentModal from "../../Component/CommentModal.jsx";

const Home = () => {
  const [posts, getPosts] = useState([]);
  const [proPic, setPropic] = useState("");
  const [blocklist, setBlockList] = useState([])
  const [searchinput, setSearchInput] = useState("");
  const [searchresult, setSearchResult] = useState([])

  let navigate = useNavigate();
  
  useEffect(() => {
    //get the block list
    fetch(process.env.REACT_APP_API_PATH+`/post-reactions?reactorID=${sessionStorage.getItem("user")}&name=block`, {
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
          console.log(res[0])
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
      <div id="homeFeedMain" className="container">
        <div class="container">
          <input className="Search input-box-white"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        <button className="SearchByUser submit-button"
            onClick={() => {
              SearchByUser(searchinput, posts)
            }}
          >search by user
          </button>
          <button className="SearchByContent submit-button"
            onClick={() => {
              SearchByContent(searchinput, posts)
            }}
          >search by content
          </button>
        </div>
        <div id="homeFeed">
          {posts.map((post) => {
            if (!blocklist.includes(post.id)){
            if (post.attributes.mediaType === "image") {
              return (
                <div key={post.id} className="homePost">
                  <button onClick={() => Block(post.id)} className="blockButton">Block</button>
                  <table style={{ margin: "0", borderCollapse: "collapse" }}>
                    <tr>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                      {post.author.attributes.profilePicture ? (
                        <img
                          src={post.author.attributes.profilePicture}
                          className="homeFeedProfilePicture"
                          alt="profile"
                          style={{ margin: "20px", cursor: "pointer" }}
                        />
                      ) : (
                        <FaUserCircle
                          className="homeFeedProfilePicture"
                          size={40}
                          style={{ margin: "20px", cursor: "pointer" }}
                        />
                      )}
                      </td>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                        <h6 style={{ margin: 0, cursor: "pointer" }}>{post.author.attributes.username}</h6>
                      </td>
                    </tr>
                  </table>
                  <img alt="post" src={post.attributes.mediaUrl} className="homePostImage" />
                  <p>&nbsp;&nbsp;{post.author.attributes.username}: {post.attributes.caption}</p>
                  <button className="commentButton" onClick={() => navigate(`/mobilecomment?id=${post.id}`)}>Comment</button>
                </div>
              );
            } else {
              return (
                <div key={post.id} className="homePost">
                  <button onClick={() => Block(post.id)} className="blockButton">Block</button>
                  <table style={{ margin: "0", borderCollapse: "collapse" }}>
                    <tr>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                      {post.author.attributes.profilePicture ? (
                        <img
                          src={post.author.attributes.profilePicture}
                          className="homeFeedProfilePicture"
                          alt="profile"
                          style={{ margin: "20px", cursor: "pointer" }}
                        />
                      ) : (
                        <FaUserCircle
                          className="homeFeedProfilePicture"
                          size={40}
                          style={{ margin: "20px", cursor: "pointer" }}
                        />
                      )}
                      </td>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                        <h6 style={{ cursor: "pointer" }}>{post.author.attributes.username}</h6>
                      </td>
                    </tr>
                  </table>
                  <video controls className="HomePostVideo" width="100%" height="0">
                    <source src={post.attributes.mediaUrl} type="video/mp4" />
                  </video>
                  <p>&nbsp;&nbsp;{post.attributes.caption}</p>
                  <button className="commentButton" onClick={() => navigate(`/mobilecomment?id=${post.id}`)}>Comment</button>
                </div>
              );
            }
          }
          
          }
          
          )
          } 
        </div>
      </div>
    </>
  );
};

export default Home;