import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import React from "react";
import Preview from "../../assets/image-preview.png";

export default class Make_Post extends React.Component{
    
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
          <div className="edit" style={{color:"black"}}>Make Your Post</div>
          <div className="post_mobile" style={{color:"black"}}>Post</div>
          </p>
          
          <form onSubmit={this.submitHandler} className="post_form_mobile">        
            <textarea className="post_message" type="text" placeholder="Say something..." onChange={e => this.fieldChangeHandler("Username", e)} />            
            <input type="submit" className="upload_image_mobile" value="Upload-image" />           
            
            <div className='preview_image'>
                <img src={Preview} alt="blank upload" className='preview_mobile'/>
                <img src={Preview} alt="blank upload" className='preview_mobile'/>
                <img src={Preview} alt="blank upload" className='preview_mobile'/>
                <img src={Preview} alt="blank upload" className='preview_mobile'/>
                <img src={Preview} alt="blank upload" className='preview_mobile'/>
                <img src={Preview} alt="blank upload" className='preview_mobile'/>
                <img src={Preview} alt="blank upload" className='preview_mobile'/>
                <img src={Preview} alt="blank upload" className='preview_mobile'/>
                <img src={Preview} alt="blank upload" className='preview_mobile'/>

            </div>
          </form>
          
          </div>
        );
      }
}