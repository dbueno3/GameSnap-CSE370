import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import homeIcon from '../../assets/home.svg';
import searchIcon from '../../assets/search.svg';
import addIcon from '../../assets/add.svg';
import messageIcon from '../../assets/message.svg';
import profileIcon from '../../assets/user.png';

const Nav = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <nav className="navbar">
      <Link to="/" className={`navbar-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabClick('home')}>
        <img src={homeIcon} alt="Home" />
        <span>Home</span>
      </Link>
      <Link to="/search" className={`navbar-item ${activeTab === 'search' ? 'active' : ''}`} onClick={() => handleTabClick('search')}>
        <img src={searchIcon} alt="Search" />
        <span>Search</span>
      </Link>
      <Link to="/add" className={`navbar-item ${activeTab === 'add' ? 'active' : ''}`} onClick={() => handleTabClick('add')}>
        <img src={addIcon} alt="Add" />
        <span>Add Post</span>
      </Link>
      <Link to="/messages" className={`navbar-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => handleTabClick('messages')}>
        <img src={messageIcon} alt="Message" />
        <span>Message</span>
      </Link>
      <Link to="/profile" className={`navbar-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabClick('profile')}>
        <img src={profileIcon} alt="Profile" />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default Nav;