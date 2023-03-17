import React, { useState } from 'react';
import './CommentPostExampleMobile.css';
import LikeImage from '../../assets/like.png';
import {useLocation} from 'react-router-dom'

const CommentPostExampleMobile = () => {
  const [comments, setComments] = useState([
    { id: 1, user: 'Jane Smith', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, user: 'Bob Johnson', comment: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  
  const handleEditComment = (id, comment) => {
    setIsEditMode(true);
    setEditCommentId(id);
    setNewComment(comment);
  };
  const location = useLocation();

  const handleUpdateComment = () => {
    if (newComment.trim() === '') {
      setError('Comment cannot be empty');
      return;
    }
    const updatedComments = comments.map((comment) =>
      comment.id === editCommentId ? { ...comment, comment: newComment } : comment
    );
    setComments(updatedComments);
    setNewComment('');
    setIsEditMode(false);
    setEditCommentId(null);
  };
  

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      setError('Comment cannot be empty');
      return;
    }
    const newComments = [...comments, { id: generateId(), user: 'John Doe', comment: newComment }];
    setComments(newComments);
    setNewComment('');
  };

  const setError = (error) => {
    console.error(error);
    window.alert(error);
  };

  const generateId = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNumber}`;
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const filteredComments = comments.filter((comment) => comment.user === 'John Doe');
  return (
<div className="mobilePost">
      <div className="mobilePost-header">
        <img src="https://picsum.photos/50" alt="user avatar" />
        <div className="mobilePost-user">
          <h3>John Doe</h3>
          {/* <p>San Francisco, CA</p> */}
        </div>
      </div>
      <div className="mobilePost-image">
          {(location.state.attributes.mediaUrl && location.state.attributes.mediaUrl.endsWith('mp4')?(  
          <video src={location.state.attributes.mediaUrl} control autoPlay className="mobilePost-image" /> 
          ):(
          <img src={location.state.attributes.mediaUrl} className="mobilePost-image" alt={location.state.attributes.caption} />
          ))}
      </div>
      <div className="mobilePost-footer">
        <div className="mobilePost-actions">
          <div className="mobilePost-icon">
            <img src={LikeImage} alt="like icon" />
          </div>
          <p>1,234 likes</p>
        </div>
        <div className="mobilePost-comments">
          {filteredComments.map((comment) =>
            comment.id === editCommentId && isEditMode ? (
              <div className="mobilePost-edit-comment" key={comment.id}>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Update your comment..."
                />
                <div className="mobilePost-edit-buttons">
                  <button onClick={handleUpdateComment}>Save</button>
                  <button onClick={() => setIsEditMode(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="mobilePost-comment" key={comment.id}>
                <p>
                  <span className="mobilePost-user">{comment.user}:</span> {comment.comment}
                </p>
                {comment.user === 'John Doe' && (
                  <div className="mobilePost-comment-actions">
                    <button onClick={() => handleEditComment(comment.id, comment.comment)}>Edit</button>
                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                  </div>
                )}
              </div>
            )
          )}
                {!isEditMode && (
        <div className="mobilePost-add-comment">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment}>Post</button>
        </div>
      )}
      
    </div>
  </div>
</div>

  );
};

export default CommentPostExampleMobile;