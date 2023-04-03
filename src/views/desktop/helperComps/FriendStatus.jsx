import FriendRequest from "./FriendRequest";
import FriendActive from "./FriendActive";

import { useEffect, useState } from "react";

const FriendStatus = (props) => {
  const [pending, setPending] = useState([]);
  const [active, setActive] = useState([]);
  const [sent, setSent] = useState([]);

  useEffect(() => {
    //Requests
    fetch(
      process.env.REACT_APP_API_PATH +
        `/connections?toUserID=${sessionStorage.getItem(
          "user"
        )}&attributes=%7B%0A%20%20%22path%22%3A%20%22requestStatus%22%2C%0A%20%20%22equals%22%3A%20%22pending%22%0A%7D`,
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
        if (res[0].length >= 1) {
          setPending(res[0]);
        }
      });
    //Sent
    fetch(process.env.REACT_APP_API_PATH + `/connections?fromUserID=${sessionStorage.getItem("user")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res[0].length >= 1) {
          setSent(res[0]);
        }
      });
    //Friends fromuserId
    fetch(
      process.env.REACT_APP_API_PATH +
        `/connections?fromUserID=${sessionStorage.getItem(
          "user"
        )}&attributes=%7B%0A%20%20%22path%22%3A%20%22requestStatus%22%2C%0A%20%20%22equals%22%3A%20%22active%22%0A%7D`,
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
        if (res[0].length >= 1) {
          setActive(res[0]);
        }
      });
    //Friends toUserID
    fetch(
      process.env.REACT_APP_API_PATH +
        `/connections?toUserID=${sessionStorage.getItem(
          "user"
        )}&attributes=%7B%0A%20%20%22path%22%3A%20%22requestStatus%22%2C%0A%20%20%22equals%22%3A%20%22active%22%0A%7D`,
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
        if (res[0].length >= 1) {
          res[0].length > 0 && setActive((prevActive) => prevActive.concat(res[0]));
        }
      });
  }, []);

  if (props.status === "pending") {
    return (
      <>
        {pending.map((req) => {
          return (
            <FriendRequest
              key={req.id}
              requestId={req.id}
              requestUsername={req.fromUser.attributes.username}
              requestImage={req.fromUser.attributes.profilePicture}
              requestUserId={req.fromUserID}
            />
          );
        })}
      </>
    );
  } else if (props.status === "active") {
    return (
      <>
        {active.map((friend) => {
          let username = friend.fromUser.attributes.username;
          let proPic = friend.fromUser.attributes.profilePicture;
          let uid = friend.fromUser.id;
          if (friend.fromUser.id == sessionStorage.getItem("user")) {
            username = friend.toUser.attributes.username;
            proPic = friend.toUser.attributes.profilePicture;
            uid = friend.toUser.id;
          }
          return <FriendActive key={friend.id} username={username} profilePicture={proPic} userId={uid} />;
        })}
      </>
    );
  } else if (props.status === "sent") {
    return <h6>These people you have sent requests to</h6>;
  } else {
    return <h6>Anything else</h6>;
  }
};

export default FriendStatus;
