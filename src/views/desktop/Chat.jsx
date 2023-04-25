import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import NavbarOwn from "../../Component/NavbarOwn";

import "../style.css";

const Chat = () => {
  const params = useParams();
  const connId = params.connId;
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "John",
      to: "Mary",
      message: "Hello Mary, how are you?",
      timestamp: "2022-04-25T12:34:56Z",
    },
    {
      id: 2,
      from: "Mary",
      to: "John",
      message: "Hi John, I'm good, thanks! How about you?",
      timestamp: "2022-04-25T12:35:23Z",
    },
    {
      id: 3,
      from: "John",
      to: "Mary",
      message: "I'm doing well, thanks!",
      timestamp: "2022-04-25T12:36:12Z",
    },
  ]);

  //Get the connection
  useEffect(() => {
    fetch(process.env.REACT_APP_API_PATH + `/connections/${connId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }, []);

  return (
    <>
      <NavbarOwn />
      <div class="chatRoom">
        <div>
          {messages.map((msg) => (
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
          />
          <button style={{ width: "8%", bottom: 0, right: 0 }} className="chatInput">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
