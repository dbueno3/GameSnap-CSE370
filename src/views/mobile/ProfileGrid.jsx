import React from 'react';
import './ProfileGrid.css';
import GridIcon from '../../assets/gridicon.svg';

const ProfileGrid = ({ posts }) => {
  return (
    <div>
        <div>
            <img src={GridIcon}/>
        </div>
        <div className="profile-grid">
        {posts.map((post, index) => (            

        post.attributes.mediaUrl && post.attributes.mediaUrl.endsWith('mp4')?(
        <video src={post.attributes.mediaUrl} className="grid__item"/>
        ):(
        <img src={post.attributes.mediaUrl} className="grid__item" alt={post.attributes.caption}/>
        )
        ))}
        </div>
    </div>
  );
};

export default ProfileGrid;