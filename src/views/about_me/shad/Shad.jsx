import "./shad.css";

//Image
import image from "./shad.png";
import gh from "./git.png";
import linkedIn from "./ln.png";
import twitter from "./twitter.png";

const Shad = () => {
  return (
    <div id="Shad_body">
      <div id="Shad_main_body">
        <div id="Shad_left">
          <img alt="shad" id="Shad_abt_me_image" src={image} />
        </div>
        <div id="Shad_right">
          <div id="Shad_right_info">
            <h1 style={{ marginBottom: "0.25em" }}>Shad Chowdhury</h1>
            <p style={{ marginTop: "0.25em", color: "grey" }}>
              <i>shad chou-dhoo-reeh</i>
            </p>
            <hr />
            <p>
              Hey everyone, the name's Shad. Computer Science major and a MS Candidate for Information System at
              University at Buffalo. I am a programmer, scholar, gamer, photographer, otaku and other stuff that I still
              haven't figured out yet. My journey in the USA began in 2015, I am made in bangladesh.
              <br />
              <br />
              Love to explore tech and always eager to learn more about it. Check out some of my work @{" "}
              <a href="https://www.shadman.dev">shadman.dev</a>
              <br />
              <br />
              <a href="https://github.com/thatonenerd2000?tab=repositories">
                <img src={gh} alt="githubLogo" className="social" />
              </a>
              <a href="https://www.linkedin.com/in/shadman-chowdhury-69427b123/">
                <img src={linkedIn} alt="linkedinLogo" className="social" />
              </a>
              <a href="https://twitter.com/_shadman_">
                <img src={twitter} alt="twitterLogo" className="social" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shad;
