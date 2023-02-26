import "./daniel.css";

//Image
import image from "./daniel.png";
import github from "./git.png";
import linkedIn from "./ln.png";

const Daniel = () => {
  return (
    <div id="dan_body">
      <div id="dan_main_body">
        <div id="dan_left">
          <img alt="daniel" id="dan_abt_me_image" src={image} />
        </div>

        <div id="dan_right_info">
          <h1 style={{ marginBottom: "0.25em" }}>Daniel Bueno</h1>
          <p style={{ marginTop: "0.25em", color: "grey" }}></p>
          <hr />
          <p>
            Hello everyone, my name is Daniel. I am a third year Computer Science major at the University at Buffalo. I
            am a powerlifter, programmer, and a gamer. I have experience in web design and systems security. I strive to
            be a Full Stack Developer.
            <br />
            <br />
            <br />
            <br />
            <a href="https://github.com/dbueno3">
              <img src={github} alt="githubLogo" className="social" />
            </a>
            <a href="https://www.linkedin.com/in/dbueno3/">
              <img src={linkedIn} alt="linkedinLogo" className="social" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Daniel;
