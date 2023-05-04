import Confirm from "./Confirm";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const EditImagePost = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div key={post.attributes.caption} className="userPost">
      <RiDeleteBinLine alt="delete_post" className="delete_post_desktop" onClick={() => setIsOpen(true)} />
      <table style={{ margin: "0", borderCollapse: "collapse" }}>
        <tr>
          <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
            <img
              src={post.author.attributes.profilePicture}
              className="homeFeedProfilePicture"
              alt="profile"
              style={{ margin: "20px" }}
            />
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
            <h6 style={{ margin: 0 }}>{post.author.attributes.username}</h6>
          </td>
          <Confirm open={isOpen} onClose={() => setIsOpen(false)} postid={post.id}>
            {"Are you sure you want to delete this post?"}
          </Confirm>
        </tr>
      </table>
      <div
        style={{
          width: "inherit",
          height: "inherit",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <img alt="post" src={post.attributes.mediaUrl} className="homePostImage" />
      </div>
      <h6>Caption: {post.attributes.caption}</h6>
    </div>
  );
};

export default EditImagePost;
