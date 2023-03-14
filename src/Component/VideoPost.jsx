const VideoPost = (props) => {
  return (
    <div className="post">
      <video width="640" height="480" controls>
        <source src={props.mediaUrl} type="video/mp4" />
      </video>
      <p>{props.mediaCaption}</p>
    </div>
  );
};

export default VideoPost;
