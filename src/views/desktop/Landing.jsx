import "../styles/landing.css";
import NavbarOwn from "../../Component/NavbarOwn.jsx";

//Router
import { useNavigate } from "react-router-dom";

const Landing = () => {
  let navigate = useNavigate();
  return (
    <div id="landing">
      <NavbarOwn></NavbarOwn>
      <br />
      <h1>Meet the Devs</h1>
      <hr />
      <div id="devTeam">
        <button
          className="button"
          onClick={(e) => {
            navigate("/about/dev/Shad");
          }}
        >
          Shad
        </button>
        <button
          className="button"
          onClick={(e) => {
            navigate("/about/dev/Ze");
          }}
        >
          Ze
        </button>
        <button
          className="button"
          onClick={(e) => {
            navigate("/about/dev/Daniel");
          }}
        >
          Daniel
        </button>
        <a href="./dheeraj.html">
          <button className="button">Dheeraj</button>
        </a>
        <button
          className="button"
          onClick={(e) => {
            navigate("/about/dev/Eric");
          }}
        >
          Eric
        </button>
      </div>
    </div>
  );
};

export default Landing;
