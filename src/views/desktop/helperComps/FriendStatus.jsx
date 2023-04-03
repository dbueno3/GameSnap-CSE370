import FriendRequest from "./FriendRequest";

import { useEffect, useState } from "react";

const FriendStatus = (props) => {
  const [pending, setPending] = useState([]);
  const [active, setActive] = useState([]);
  const [sent, setSent] = useState([]);

  useEffect(() => {
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
          setSent(res[0].length);
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
              requestUsername={req.fromUser.attributes.username}
              requestImage={req.fromUser.attributes.profilePicture}
            />
          );
        })}
      </>
    );
  } else if (props.status === "active") {
    return <h6>These are your friends</h6>;
  } else if (props.status === "sent") {
    return <h6>These people you have sent requests to</h6>;
  } else {
    return <h6>Anything else</h6>;
  }
};

export default FriendStatus;
