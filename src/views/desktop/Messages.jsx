import { useState, useEffect } from "react";
import NavbarOwn from "../../Component/NavbarOwn";
import { useNavigate } from "react-router-dom";

import "../style.css";

import { BsArrowLeftRight } from "react-icons/bs";

const Messages = () => {
  let navigate = useNavigate();
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
        setConns((prevConns) => [...prevConns, ...result[0]]);
      });

    //Get the from "to" ids
    fetch(
      process.env.REACT_APP_API_PATH +
        `/connections?toUserID=${sessionStorage.getItem(
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
        setConns((prevConns) => [...new Set([...prevConns, ...result[0]])]);
      });
  }, []);
  return (
    <>
      <NavbarOwn />
      <div className="MessagesPage">
        <u>
          <h3>Message Threads</h3>
        </u>
        <table
          style={{
            marginTop: "50px",
            borderCollapse: "collapse",
            textAlign: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <tr>
            {conns.map((conn) => {
              return (
                <div>
                  <td
                    className="msgThread"
                    style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}
                    onClick={() => {
                      navigate(`/chat/${conn.id}`);
                    }}
                  >
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
                  <td>
                    <button
                      className="Block"
                      style={{ margin: "20px", cursor: "pointer", verticalAlign: "middle", backgroundColor: "red" }}
                      onClick={() => {
                        fetch(process.env.REACT_APP_API_PATH + `/connections/${conn.id}`, {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + sessionStorage.getItem("token"),
                          },
                        })
                          .then((response) => {
                            if (response.status === 204) {
                              setTimeout(() => {
                                window.location.reload();
                              }, 500);
                            } else {
                              console.log("Error:", response.status);
                            }
                          })
                          .catch((error) => {
                            console.error("Error:", error);
                          });
                      }}
                    >
                      Delete
                    </button>
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
