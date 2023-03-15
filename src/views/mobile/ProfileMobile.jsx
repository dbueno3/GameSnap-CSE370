import React from "react";
import "../mobile.css";
import avatar from "../../assets/group.png"
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
// The Profile component shows data from the user table.  This is set up fairly generically to allow for you to customize
// user data by adding it to the attributes for each user, which is just a set of name value pairs that you can add things to
// in order to support your group specific functionality.  In this example, we store basic profile information for the user

export default class Profile_mobile extends React.Component {
  
  // The constructor will hold the default values for the state.  This is also where any props that are passed
  // in when the component is instantiated will be read and managed.  
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
    this.fieldChangeHandler.bind(this);
  }

  // This is the function that will get called every time we change one of the fields tied to the user data source.
  // it keeps the state current so that when we submit the form, we can pull the value to update from the state.  Note that
  // we manage multiple fields with one function and no conditional logic, because we are passing in the name of the state
  // object as an argument to this method.  
  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }

  
  // This is the function that will get called the first time that the component gets rendered.  This is where we load the current
  // values from the database via the API, and put them in the state so that they can be rendered to the screen.  
  componentDidMount() {
    console.log("In profile");
    console.log(this.props);

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

  // This is the function that will get called when the submit button is clicked, and it stores
  // the current values to the database via the api calls to the user and user_preferences endpoints
  submitHandler = event => {
    
    //keep the form from actually submitting, since we are handling the action ourselves via
    //the fetch calls to the API
    event.preventDefault();

    //make the api call to the user controller, and update the user fields (username, firstname, lastname)
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        attributes: {
          Name: this.state.Name,
          Username: this.state.Username,
          Website: this.state.Website,
          Bio: this.state.Bio,
          Email: this.state.Email,
          Phone: this.state.Phone,
        }
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            responseMessage: result.Status
          });
          console.log(result)
        },
        error => {
          alert("error!");
        }
      );
  };

  // This is the function that draws the component to the screen.  It will get called every time the
  // state changes, automatically.  This is why you see the username and firstname change on the screen
  // as you type them.
  render() {
    return (
      <div className="parents">
      <p className="edit-title">
      <div className="Cancel" style={{color:"black"}}>
        <Link to ="/personal" style={{textDecoration:'none', color:'Black'}}>Cancel</Link>
      </div>
      <div className="edit" style={{color:"black"}}>Edit profile</div>
      </p>
      <div>
        <img src={avatar} alt="profile_picture" className="profile_picture_mobile"></img>
      <p className="change-profile-photo" style={{color:"black"}}>Change Profile Photo</p>
      </div>
      <form onSubmit={this.submitHandler}>
        <div className='profileform'>       
        <label style={{color:"black"}}>
          <div className="name-field">
            Name:
          <input
            type="text"            
            className="box"
            placeholder="Your name.."
            onChange={e => this.fieldChangeHandler("Name", e)}
            value={this.state.Name}
          />
          </div>
          
        </label>
        <label style={{color:"black"}}>
        <div className="name-field">
          Username:
          <input
            className="box"
            type="text"
            placeholder="Your username.."
            onChange={e => this.fieldChangeHandler("Username", e)}
            value={this.state.Username}
          />
          </div>
        </label>
        <label style={{color:"black"}}>
        <div className="name-field">
          Website:
          <input
            className="box"
            type="text"
            placeholder="Your website.."
            onChange={e => this.fieldChangeHandler("Website", e)}
            value={this.state.Website}
          />
        </div>
        </label>
        <label style={{color:"black"}}>
        <div className="name-field">
          Bio:
          <input
            className="box"
            type="text"
            placeholder="Your bio.."
            onChange={e => this.fieldChangeHandler("Bio", e)}
            value={this.state.Bio}
          />
          </div>
        </label>
        <p style={{color:"black"}}>Private Information</p>
        <label style={{color:"black"}}>
        <div className="name-field">
          Email:
          <input
            className="box"
            type="text"
            placeholder="Your email.."
            onChange={e => this.fieldChangeHandler("Email", e)}
            value={this.state.Email}
          />
          </div>
        </label>
        <label style={{color:"black"}}>
        <div className="name-field">
          Phone:
          <input
            className="box"
            type="text"
            placeholder="Your phone.."
            onChange={e => this.fieldChangeHandler("Phone", e)}
            value={this.state.Phone}
          />
          </div>
        </label>
        </div> 
        <br></br>
        <input type="submit" className="edit-profile" value="Save" />
        <br></br>
        <input type="submit" className="delete-account"value="DELETE Account"/>
      </form>
      </div>
    );
  }
}
