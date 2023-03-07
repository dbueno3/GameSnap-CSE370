import { React } from "react";
import Header from './Header';
import Myprofilecss from './Myprofilecss.css';
import userPic from '../assets/user.png';

function MyProfile() {
    const user = {
        username: 'johndoe',
        name: 'John Doe',
        bio: 'I love taking photos and traveling',
        posts: [1,2,3], // add this to match the expected property name in the Header component
        profilePic: userPic,
        profilePictureName: 'John Doe',
        following: 100,
        followers: 200
    };

    return (
        <div>
          <Header
        user={user}
      />
        </div>
      );
}

export default MyProfile;