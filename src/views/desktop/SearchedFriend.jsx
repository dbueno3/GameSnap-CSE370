import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import RenderProfile from "../../Component/RenderProfile.jsx";

import NavbarOwn from "../../Component/NavbarOwn.jsx";
import UserGame from "../../Component/UserGame.jsx";
import OtherUserPosts from "../../Component/OtherUserPosts.jsx";

const SearchedFriend = () => {
  const params = useParams();
  const userId = params.userId;
  const [requestStatus, setRequestStatus] = useState("");
  const [block, setBlock] = useState(false);
  
  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_PATH + `/connections?fromUserID=${sessionStorage.getItem("user")}&toUserID=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res[0][0].hasOwnProperty("attributes")) {
          if (res[0][0].attributes.requestStatus === "blocked") {
            setBlock(true);
          } else {
            setRequestStatus(res[0][0].attributes.requestStatus);
          }
        }
      });
    fetch(
      process.env.REACT_APP_API_PATH + `/connections?fromUserID=${userId}&toUserID=${sessionStorage.getItem("user")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res[0][0].hasOwnProperty("attributes")) {
          if (res[0][0].attributes.requestStatus === "blocked") {
            setBlock(true);
          } else {
            setRequestStatus("pendingRequest");
          }
        }
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <br />
      <br />
      <NavbarOwn />
      <RenderProfile userId={userId}>
        <button
          style={requestStatus === "" && !block ? { display: "inline-block" } : { display: "none" }}
          id="sendRequestButton"
          onClick={() => {
            fetch(process.env.REACT_APP_API_PATH + `/connections`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
              body: JSON.stringify({
                fromUserID: sessionStorage.getItem("user"),
                toUserID: userId,
                attributes: {
                  conType: "network",
                  requestStatus: "pending",
                },
              }),
            }).then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              if (response.ok) {
                document.getElementById("requestSentText").style.display = "block";
                document.getElementById("requestSentText").style.color = "teal";
                document.getElementById("sendRequestButton").style.display = "none";
              }
            });
          }}
        >
          Add friend
        </button>
        <h6
          id="requestSentText"
          style={requestStatus === "pending" ? { display: "inline-block", color: "teal" } : { display: "none" }}
        >
          Friend Request Sent!
        </h6>
        <h6
          id="requestPendingText"
          style={requestStatus === "pendingRequest" ? { display: "inline-block", color: "teal" } : { display: "none" }}
        >
          Friend Request Pending
        </h6>
        <h6 style={block ? { display: "inline-block", color: "teal" } : { display: "none" }}>
          This profile can't be accessed
        </h6>
        <div className="grow-vertical">
          <h4>Top Games</h4>
          <UserGame user={userId} />
          <br/>
          <div>
            <h4 className="nobottom-margin left-text">Posts</h4>
            <OtherUserPosts user={userId} />
          </div>
        </div>
      </RenderProfile>
    </div>
  );
};

export default SearchedFriend;
