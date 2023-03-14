const ImagePost = (props) => {
  return (
    <div className="post">
      {<img src={props.imageUrl} alt={props.imageCaption} className="postImage" />}
      <p>{props.imageCaption}</p>
    </div>
  );
};

export default ImagePost;
