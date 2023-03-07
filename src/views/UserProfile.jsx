//Blank profile
import BProfile from "../assets/blank_profile.png"

//CSS
import "./style.css"

const UserProfile = () => {
    return(
        <div id="ProfilePageMain">
            <img src={BProfile} alt="blank_profile" className="blankProfileImage"/>
            <h4>First Name: Austin</h4>
            <h4>Last Name: Tleon</h4>
            <h4>Username: atleon</h4>
            <h4>Email: austin@buffalo.edu</h4>
            <h4>Bio : Like to play games</h4>
        </div>
    )
}

export default UserProfile