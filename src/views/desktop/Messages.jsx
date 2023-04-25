import { useState, useEffect } from "react";
import react from "react";
import NavbarOwn from "../../Component/NavbarOwn";
import { Navigate } from "react-router-dom";

import "../style.css";

import { BsArrowLeftRight } from "react-icons/bs";

const Messages = () => {
  const [conns, setConns] = useState([]);
  useEffect(() => {
    //Get the from "user" ids
    fetch(
      process.env.REACT_APP_API_PATH +
        `/connections?fromUserID=${sessionStorage.getItem(
          "user"
        )}&attributes=%7B%0A%20%20%22path%22%3A%20%22conType%22%2C%0A%20%20%22equals%22%3A%20%22chat%22%0A%7D`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setConns(result[0]);
      });
  }, []);
  return (
    <>
      <NavbarOwn />
      <div className="MessagesPage">
        <h4>Message Threads</h4>
        <table style={{ marginTop: "50px", borderCollapse: "collapse" }}>
          <tr>
            {conns.map((conn) => {
              return (
                <div>
                  <td className="msgThread" style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                    <h6 style={{ margin: 0, cursor: "pointer", display: "inline-block" }}>
                      <img
                        src={conn.fromUser.attributes.profilePicture}
                        className="friendpicture"
                        alt="profile"
                        style={{ margin: "20px", cursor: "pointer", verticalAlign: "middle" }}
                      />
                    </h6>
                    <p style={{ margin: 0, cursor: "pointer", display: "inline-block" }}>
                      <BsArrowLeftRight />
                    </p>
                    <h6 style={{ margin: 0, cursor: "pointer", display: "inline-block" }}>
                      <img
                        src={conn.toUser.attributes.profilePicture}
                        className="friendpicture"
                        alt="profile"
                        style={{ margin: "20px", cursor: "pointer", verticalAlign: "middle" }}
                      />
                    </h6>
                  </td>
                </div>
              );
            })}
          </tr>
        </table>
      </div>
    </>
  );
};

export default Messages;
