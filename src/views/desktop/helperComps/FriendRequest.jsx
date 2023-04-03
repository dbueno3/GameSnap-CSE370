const FriendRequest = (props) => {
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
          <p style={{ fontSize: "20px", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}>
            {props.requestUsername}
          </p>
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
          >
            ✗
          </button>
        </td>
      </tr>
    </table>
  );
};

export default FriendRequest;
