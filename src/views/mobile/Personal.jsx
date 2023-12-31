import "../mobile.css";
import Header from './Header';
import React from "react";
import ProfileGrid from "./ProfileGrid";
import BottomBar from "./BottomBar";


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
          Posts: [],
          Profile_Image:{},
          private: false
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
                  Profile_Image: result.attributes.Profile_Image || "",
                  private: result.attributes.private || false
                });
              }
              }
            },
            error => {
              alert("error!");
            }
          );
          fetch(process.env.REACT_APP_API_PATH + `/posts?authorID=${sessionStorage.getItem("user")}&sort=newest`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res) {
                this.setState({
                  Posts:res[0],
                });
              }
            });
        
      }
    render(){
        return(
        <div>
          <Header user={this.state}/>
          <ProfileGrid posts={this.state.Posts} />
          <BottomBar/>
        </div>
          

    );
    }
}
