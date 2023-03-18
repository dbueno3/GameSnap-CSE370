import React from 'react';
import { Link } from 'react-router-dom';
import './BottomBar.css';
import homeIcon from '../../assets/home.svg';
import searchIcon from '../../assets/search.svg';
import addIcon from '../../assets/add.svg';
import messageIcon from '../../assets/message.svg';
import profileIcon from '../../assets/user.png';

const BottomBar = () => {
  return (
    <div className="bottombar">
      <Link to="/posts">
        <img
          className="bottombar__icon"
          src={homeIcon || 'https://via.placeholder.com/20'}
          alt="Home"
        />
      </Link>
      <Link to="/search">
        <img
          className="bottombar__icon"
          src={searchIcon || 'https://via.placeholder.com/20'}
          alt="Search"
        />
      </Link>
      <Link to="/make_post_mobile">
        <img
          className="bottombar__icon"
          src={addIcon || 'https://via.placeholder.com/20'}
          alt="Create Post"
        />
      </Link>
      <Link to="/messages">
        <img
          className="bottombar__icon"
          src={messageIcon || 'https://via.placeholder.com/20'}
          alt="Messages"
        />
      </Link>
      <Link to="/personal">
        <img
          className="bottombar__icon"
          src={profileIcon || 'https://via.placeholder.com/20'}
          alt="Profile"
        />
      </Link>
    </div>
  );
};

export default BottomBar;