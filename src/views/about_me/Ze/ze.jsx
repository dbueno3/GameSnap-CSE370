import "./ze.css";

import image from "./zechen.png";

const Ze = () => {
  return (
    <div id="Ze_body">
      <div id="Ze_main_body">
        <div id="Ze_left">
          <img alt="ze" id="Ze_abt_me_image" src={image} />
        </div>
        <div id="Ze_right">
          <div id="Ze_right_info">
            <h1 style={{ marginBottom: "0.25em" }}>Ze Chen</h1>
            <hr />
            <p>
              Hi, this is Ze. I am a junior of computer science major that aspire to become a software developer in the
              future. I have experience in building web application and machine learning. I am passionate about learning
              new stuffs and I can’t wait to gain more valuable experience in front-end design from CSE 370.
              <br />
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ze;
