const VideoPost = (props) => {
  return (
    <div className="post">
      <iframe
        width="560"
        title={props.mediaCaption}
        height="315"
        src={props.mediaUrl}
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p>{props.mediaCaption}</p>
    </div>
  );
};

export default VideoPost;
