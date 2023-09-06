//     `import React, { useEffect, useState } from 'react';
//     import './CommentPostExampleMobile.css';
//     import LikeImage from '../assets/like.png';
//     import {useLocation, useNavigate} from 'react-router-dom'
//     import { AiOutlinePlus } from "react-icons/ai";
//     import {BsBackspace} from "react-icons/bs"

//     const CommentPostExampleMobile = () => {
//       let navigate = useNavigate();
//       const location = useLocation()
//       const searchParams = new URLSearchParams(location.search)
//       const postid = searchParams.get('id')
//       const [postinformation, setPostinformation] = useState(null)
//       const [comment, setComment] = useState('')
//       const [oldcomment,setOldcomment] = useState(null)
//       const [commentposter, setCommentposter] = useState('')
//       const [countlike, setCountlike] = useState(0)


//       const MakeComment = (postid,comment,poster,caption,type,url) =>{

//         fetch(process.env.REACT_APP_API_PATH + "/posts/" + postid, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + sessionStorage.getItem("token"),
//           },
//           body: JSON.stringify({
//             attributes: {
//               caption:caption,
//               mediaType:type,
//               mediaUrl:url,
//               comment:[...oldcomment, [poster,comment]],
//             },
//           }),
//         })
//         .then((res) => 
//           {window.location.reload();}
//         )}

//       const LikePost = () =>{
//         let userReaction = -1;
//         postinformation.reactions.forEach(reaction => {
//           if (reaction.reactorID === parseInt(sessionStorage.getItem("user")) && reaction.name === 'like'){
//             userReaction = reaction.id;
//           }
//         });

//         if (userReaction >= 0){

//           fetch(process.env.REACT_APP_API_PATH+"/post-reactions/"+userReaction, {
//             method: "DELETE",
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': 'Bearer '+ sessionStorage.getItem("token")
//             },
//           })
//             .then(
//               result => {
//                 {window.location.reload();}
//               },
//             );
//         }else{
//           fetch(process.env.REACT_APP_API_PATH+"/post-reactions", {
//             method: "POST",
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': 'Bearer '+sessionStorage.getItem("token")
//             },
//             body: JSON.stringify({
//               reactorID: sessionStorage.getItem("user"),
//               postID: postinformation.id,
//               name: "like"
//             })
//             })
//             .then(
//               result => {
//                 {window.location.reload();}
//               },
//             );
//         }
//       }
//       useEffect(()=>{
//         console.log(postid)
//         fetch(process.env.REACT_APP_API_PATH + `/post-reactions?postID=${postid}&name=like`, {
//           method: "get",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + sessionStorage.getItem("token"),
//           },
//         })
//           .then((res) => res.json())
//           .then((result) => {
//             if (result) {
//               setCountlike(result[1])
//             }
//           });

//         fetch(process.env.REACT_APP_API_PATH + `/users/${sessionStorage.getItem("user")}`, {
//           method: "get",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + sessionStorage.getItem("token"),
//           },
//         })
//           .then((res) => res.json())
//           .then((result) => {
//             if (result) {
//               setCommentposter(result.attributes.username)
//             }
//           });

//         fetch(process.env.REACT_APP_API_PATH + `/posts/${postid}`, {
//           method: "get",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + sessionStorage.getItem("token"),
//           },
//         })
//           .then((res) => res.json())
//           .then((res) => {
//             if (res) {
//               console.log(res)
//               setPostinformation(res)
//               setOldcomment(res.attributes.comment)
//             }
//           });
//       }, []);
    
//       if (postinformation === null || oldcomment === null){
//         return null;
//       }

//       return (
//       <div className="mobilePost">
//           <div className="mobilePost-header">
//             <img src={postinformation.author.attributes.profilePicture} alt="user avatar" />
//             <div className="mobilePost-user">
//               <h3>{postinformation.author.attributes.username}</h3>
//             </div>
//             <BsBackspace className='backbutton' onClick={() => {
//                 navigate("/home");
//               }}>Back</BsBackspace>
//           </div>
//           {postinformation.attributes.mediaType === 'image'?(
//             <div className="mobilePost-image">
//             <img src={postinformation.attributes.mediaUrl} alt="post image" />
//           </div>
//           ):(   
//           <video controls className="HomePostVideo" width="100%" height="0">
//           <source src={postinformation.attributes.mediaUrl} type="video/mp4" />
//           </video>
//           )}
//           <div className="mobilePost-footer">
//             <div className="mobilePost-actions">
//               <div className="mobilePost-icon">
//                 <img src={LikeImage} onClick={() => LikePost()} alt="like icon" />
//               </div>
//               <p>{countlike} likes</p>
//             </div>
//             <div>&nbsp;&nbsp;{postinformation.author.attributes.username}: {postinformation.attributes.caption}</div>
            
//             {oldcomment.map((comment) =>{
//               return(        
//               <div>&nbsp;&nbsp;{comment[0]}: {comment[1]}</div>
//               )
//             })}
//             <div className="CommentBoxContainer">
//               <input className="Commentbox"
//                 type="text"
//                 placeholder={`Add a comment for ${postinformation.author.attributes.username}`}
//                 onChange={(e) => {
//                   setComment(e.target.value);
//                 }}
//               />
//               <AiOutlinePlus className="Comment"
//               onClick={() => MakeComment(postid,comment,commentposter,postinformation.attributes.caption,postinformation.attributes.mediaType,postinformation.attributes.mediaUrl)}>
//               </AiOutlinePlus>
//               <br />
//             </div>
//       </div>
//     </div>

//       );
//     };

//     export default CommentPostExampleMobile;
// `