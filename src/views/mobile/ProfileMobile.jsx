import React from "react";
import avatar from "../../assets/group.png";
import userPic from "../../assets/user.png";
import { FaUserCircle } from "react-icons/fa";
import NavbarOwn from "../../Component/NavbarOwn.jsx";
import Alert from "../../Component/Alert.jsx";

import rainbowSeigeImage from "../../assets/rainbowseige.jpeg";
import fortniteImage from "../../assets/fortnite.jpg";
import minecraftImage from "../../assets/minecraft.png";
import modernWarfareImage from "../../assets/modernwarfare.jpg";

import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
// The Profile component shows data from the user table.  This is set up fairly generically to allow for you to customize
// user data by adding it to the attributes for each user, which is just a set of name value pairs that you can add things to
// in order to support your group specific functionality.  In this example, we store basic profile information for the user
function withNavigate(WrappedComponent) {
  return function WithNavigate(props) {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
  };
}


class Profile_mobile extends React.Component {
  // The constructor will hold the default values for the state.  This is also where any props that are passed
  // in when the component is instantiated will be read and managed.
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      website: "",
      bio: "",
      email: "",
      Phone: "",
      profilePicture: "",
      topics: "",
      twitch: "",
      youtube: "",
      private: false,
      games: [],
      showAlert: false,
      // NOTE : if you wanted to add another user attribute to the profile, you would add a corresponding state element here
    };
    this.fieldChangeHandler.bind(this);
    
  }
  

  // This is the function that will get called every time we change one of the fields tied to the user data source.
  // it keeps the state current so that when we submit the form, we can pull the value to update from the state.  Note that
  // we manage multiple fields with one function and no conditional logic, because we are passing in the name of the state
  // object as an argument to this method.
  fieldChangeHandler(field, value) {
    console.log("field change");
    this.setState({
      [field]: value,
    });
  }
  handleShowAlert = () => {
    window.scrollTo(0, 0);
    this.setState({ showAlert: true });
  };
  

  handleConfirmDelete = () => {
    this.setState({ showAlert: false });
    fetch(
      process.env.REACT_APP_API_PATH + `/users/${sessionStorage.getItem("user")}?relatedObjectsAction=delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("email");
          this.props.navigate("/");
        } else {
          alert("Error:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    this.props.navigate("/");
  };
  

  handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const { games } = this.state;

    if (checked) {
      this.setState({
        games: [...games, value],
      });
    } else {
      this.setState({
        games: games.filter((game) => game !== value),
      });
    }
  };

  // This is the function that will get called the first time that the component gets rendered.  This is where we load the current
  // values from the database via the API, and put them in the state so that they can be rendered to the screen.
  componentDidMount() {
    console.log("In profile");
    console.log(this.props);

    // fetch the user data, and extract out the attributes to load and display
    fetch(process.env.REACT_APP_API_PATH + "/users/" + sessionStorage.getItem("user"), {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            console.log(result);
            if (result.attributes) {
              this.setState({
                // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                // try and make the form component uncontrolled, which plays havoc with react
                firstName: result.attributes.firstName || "",
                lastName: result.attributes.lastName || "",
                username: result.attributes.username || "",
                website: result.attributes.website || "",
                bio: result.attributes.bio || "",
                email: result.attributes.email || "",
                phone: result.attributes.phone || "",
                profilePicture: result.attributes.profilePicture || "",
                Topics: result.attributes.Topics || "",
                youtube: result.attributes.youtube || "",
                twitch: result.attributes.twitch || "",
                private: result.attributes.private || false,
                games: result.attributes.games || [],
              });
            }
          }
        },
        (error) => {
          alert("error!");
        }
      );
  }

  // This is the function that will get called when the submit button is clicked, and it stores
  // the current values to the database via the api calls to the user and user_preferences endpoints
  submitHandler = (event) => {
    //keep the form from actually submitting, since we are handling the action ourselves via
    //the fetch calls to the API
    event.preventDefault();
    //make the api call to the user controller, and update the user fields (username, firstname, lastname)
    fetch(process.env.REACT_APP_API_PATH + "/users/" + sessionStorage.getItem("user"), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        attributes: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          website: this.state.website,
          bio: this.state.bio,
          email: this.state.email,
          phone: this.state.phone,
          posts: this.state.posts,
          profilePicture: this.state.profilePicture,
          Topics: this.state.Topics,
          twitch: this.state.twitch,
          youtube: this.state.youtube,
          private: this.state.private,
          games: this.state.games,
        },
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            responseMessage: result.Status,
          });
          console.log(result);
          //wait for 20 seconds
          setTimeout(() => {}, 20000);
          this.props.navigate("/profile");
        },
        (error) => {
          alert("error!");
        }
      );
  };

  // This is the function that draws the component to the screen.  It will get called every time the
  // state changes, automatically.  This is why you see the username and firstname change on the screen
  // as you type them.
  render() {
    const checkboxOptions = [
      { id: 1, text: "Rainbow Siege", image: rainbowSeigeImage },
      { id: 2, text: "Fortnite", image: fortniteImage },
      { id: 3, text: "Minecraft", image: minecraftImage },
      { id: 4, text: "Modern Warfare", image: modernWarfareImage },
      // Add more checkbox options as needed
    ];

    
    return (
      <div style={{paddingBottom:200}}>
      <NavbarOwn />
      <div className="container">
      <Alert
        showAlert={this.state.showAlert}
        message="Are you sure you want to delete your account?"
        alertType="error"
        okButtonAction={this.handleConfirmDelete}
        cancelButtonAction={() => this.setState({ showAlert: false })}
      />
        <form onSubmit={this.submitHandler}>
          <input
            type="file"
            id="profile_image_upload"
            style={{ display: "none" }}
            onChange={(event) => {
              console.log("Image Changed");
              const file = event.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);

              reader.onload = () => {
                const profilePicture = reader.result;
                this.setState({ profilePicture });
              };
            }}
          />
          {this.state.profilePicture ? (
            <img
              src={this.state.profilePicture}
              width={80}
              height={80}
              alt="profile_picture"
              onClick={() => {
                document.getElementById("profile_image_upload").click();
              }}
            ></img>
          ) : (
            <FaUserCircle
              size={80}
              style={{ margin: "20px", cursor: "pointer" }}
              onClick={() => {
                document.getElementById("profile_image_upload").click();
              }}
            />
          )}
          <br />
          <p className="change-profile-photo" style={{ color: "white" }}>
            Change Profile Photo
          </p>
          <div className="profileform">
            <label style={{ color: "black" }}>
              <div className="name-field">
                First Name:
                <input
                  type="text"
                  placeholder="Your name.."
                  onChange={(e) => this.fieldChangeHandler("firstName", e.target.value)}
                  value={this.state.firstName}
                />
              </div>
            </label>

            <label style={{ color: "black" }}>
              <div className="name-field">
                Last Name:
                <input
                  type="text"
                  placeholder="Your name.."
                  onChange={(e) => this.fieldChangeHandler("lastName", e.target.value)}
                  value={this.state.lastName}
                />
              </div>
            </label>

            <label style={{ color: "black" }}>
              <div className="name-field">
                Username:
                <input
                  type="text"
                  placeholder="Your username.."
                  onChange={(e) => this.fieldChangeHandler("username", e.target.value)}
                  value={this.state.username}
                />
              </div>
            </label>
            <label style={{ color: "black" }}>
              <div className="name-field">
                Website:
                <input
                  className="box"
                  type="text"
                  placeholder="Your website.."
                  onChange={(e) => this.fieldChangeHandler("website", e.target.value)}
                  value={this.state.website}
                />
              </div>
            </label>
            <label style={{ color: "black" }}>
              <div className="name-field">
                Bio:
                <input
                  className="box"
                  type="text"
                  placeholder="Your bio.."
                  onChange={(e) => this.fieldChangeHandler("bio", e.target.value)}
                  value={this.state.bio}
                />
              </div>
            </label>
            <label style={{ color: "black" }}>
              <div className="name-field">
                Topics:
                <input
                  className="box"
                  type="text"
                  placeholder="Add topics separated by comma"
                  onChange={(e) => this.fieldChangeHandler("Topics", e.target.value)}
                  value={this.state.Topics}
                />
              </div>
              <div className="name-field">
                Twitch:
                <input
                  className="box"
                  type="text"
                  placeholder="Twitch link"
                  onChange={(e) => this.fieldChangeHandler("twitch", e.target.value)}
                  value={this.state.twitch}
                />
              </div>
              <div className="name-field">
                Youtube:
                <input
                  className="box"
                  type="text"
                  placeholder="Youtube link"
                  onChange={(e) => this.fieldChangeHandler("youtube", e.target.value)}
                  value={this.state.youtube}
                />
              </div>

              <div className="checkbox-container">
                Games
                {checkboxOptions.map((option) => (
                  <label key={option.id} className="checkbox-label">
                    <div className="checkbox-content">
                      <input
                        type="checkbox"
                        className="checkbox-profile"
                        value={option.text}
                        checked={this.state.games.includes(option.text)}
                        onChange={this.handleCheckboxChange}
                      />
                      <img src={option.image} width={100} height={100} alt={option.text} className="checkbox-image" />
                      <span className="checkbox-text">{option.text}</span>
                    </div>
                  </label>
                ))}
              </div>
            </label>
            <br />
            <div className="tooltip">
              Private Profile
              <span className="tooltip-text">
                Private profile will only share your posts with people who follow you
              </span>
            </div>
            <input
              className="left-text left-checkbox"
              type="checkbox"
              onChange={(e) => this.fieldChangeHandler("private", e.target.checked)}
              checked={this.state.private}
            />
            <p>Private Information</p>
            <label style={{ color: "black" }}>
              <div className="name-field">
                Email:
                <input
                  className="box"
                  type="text"
                  placeholder="Your email.."
                  onChange={(e) => this.fieldChangeHandler("email", e.target.value)}
                  value={this.state.email}
                />
              </div>
            </label>
            <label style={{ color: "black" }}>
              <div className="name-field">
                Phone:
                <input
                  className="box"
                  type="text"
                  placeholder="Your phone.."
                  onChange={(e) => this.fieldChangeHandler("phone", e.target.value)}
                  value={this.state.phone}
                />
              </div>
            </label>
            <input type="submit" className="submit-button" value="Save" /> 
          </div>
        </form>
        <button
              className="submit-button"
              onClick={() => {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                this.props.navigate("/")
              }}
        >
          Logout
        </button>
        <button
              className="submit-button"
              onClick={() => {
            fetch(process.env.REACT_APP_API_PATH + `/auth/request-reset`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
              body: JSON.stringify({
                email: sessionStorage.getItem("email"),
              }),
            })
              .then((response) => {
                if (response.status === 200) {
                  this.props.navigate("/reset_password");
                } else {
                  alert("Error:", response.status);
                }
              })
              .catch((error) => {
                alert("An error occurred while sending the token to your email. Please try again later.");
              });
          }}
        >
          Reset Password
        </button>
        <button
          className="submit-button red"
          value="Delete Account"
          onClick={this.handleShowAlert}
        >
          Delete Account
        </button>
      </div>
      </div>
    );
  }
}
export default withNavigate(Profile_mobile);
