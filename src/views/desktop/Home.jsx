import { useEffect, useState } from "react";

const Home = () => {
  const [posts, getPosts] = useState([]);
  const [proPic, setPropic] = useState("");
  const [username, setUsername] = useState("");
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
            <img src={proPic} style={{}}
        </div>
      </div>
    </div>
  );
};

export default Home;
