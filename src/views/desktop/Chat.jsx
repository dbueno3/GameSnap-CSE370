import { useParams } from "react-router-dom";

import NavbarOwn from "../../Component/NavbarOwn";

import "../style.css";

const Chat = () => {
  const params = useParams();
  const connId = params.connId;
  return (
    <>
      <NavbarOwn />
      <h1>{connId}</h1>
      <div className="chatRoom">
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
    </>
  );
};

export default Chat;
