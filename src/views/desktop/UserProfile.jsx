//Router
import { useNavigate } from "react-router-dom";

import RenderProfile from "../../Component/RenderProfile.jsx";
import NavbarOwn from "../../Component/NavbarOwn.jsx";

const UserProfile = () => {
  let navigate = useNavigate();
  return (
    <>
      <NavbarOwn />
      <RenderProfile userId={sessionStorage.getItem("user")}>
        <button
          onClick={() => {
            navigate("/edit_profile");
          }}
        >
          Edit
        </button>
      </RenderProfile>
    </>
  );
};

export default UserProfile;
