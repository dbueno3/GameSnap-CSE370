import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";


const modal_styles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "350px",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#5F6A82",
  paddingTop: "50px",
  paddingBottom: "50px",
  paddingRight: "20px",
  paddingLeft: "20px",
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

const CommentModal = ({open, onClose, posterimage,postername,postimage,postcontent}) => {

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
        <div key={postcontent} className="homePost">
                  <table style={{ margin: "0", borderCollapse: "collapse" }}>
                    <tr>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                      {posterimage ? (
                        <img
                          src={posterimage}
                          className="homeFeedProfilePicture"
                          alt="profile"
                          style={{ margin: "20px", cursor: "pointer" }}
                        />
                      ) : (
                        <FaUserCircle
                          className="homeFeedProfilePicture"
                          size={40}
                          style={{ margin: "20px", cursor: "pointer" }}
                        />
                      )}
                      </td>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                        <h6 style={{ margin: 0, cursor: "pointer" }}>{postername}</h6>
                      </td>
                    </tr>
                  </table>
                  <img alt="post" src={postimage} className="homePostImage" />
                  <p>&nbsp;&nbsp;{postername}: {posterimage}</p>
                </div>
      </div>
    </div>
  );
};

export default CommentModal;