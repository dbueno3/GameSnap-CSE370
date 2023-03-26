import DeletePost from '../../assets/delete.png'
import Confirm from './Confirm'
import { useState } from 'react';
const EditImagePost = (props) => {
  const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="post">
        <div style={{ float: "left" }} className="imagePostLeft">
          {<img src={props.mediaUrl} alt={props.mediaCaption} className="postImage"/>}
        </div>
        <div className="postCaption">
          <p>{props.mediaCaption}</p>
        </div>
        <img src={DeletePost} alt="delete_post" className="delete_post_desktop" onClick={() => setIsOpen(true)}/>
        <Confirm open={isOpen} onClose={() => setIsOpen(false)} postid={props.postid}>
          {'Are you sure you want to delete this post? (this is irrevocable)'}
        </Confirm>
      </div>
    );
  };
  
  export default EditImagePost;
