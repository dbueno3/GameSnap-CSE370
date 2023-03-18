const VideoPost = (props) => {
  return (
    <div className="post">
      <div style={{ float: "left" }} className="videoPostLeft">
        <video controls className="postVideo" width="100%" height="0" style={{ paddingBottom: "56.25%" }}>
          <source src={props.mediaUrl} type="video/mp4" />
        </video>
      </div>
      <div className="postCaption">
        <p>{props.mediaCaption}</p>
      </div>
    </div>
  );
};

export default VideoPost;
