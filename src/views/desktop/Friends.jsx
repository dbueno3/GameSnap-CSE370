import { useState } from "react";

const Friends = () => {
  const [searchedUser, setSearchedUser] = useState("");
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
                    console.log("user not found");
                  } else {
                    console.log(res[0][0]);
                  }
                }
              });
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Friends;
