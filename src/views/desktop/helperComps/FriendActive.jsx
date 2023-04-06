import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import ConfirmEditFriend from "../ConfirmEditFriend";
import { useState } from 'react';
const FriendActive = (props) => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)
  return (
    <table style={{ margin: "0", borderCollapse: "collapse" }}>
      <tr>
        <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
          <h6 style={{ margin: 0, cursor: "pointer" }}>
            <img
              src={props.profilePicture}
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
              navigate(`/search/${props.userId}`);
            }}
          >
            {props.username}
          </p>
          <BiEdit className="edit_friend" style={{width: "20px", height: "20px" ,verticalAlign: "middle", marginRight: "10px" }} onClick={() => setIsOpen(true)}/>
          <ConfirmEditFriend open={isOpen} onClose={() => setIsOpen(false)} profileimage={props.profilePicture} username={props.username}>
          </ConfirmEditFriend>
        </td>
      </tr>
    </table>
  );
};

export default FriendActive;
