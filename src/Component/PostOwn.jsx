const PostOwn = (post) => {
  if (post.attributes.mediaType === "image") {
    return (
      <div key={post.attributes.caption} className="homePost">
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
              <h6 style={{ margin: 0, cursor: "pointer" }}>{post.author.attributes.username}</h6>
            </td>
          </tr>
        </table>
        <img alt="post" src={post.attributes.mediaUrl} className="homePostImage" />
        <h6>Caption: {post.attributes.caption}</h6>
      </div>
    );
  } else {
    return (
      <div key={post.attributes.caption} className="homePost">
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
          </tr>
        </table>
        <video controls className="HomePostVideo" width="100%" height="0">
          <source src={post.attributes.mediaUrl} type="video/mp4" />
        </video>
        <h6>Caption: {post.attributes.caption}</h6>
      </div>
    );
  }
};

export default PostOwn;
