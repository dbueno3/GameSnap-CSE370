import { useNavigate } from "react-router-dom";

const FriendActive = (props) => {
  let navigate = useNavigate();
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
        </td>
      </tr>
    </table>
  );
};

export default FriendActive;
