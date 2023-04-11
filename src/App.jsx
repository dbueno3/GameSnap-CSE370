/*
  App.js is the starting point for the application.   All of the components in your app should have this file as the root.
  This is the level that will handle the routing of requests, and also the one that will manage communication between
  sibling components at a lower level.  It holds the basic structural components of navigation, content, and a modal dialog.
*/

import React from "react";
// import "./App.css";
import PostForm from "./Component/PostForm.jsx";
import FriendList from "./Component/FriendList.jsx";
import GroupList from "./Component/GroupList.jsx";
import LoginForm from "./Component/LoginForm.jsx";
import Profile from "./Component/Profile.jsx";
import FriendForm from "./Component/FriendForm.jsx";
import Modal from "./Component/Modal.jsx";
import Promise from "./Component/Promise.jsx";

//Landing
import Landing from "./views/desktop/Landing.jsx";

//About Me
import Shad from "./views/about_me/shad/Shad.jsx";
import Ze from "./views/about_me/Ze/ze.jsx";
import Daniel from "./views/about_me/daniel/daniel.jsx";
import Eric from "./views/about_me/Eric/Eric.jsx";

//User
import SignUp from "./views/desktop/SignUp.jsx";
import Login from "./views/desktop/Login.jsx";
import EditProfile from "./views/desktop/EditProfile.jsx";
import UserProfile from "./views/desktop/UserProfile.jsx";

import Home from "./views/desktop/Home.jsx";
import UserPosts from "./views/desktop/UserPosts.jsx";
import CreatePost from "./views/desktop/CreatePost.jsx";
import Make_Post from "./views/mobile/MakePost.jsx";
import Personal from "./views/mobile/Personal.jsx";
import Profile_mobile from "./views/mobile/ProfileMobile.jsx";
import Posts_mobile from "./views/mobile/PostsMobile.jsx";
import CommentPostExampleMobile from "./views/mobile/CommentPostExampleMobile.jsx";
import SignUpMobile from "./views/mobile/Signupmobile.jsx";
import LoginMobile from "./views/mobile/LoginMobile.jsx";
import MobileHome from "./views/mobile/MobileHome";
import EditPosts from "./views/desktop/EditPost.jsx";

import Friends from "./views/desktop/Friends.jsx";
import SearchedFriend from "./views/desktop/SearchedFriend.jsx";

import RenderPost from "./Component/RenderPost.jsx";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// toggleModal will both show and hide the modal dialog, depending on current state.  Note that the
// contents of the modal dialog are set separately before calling toggle - this is just responsible
// for showing and hiding the component
function toggleModal(app) {
  app.setState({
    openModal: !app.state.openModal,
  });
}

// the App class defines the main rendering method and state information for the app
class App extends React.Component {
  // the app holds a few state items : whether or not the modal dialog is open, whether or not we need to refresh
  // the post list, and whether or not the login or logout actions have been triggered, which will change what the
  // user can see (many features are only available when you are logged in)
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      refreshPosts: false,
      logout: false,
      login: false,
    };

    // in the event we need a handle back to the parent from a child component,
    // we can create a reference to this and pass it down.
    this.mainContent = React.createRef();

    // since we are passing the following methods to a child component, we need to
    // bind them, otherwise the value of "this" will mean the child, and not the app
    this.doRefreshPosts = this.doRefreshPosts.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  // on logout, pull the session token and user from session storage and update state
  logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.setState({
      logout: true,
      login: false,
    });
  };

  // on login, update state and refresh the posts
  login = () => {
    this.setState({
      login: true,
      logout: false,
      refreshPosts: true,
    });
  };

  // doRefreshPosts is called after the user logs in, to display relevant posts.
  // there are probably more elegant ways to solve this problem, but this is... a way
  doRefreshPosts = () => {
    console.log("CALLING DOREFRESHPOSTS IN APP");
    this.setState({
      refreshPosts: true,
    });
  };

  componentDidMount() {
    window.addEventListener("click", (e) => {
      console.log("TESTING EVENT LISTENER");
    });
  }

  render() {
    return (
      // the app is wrapped in a router component, that will render the
      // appropriate content based on the URL path.  Since this is a
      // single page app, it allows some degree of direct linking via the URL
      // rather than by parameters.  Note that the "empty" route "/", which has
      // the same effect as /posts, needs to go last, because it uses regular
      // expressions, and would otherwise capture all the routes.  Ask me how I
      // know this.
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <header className="App-header">
            {/* <Navbar toggleModal={(e) => toggleModal(this, e)} logout={this.logout} /> */}

            <div className="maincontent" id="mainContent">
              <Routes>
                <Route path="/settings" element={<Settings login={this.login} />} />
                {/* <Route path="/friends" element={<Friends login={this.login} />} /> */}
                <Route path="/groups" element={<Groups login={this.login} />} />
                <Route
                  path="/postsGiven"
                  element={
                    <Posts
                      doRefreshPosts={this.doRefreshPosts}
                      login={this.login}
                      apprefresh={this.state.refreshPosts}
                    />
                  }
                />
                <Route path="/promise" element={<Promise />} />
                <Route path="/about-team" element={<Landing />} />
                {/* {Users Profile} */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Login />} />
                <Route path="/edit_profile" element={<EditProfile />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/personal" element={<Personal login={this.login} />} />
                <Route path="/edit_profile_mobile" element={<Profile_mobile login={this.login} />} />
                <Route path="/make_post_mobile" element={<Make_Post login={this.login} />} />
                <Route path="/mobilehome" element={<MobileHome />} />
                <Route path="/edit_posts" element={<EditPosts login={this.login} />} />

                {/* {Mobile Signin, Signup Example} */}
                <Route path="/mobilesignup" element={<SignUpMobile />} />
                <Route path="/mobilelogin" element={<LoginMobile />} />

                {/* {Mobile Comment Example} */}
                <Route path="/mobilecomment" element={<CommentPostExampleMobile />} />
                {/* {Contents} */}
                <Route path="/create_post" element={<CreatePost />} />
                <Route path="/user_posts" element={<UserPosts />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/search/:userId" element={<SearchedFriend />} />
                <Route path="/home" element={<Home />} />

                {/* About Me Pages */}
                <Route path="/about/dev/Shad" element={<Shad />} />
                <Route path="/about/dev/Ze" element={<Ze />} />
                <Route path="/about/dev/Daniel" element={<Daniel />} />
                <Route path="/about/dev/Eric" element={<Eric />} />

                {/* Test pages */}
                <Route path="/test/renderPost/:userId" element={<RenderPost />} />
              </Routes>
            </div>
          </header>

          <Modal show={this.state.openModal} onClose={(e) => toggleModal(this, e)}>
            This is a modal dialog!
          </Modal>
        </div>
      </Router>
    );
  }
}

const Settings = (props) => {
  // if the user is not logged in, show the login form.  Otherwise, show the post form
  if (!sessionStorage.getItem("token")) {
    console.log("LOGGED OUT");
    return (
      <div>
        <p>CSE 370 Social Media Test Harness</p>
        <LoginForm login={props.login} />
      </div>
    );
  }
  return (
    <div className="settings">
      <p>Settings</p>
      <Profile userid={sessionStorage.getItem("user")} />
    </div>
  );
};

// const Friends = (props) => {
//   // if the user is not logged in, show the login form.  Otherwise, show the post form
//   if (!sessionStorage.getItem("token")) {
//     console.log("LOGGED OUT");
//     return (
//       <div>
//         <p>CSE 370 Social Media Test Harness</p>
//         <LoginForm login={props.login} />
//       </div>
//     );
//   }
//   return (
//     <div>
//       <p>Friends</p>
//       <FriendForm userid={sessionStorage.getItem("user")} />
//       <FriendList userid={sessionStorage.getItem("user")} />
//     </div>
//   );
// };

const Groups = (props) => {
  // if the user is not logged in, show the login form.  Otherwise, show the post form
  if (!sessionStorage.getItem("token")) {
    console.log("LOGGED OUT");
    return (
      <div>
        <p>CSE 370 Social Media Test Harness</p>
        <LoginForm login={props.login} />
      </div>
    );
  }
  return (
    <div>
      <p>Join a Group!</p>
      <GroupList userid={sessionStorage.getItem("user")} />
    </div>
  );
};

const Posts = (props) => {
  console.log("RENDERING POSTS");
  console.log(typeof props.doRefreshPosts);

  console.log("TEST COMPLETE");

  // if the user is not logged in, show the login form.  Otherwise, show the post form
  if (!sessionStorage.getItem("token")) {
    console.log("LOGGED OUT");
    return (
      <div>
        <p>CSE 370 Social Media Test Harness</p>
        <LoginForm login={props.login} />
      </div>
    );
  } else {
    console.log("LOGGED IN");
    return (
      <div>
        <p>CSE 370 Social Media Test Harness</p>
        <PostForm refresh={props.apprefresh} />
      </div>
    );
  }
};

// export the app for use in index.js
export default App;
