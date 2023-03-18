const ImagePost = (props) => {
  return (
    <div className="post">
      <div style={{ float: "left" }} className="imagePostLeft">
        {<img src={props.mediaUrl} alt={props.mediaCaption} className="postImage" />}
      </div>
      <div className="postCaption">
        <p>{props.mediaCaption}</p>
      </div>
    </div>
  );
};

export default ImagePost;
