import "./ze.css";

import image from "./zechen.jpg";


const Ze = () => {
  return (
    <div id="body">
      <div id="main_body">
        <div id="left">
          <img alt="ze" id="abt_me_image" src={image} />
        </div>
        <div id="right">
          <div id="right_info">
            <h1 style={{ marginBottom: "0.25em" }}>Ze Chen</h1>
            <hr />
            <p>
            Hi, this is Ze. I am a junior of computer science major that aspire to become a 
            software developer in the future. I have experience in building web application 
            and machine learning. I am passionate about learning new stuffs and I can’t wait 
            to gain more valuable experience in front-end design from CSE 370.
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