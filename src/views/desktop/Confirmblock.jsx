import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const modal_styles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#5F6A82",
  paddingTop: "50px",
  paddingBottom: "50px",
  paddingRight: "100px",
  paddingLeft: "100px",
  borderRadius: "25px",
  zIndex: 1000,
};

const overlay_styles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 1000,
};
const Confirmblock = ({ open, onClose, profileimage, username, friendId }) => {

  const block = (connId, from, to) => {
    fetch(process.env.REACT_APP_API_PATH + `/connections/${connId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        fromUserID: from,
        toUserID: to,
        attributes: {
          requestStatus: "blocked",
          blockInitiator: sessionStorage.getItem("user"),
        },
      }),
    });
  };

  const handleBlock = () => {
    //Get the right connectionID toUserID
    fetch(
      process.env.REACT_APP_API_PATH +
        `/connections?fromUserID=${sessionStorage.getItem(
          "user"
        )}&toUserID=${friendId}&attributes=%7B%0A%20%20%22path%22%3A%20%22requestStatus%22%2C%0A%20%20%22equals%22%3A%20%22active%22%0A%7D`,
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
        if (result[0].length <= 0) {
          return;
        } else {
          block(result[0][0].id, result[0][0].fromUserID, result[0][0].toUserID);
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //Get the right connectionID fromUserID
    fetch(
      process.env.REACT_APP_API_PATH +
        `/connections?fromUserID=${friendId}&toUserID=${sessionStorage.getItem(
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
      .then((result) => {
        if (result[0].length <= 0) {
          return;
        } else {
          block(result[0][0].id, result[0][0].fromUserID, result[0][0].toUserID);
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (!open) return null;
  return (
    <div style={overlay_styles}>
      <div style={modal_styles}>
        <AiOutlineCloseCircle
          className="close"
          onClick={() => {
            onClose();
          }}
        />
        <div style={{ marginBottom: "20px" }}>
          <img
            src={profileimage}
            style={{ verticalAlign: "middle", height: "35px", width: "35px", borderRadius: "100%" }}
            alt="edit_friend"
          />
          <span style={{ marginLeft: "20px", textAlign: "center", verticalAlign: "middle"}}>{username}</span>
        </div>
        <p style={{fontSize:'15px'}}>This user will no longer have access to any of your contents.</p>
        <div>
          <button
            className="Block"
            onClick={() => {
              handleBlock();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmblock;
