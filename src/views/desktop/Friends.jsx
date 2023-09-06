import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FriendStatus from "./helperComps/FriendStatus.jsx";
import NavbarOwn from "../../Component/NavbarOwn.jsx";
import { BiSearch } from "react-icons/bi";

import Alert from "../../Component/Alert.jsx";

const Friends = () => {
  const [searchedUser, setSearchedUser] = useState("");
  const [renderStat, setRenderStat] = useState("active");
  const [currentNav, setCurrentNav] = useState("friends");
  let navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleOkButtonAction = () => {
    setShowAlert(false);
  };
  return (
    <>
      <NavbarOwn />
      <Alert showAlert={showAlert} message={errorMessage} alertType="error" okButtonAction={handleOkButtonAction} />
      <div id="friendPageMain">
        <div className="searchBoxContainer">
          <input
            className="searchbox"
            type="text"
            placeholder="username of a user"
            onChange={(e) => {
              setSearchedUser(e.target.value);
            }}
          />
          <BiSearch
            className="search"
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
                      // eslint-disable-next-line
                      setErrorMessage("user not fount");
                      handleShowAlert();
                    } else if (res[0][0].id === sessionStorage.getItem("user")) {
                      navigate(`/profile`);
                    } else {
                      navigate(`/search/${res[0][0].id}`);
                    }
                  }
                });
            }}
          ></BiSearch>
          <br />
        </div>
        <div id="friendStatusNav">
          <h6
            className="friendMenu"
            style={
              currentNav === "friends"
                ? { display: "inline-block", textDecoration: "underline", fontStyle: "italic" }
                : { display: "inline-block" }
            }
            onClick={(e) => {
              setRenderStat("active");
              setCurrentNav("friends");
            }}
          >
            Friends
          </h6>
          <h6
            className="friendMenu"
            style={
              currentNav === "pending"
                ? { display: "inline-block", textDecoration: "underline", fontStyle: "italic", marginLeft: "30px" }
                : { display: "inline-block", marginLeft: "30px" }
            }
            onClick={(e) => {
              setRenderStat("pending");
              setCurrentNav("pending");
            }}
          >
            Requests
          </h6>
          <h6
            className="friendMenu"
            style={
              currentNav === "blocked"
                ? { display: "inline-block", textDecoration: "underline", fontStyle: "italic", marginLeft: "30px" }
                : { display: "inline-block", marginLeft: "30px" }
            }
            onClick={(e) => {
              setRenderStat("blocked");
              setCurrentNav("blocked");
            }}
          >
            Blocked
          </h6>
        </div>
        <div id="friendStatusBody">
          <FriendStatus status={renderStat} />
        </div>
      </div>
    </>
  );
};

export default Friends;
