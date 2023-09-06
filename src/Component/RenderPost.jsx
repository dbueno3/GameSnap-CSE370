import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PostOwn from "../Component/PostOwn";

import "../views/style.css";

const RenderPost = () => {
  const params = useParams();
  const userId = params.userId;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_PATH + `/posts?authorID=${userId}&sort=newest`, {
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
          setPosts(res[0]);
        }
      });
    // eslint-disable-next-line
  }, []);
  return (
    <>
    //
    </>
  );
};

export default RenderPost;
