import { useNavigate } from "react-router-dom";
import ConfirmEditFriend from "../ConfirmEditFriend";
import Confirmblock from "../Confirmblock";
import { useState } from "react";
const FriendActive = (props) => {
  let navigate = useNavigate();
  const [unfriendisOpen, setunfriendIsOpen] = useState(false);
  const [blockisOpen, setblockIsOpen] = useState(false);
  return (
    <table style={{ margin: "0", borderCollapse: "collapse" }}>
      <tr>
        <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
          <h6 style={{ margin: 0, cursor: "pointer" }}>
            <img
              src={props.profilePicture}
              className="friendpicture"
              alt="profile"
              style={{ margin: "20px", cursor: "pointer", verticalAlign: "middle" }}
            />
          </h6>
        </td>
        <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px", paddingRight: "20px" }}>
          <p className="friendname"
            onClick={() => {
              navigate(`/search/${props.userId}`);
            }}
          >
            {props.username}
          </p>
          
          <button className="Unfriend" 
            onClick={() => setunfriendIsOpen(true)}
            >Unfriend</button>
            
          <button className="Block"
            onClick={() => setblockIsOpen(true)}
            >Block</button>

          <ConfirmEditFriend
            open={unfriendisOpen}
            onClose={() => setunfriendIsOpen(false)}
            profileimage={props.profilePicture}
            username={props.username}
            friendId={props.userId}
          ></ConfirmEditFriend>

          <Confirmblock
            open={blockisOpen}
            onClose={() => setblockIsOpen(false)}
            profileimage={props.profilePicture}
            username={props.username}
            friendId={props.userId}
          ></Confirmblock>
        </td>
      </tr>
    </table>
  );
};

export default FriendActive;
