import { React } from "react";
import Header from './Header';
import Myprofilecss from './Myprofilecss.css';
import userPic from '../assets/user.png';
import puppyPicture from '../assets/puppy.jpg';
import sunsetPicture from '../assets/sunset.jpg';
import ProfileGrid from "./ProfileGrid";

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

    const posts = [
      {
        id: 1,
        image: sunsetPicture,
        caption: "Beautiful sunset",
      },
      {
        id: 2,
        image: puppyPicture,
        caption: "Cute puppy",
      },
      {
        id: 3,
        image: sunsetPicture,
        caption: "Beautiful sunset",
      },

    ];

    return (
        <div>
          <Header user={user}/>
          <ProfileGrid posts={posts} />
        </div>
      );
}

export default MyProfile;