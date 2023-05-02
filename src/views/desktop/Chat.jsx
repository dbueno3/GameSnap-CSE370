import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import NavbarOwn from "../../Component/NavbarOwn";
import "../styles/chat.css"

const Chat = () => {
  const params = useParams();
  const connId = params.connId;

  const [chatInput, setChatInput] = useState("");
  const [user, setUser] = useState("");
  const [connInfo, setConnInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const [userProfile, setUserProfile] = useState(null);



  //Get the connection
  useEffect(() => {
    //Get the current username
    fetch(process.env.REACT_APP_API_PATH + `/users/${sessionStorage.getItem("user")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.attributes.username);
      });
    // get the current user profile 
    fetch(process.env.REACT_APP_API_PATH + `/users/${sessionStorage.getItem("user")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result.attributes.profilePicture)
        console.log(result)
      });

    let pollInterval = null;

    const startPolling = () => {
      pollInterval = setInterval(() => {
        fetch(process.env.REACT_APP_API_PATH + `/connections/${connId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setConnInfo(result);
            if (result.attributes.chatHistory) {
              setMessages(result.attributes.chatHistory);
            }
          });
      }, 5000);
    };

    const stopPolling = () => {
      clearInterval(pollInterval);
    };

    startPolling();

    return () => {
      stopPolling();
    };
  }, []);

  const handleMessageSend = () => {
    fetch(process.env.REACT_APP_API_PATH + `/connections/${connId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        fromUserID: connInfo.fromUser.id,
        toUserID: connInfo.toUser.id,
        attributes: {
          conType: "chat",
          chatHistory: [
            ...messages,
            {
              id: messages.length + 1,
              from: user,
              to: connInfo.toUser.attributes.username,
              message: chatInput,
              timestamp: new Date().toISOString(),
            },
          ],
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.attributes.chatHistory) {
          setMessages(result.attributes.chatHistory);
        }
        setChatInput("");
      });
  };

  return (
    <>
      <NavbarOwn />
      <div class="chatRoom">
        {/* This is where i will display User Profile when they send a message */}
        <div>
          {messages.length > 0 &&
            messages.map((msg) => (
              <div key={msg.id}>
                <div className={`messageContainer ${msg.from === user ? "sent" : ""}`}>
                  {msg.from !== user && connInfo.toUser.attributes.profilePicture && (
                    <div className="userProfile">
                      <img src={connInfo.toUser.attributes.profilePicture} alt={`${connInfo.toUser.attributes.username}'s Profile`} />
                    </div>
                  )}
                  <div className="messageContent">
                    <p>
                      {msg.from}: {msg.message}
                    </p>
                  </div>
                  {msg.from !== user && connInfo.fromUser && connInfo.fromUser.attributes.profilePicture && (
                    <div className="userProfile">
                      <img src={connInfo.fromUser.attributes.profilePicture} alt={`${connInfo.fromUser.attributes.username}'s Profile`} />
                    </div>
                  )}

                  {msg.from === user && userProfile && (
                    <div className="userProfile">
                      <img src={userProfile} alt="User Profile" />
                    </div>
                  )}
                </div>
              </div>
            ))}

        </div>

        <div className="chatInputContainer">
          <input
            className="saySomethingContainer"
            type="text"
            placeholder="Say something nice"
            value={chatInput}
            onChange={(e) => {
              setChatInput(e.target.value);
            }}
          />
        </div>
        <div className="sendButtonContainer" onClick={handleMessageSend}>
          Send
        </div>
      </div>
    </>
  );



};

export default Chat;
