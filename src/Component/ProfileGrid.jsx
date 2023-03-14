import React from 'react';
import './ProfileGrid.css';
import GridIcon from '../assets/gridicon.svg';

const ProfileGrid = ({ posts }) => {
  return (
    <div>
        <div>
            <img src={GridIcon}/>
        </div>
        <div className="profile-grid">
        {posts.map((post, index) => (
            <img
            key={index}
            className="grid__item"
            src={post.image}
            alt={post.caption}
            />
        ))}
        </div>
    </div>
  );
};

export default ProfileGrid;
