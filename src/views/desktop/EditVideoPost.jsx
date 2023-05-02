import DeletePost from '../../assets/delete.png'
import Confirm from './Confirm'
import { useState } from 'react';
import {RiDeleteBinLine} from 'react-icons/ri';

const EditVideoPost = ({post}) => {
  const [isOpen, setIsOpen] = useState(false)
    return (
      <div key={post.attributes.caption} className="homePost">
                  <RiDeleteBinLine alt="delete_post" className="delete_post_desktop" onClick={() => setIsOpen(true)}/>
                  <table style={{ margin: "0", borderCollapse: "collapse" }}>
                    <tr>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                        <img
                          src={post.author.attributes.profilePicture}
                          className="homeFeedProfilePicture"
                          alt="profile"
                          style={{ margin: "20px", cursor: "pointer" }}
                        />
                      </td>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
                        <h6 style={{ cursor: "pointer" }}>{post.author.attributes.username}</h6>
                      </td>
                      <Confirm open={isOpen} onClose={() => setIsOpen(false)} postid={post.id}>
                      {'Are you sure you want to delete this post?'}
                      </Confirm>
                    </tr>
                  </table>
                  <video controls className="HomePostVideo" width="100%" height="0">
                    <source src={post.attributes.mediaUrl} type="video/mp4" />
                  </video>
                  <h6>Caption: {post.attributes.caption}</h6>
                </div>
    );
  };
  
  export default EditVideoPost;