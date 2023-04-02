import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import RenderProfile from "../../Component/RenderProfile.jsx";

const SearchedFriend = () => {
  const params = useParams();
  const userId = params.userId;
  const [requestStatus, setRequestStatus] = useState("");
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
        if (res[0][0].hasOwnProperty("attributes")) {
          setRequestStatus(res[0][0].attributes.requestStatus);
        }
      });
  }, []);
  return (
    <RenderProfile userId={userId}>
      <button
        style={requestStatus === "" ? { display: "inline-block" } : { display: "none" }}
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
    </RenderProfile>
  );
};

export default SearchedFriend;
