import image from "../../assets/group.png";
import "../mobile.css";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import React from "react";

export default class Personal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          Name: "",
          Username: "",
          Website: "",
          Bio: "",
          Email: "",
          Phone:"",
          // NOTE : if you wanted to add another user attribute to the profile, you would add a corresponding state element here
        };
      }
    componentDidMount() {
        console.log("In profile");
    
        // fetch the user data, and extract out the attributes to load and display
        fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
          method: "get",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          }
        })
          .then(res => res.json())
          .then(
            result => {
              if (result) {
                console.log(result);
                if (result.attributes){
                this.setState({
                  // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                  // try and make the form component uncontrolled, which plays havoc with react
                  Name: result.attributes.Name || "",
                  Username: result.attributes.Username || "",
                  Website: result.attributes.Website || "",
                  Bio: result.attributes.Bio || "",
                  Email: result.attributes.Email || "",
                  Phone: result.attributes.Phone || "",
                });
              }
              }
            },
            error => {
              alert("error!");
            }
          );
    
        
      }
    render(){
        return(
        <div className="Parent">
            <img className="icon" alt="user's icon"src={image}></img>
            <div className="username">{this.state.Username}</div>
            <div className="name">{this.state.Name}</div>
            <div className="website">{this.state.Website}</div>
            <div className="bio">{this.state.Bio}</div>
            <Link to="/edit_profile_mobile" style={{textDecoration: 'none',color:'Black'}}>
            <input type="submit" className="Edit-profile" value="Edit-profile"/>
            </Link>
            <br></br>
            <Link to="/make_post_mobile" style={{textDecoration: 'none',color:'Black'}}>
            <input type="submit" className="Edit-profile" value="Make a post"/>
            </Link>
            
        </div>
    );
    }
}
