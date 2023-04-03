import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Friends = () => {
  const [searchedUser, setSearchedUser] = useState("");
  let navigate = useNavigate();
  return (
    <div id="friendPageMain">
      <div id="searchBoxContainer">
        <input
          type="text"
          style={{ width: "50vw" }}
          placeholder="username of a user"
          onChange={(e) => {
            setSearchedUser(e.target.value);
          }}
        />
        <button
          onClick={() => {
            fetch(
              process.env.REACT_APP_API_PATH +
                `/users?attributes=%7B%0A%20%20%22path%22%3A%20%22username%22%2C%0A%20%20%22equals%22%3A%20%22${searchedUser}%22%0A%7D`,
              {
                method: "get",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
              }
            )
              .then((res) => res.json())
              .then((res) => {
                if (res) {
                  if (res[0][0] === undefined) {
                    alert("user not found");
                    // eslint-disable-next-line
                  } else if (res[0][0].id == sessionStorage.getItem("user")) {
                    navigate(`/profile`);
                  } else {
                    navigate(`/search/${res[0][0].id}`);
                  }
                }
              });
          }}
        >
          Search
        </button>
        <br />
      </div>
      <div id="friendStatusNav">
        <h6 style={{ display: "inline-block" }}>Friends</h6>
        <h6 style={{ display: "inline-block", marginLeft: "10px" }}>Requests</h6>
      </div>
    </div>
  );
};

export default Friends;