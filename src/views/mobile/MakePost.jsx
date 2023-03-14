import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import React from "react";
import Preview from "../../assets/image-preview.png";
import { useState } from "react";

const Make_Post = () => {
    const [caption, setCaption] = useState("");
    // eslint-disable-next-line
    const [formData, addToFormData] = useState(new FormData());
    const [selectedImage,setSelectedImage] = useState(null);
    const [isVideo,setIsVideo] = useState(false);
    return (
        <div className="parents">
          <p className="edit-title">
          <div className="Cancel" style={{color:"black"}}>
            <Link to ="/personal" style={{textDecoration:'none', color:'Black'}}>Cancel</Link>
          </div>
          <div className="edit" style={{color:"black"}}>Make Your Post</div>
          <div className='post_mobile'>
          <Link to="/posts_mobile" >
          <button 
            onClick={() => {
          //Upload the file first
          fetch(process.env.REACT_APP_API_PATH + `/file-uploads`, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.text();
            })
            .then((result) => {
              const data = JSON.parse(result);
              console.log(data);
              //   Create the post here
              let postImageUrl = `https://webdev.cse.buffalo.edu${data.path}`;
              fetch(process.env.REACT_APP_API_PATH + "/posts", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                body: JSON.stringify({
                  authorID: sessionStorage.getItem("user"),
                  content: "Image Post",
                  attributes: {
                    caption: caption,
                    mediaUrl: postImageUrl,
                  },
                  
                }),
              })
                .then((res) => res.json())
                .then(
                  (result) => {
                    console.log("Post was successful");
                  },
                  (error) => {
                    console.log(`error!: ${error}`);
                  }
                );
                });
                }}>Post</button>
            </Link>
            </div>
          </p>
          
            <textarea className="post_message" type="text" placeholder="Say something..."  onChange={(e) => {
                setCaption(e.target.value);
            }}/>            
            <input type="file" id="image_upload" className="upload_image_mobile" style={{display:"none"}} onChange={(event) =>{
                
                let image = document.getElementById("image_upload").files[0];
                formData.append("uploaderID",sessionStorage.getItem("user"));
                formData.append("attributes",JSON.stringify({}));
                formData.append("file",image);

                const file = event.target.files[0];
                const reader = new FileReader();
                setIsVideo(file.type.startsWith("video/"));
                reader.readAsDataURL(file);

                reader.onload = () =>{
                  setSelectedImage(reader.result);
                };
                
            }}/>           

            <div className='preview_image'>
                <p>Share Your Image/Video</p>
                {selectedImage && isVideo?( <video src={selectedImage} controls autoPlay alt="blank upload" className='preview_mobile' 
                onClick={()=>{document.getElementById("image_upload").click()}}/>
                ):selectedImage?(
                <img src={selectedImage} alt="blank upload" className='preview_mobile' 
                onClick={()=>{document.getElementById("image_upload").click()}}/>
                ):(<img src={Preview} alt="blank upload" className='preview_mobile' onClick={()=>{document.getElementById("image_upload").click()}}/>)}
            </div>
          </div>
        );
      
}
export default Make_Post;