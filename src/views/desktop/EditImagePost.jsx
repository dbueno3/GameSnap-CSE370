import { useEffect, useState } from "react";

const EditImagePost = (props) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const handleImageClick = (event, imageId) => {
    event.preventDefault();
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter(id => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
    console.log(selectedImages)
  };
    return (
      <div className="post">
        <div style={{ float: "left" }} className="imagePostLeft">
          {<img src={props.mediaUrl} alt={props.mediaCaption} className="postImage" onClick={event => handleImageClick(event, props.id)}
 />}
        </div>
        <div className="postCaption">
          <p>{props.mediaCaption}</p>
        </div>
      </div>
    );
  };
  
  export default EditImagePost;