import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import NavbarOwn from "../../Component/NavbarOwn";

import "../style.css";

const Chat = () => {
  const params = useParams();
  const connId = params.connId;

  const [chatInput, setChatInput] = useState("");
  const [user, setUser] = useState("");
  const [connInfo, setConnInfo] = useState({});
  const [messages, setMessages] = useState([]);

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
        <div>
          {messages.length > 0 &&
            messages.map((msg) => (
              <div key={msg.id}>
                <p>
                  {msg.from}: {msg.message}
                </p>
              </div>
            ))}
        </div>
        <div className="chatInputContainer">
          <input
            style={{ width: "90%", bottom: 0, left: 0 }}
            className="chatInput"
            type="text"
            placeholder="Say something nice"
            value={chatInput}
            onChange={(e) => {
              setChatInput(e.target.value);
            }}
          />
          <button style={{ width: "8%", bottom: 0, right: 0 }} className="chatInput" onClick={handleMessageSend}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
