const ImagePost = (props) => {
  return (
    <div className="post">
      {<img src={props.mediaUrl} alt={props.mediaCaption} className="postImage" />}
      <p>{props.mediaCaption}</p>
    </div>
  );
};

export default ImagePost;
