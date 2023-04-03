import { useState } from "react";

import { useNavigate } from "react-router-dom";
const FriendRequest = (props) => {
  const [status, setStatus] = useState("pending");
  let navigate = useNavigate();

  const handleAccept = () => {
    fetch(process.env.REACT_APP_API_PATH + `/connections/${props.requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        fromUserID: props.requestUserId,
        toUserID: sessionStorage.getItem("user"),
        attributes: {
          requestStatus: "active",
        },
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setStatus("accepted");
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
  };

  const handleReject = () => {
    fetch(process.env.REACT_APP_API_PATH + `/connections/${props.requestId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 204) {
          setStatus("rejected");
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
  };

  return (
    <table style={{ margin: "0", borderCollapse: "collapse" }}>
      <tr>
        <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
          <h6
            style={{ margin: 0, cursor: "pointer" }}
            onClick={() => {
              // navigate("/create_post");
            }}
          >
            <img
              src={props.requestImage}
              className="homeFeedProfilePicture"
              alt="profile"
              style={{ margin: "20px", cursor: "pointer", verticalAlign: "middle" }}
            />
          </h6>
        </td>
        <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "20px" }}>
          <p
            style={{ fontSize: "20px", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
            onClick={() => {
              navigate(`/search/${props.requestUserId}`);
            }}
          >
            {props.requestUsername}
          </p>
          {status === "pending" && (
            <>
              <button
                style={{
                  backgroundColor: "green",
                  cursor: "pointer",
                  color: "white",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border: "none",
                  fontSize: "20px",
                  verticalAlign: "middle",
                }}
                onClick={handleAccept}
              >
                ✓
              </button>
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border: "none",
                  fontSize: "20px",
                  verticalAlign: "middle",
                }}
                onClick={handleReject}
              >
                ✗
              </button>
            </>
          )}
          {status === "accepted" && (
            <p
              style={{
                fontSize: "20px",
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "10px",
                fontStyle: "italic",
                color: "teal",
              }}
            >
              Accepted
            </p>
          )}
          {status === "rejected" && (
            <p
              style={{
                fontSize: "20px",
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "10px",
                fontStyle: "italic",
                color: "red",
              }}
            >
              Rejected
            </p>
          )}
        </td>
      </tr>
    </table>
  );
};

export default FriendRequest;
