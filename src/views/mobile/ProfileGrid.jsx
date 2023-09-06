import React from 'react';
import './ProfileGrid.css';
import GridIcon from '../../assets/gridicon.svg';
//import { Link, useNavigate } from 'react-router-dom';

const ProfileGrid = ({ posts }) => {
  console.log(posts)
  const navigate = useNavigate();
  const jump = (data) => {
    navigate('/mobilecomment',{state:data});
  }
  return (
    <div>
        <div className='GridIcon'>
            <img src={GridIcon}/>
        </div>
        <div className="profile-grid">
        {posts.map((post, index) =>
        (post.attributes.mediaUrl && post.attributes.mediaUrl.endsWith('mp4')?( 
        <video src={post.attributes.mediaUrl} className="grid__item" onClick={()=>jump(post)}/>
        ):(
        <img src={post.attributes.mediaUrl} className="grid__item" alt={post.attributes.caption} onClick={()=>jump(post)}/>
        )
        ))}
        </div>
    </div>
  );
};

export default ProfileGrid;