// import { useEffect, useState } from "react";

// //Router
// import { useNavigate } from "react-router-dom";

// import NavbarOwn from "../../Component/NavbarOwn.jsx";
// import { FaUserCircle } from "react-icons/fa";
// //import CommentModal from "../../Component/CommentModal.jsx";
// import Alert from "../../Component/Alert.jsx";

// const Home = () => {
//   const [posts, getPosts] = useState([]);
// //  const [blocklist, setBlockList] = useState([]);
//   const [searchinput, setSearchInput] = useState("");
//   // [searchresult, setSearchResult] = useState([]);

//   let navigate = useNavigate();

//   const [showAlert, setShowAlert] = useState(false);
//  // const [errorMessage, setErrorMessage] = useState("Are you sure you want to block this post?");
//   const [postIdToBlock, setPostIdToBlock] = useState("");

//   const handleShowAlert = (postId) => {
//     setPostIdToBlock(postId);
//     setShowAlert(true);
//   };

//   const HandleConfirmBlock = () => {
//     console.log("OK button clicked!");
//     // Perform any desired action here
//     setShowAlert(false);
//     fetch(process.env.REACT_APP_API_PATH + "/post-reactions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + sessionStorage.getItem("token"),
//       },
//       body: JSON.stringify({
//         reactorID: sessionStorage.getItem("user"),
//         postID: postIdToBlock,
//         name: "block",
//       }),
//     })
//       .then((result) => {
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("error!" + error);
//       });
//   };

//   const handlecancel = () =>{
//     setShowAlert(false);

//   }

//   useEffect(() => {
//     //get the block list
//     fetch(process.env.REACT_APP_API_PATH + `/post-reactions?reactorID=${sessionStorage.getItem("user")}&name=block`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + sessionStorage.getItem("token"),
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         if (res) {
//           for (let i = 0; i < res[0].length; i++) {
//             const item = res[0][i].postID;
//             setBlockList((preArray) => [...preArray, item]);
//           }
//         }
//       });

//     //Get the user
//     fetch(process.env.REACT_APP_API_PATH + `/users/${sessionStorage.getItem("user")}`, {
//       method: "get",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + sessionStorage.getItem("token"),
//       },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         if (result) {
//           let info = result.attributes;
//           setPropic(info.profilePicture);
//         }
//       });
//     //Get the users posts
//     fetch(process.env.REACT_APP_API_PATH + `/posts`, {
//       method: "get",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + sessionStorage.getItem("token"),
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         if (res) {
//           getPosts(res[0]);
//           console.log(res[0]);
//         }
//       });
//   }, []);

//   const Block = (postid) => {
//     if (window.confirm("Are you sure you want to block this post?")) {
//       fetch(process.env.REACT_APP_API_PATH + "/post-reactions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + sessionStorage.getItem("token"),
//         },
//         body: JSON.stringify({
//           reactorID: sessionStorage.getItem("user"),
//           postID: postid,
//           name: "block",
//         }),
//       }).then(
//         (result) => {
//           window.location.reload();
//         },
//         (error) => {
//           alert("error!" + error);
//         }
//       );
//     }
//     return Block
//   };

//   const SearchByContent = (searchinput) => {
//     navigate(`/searchcontent?data=${searchinput}&type=${"content"}`);
//   };

//   const SearchByUser = (searchinput) => {
//     navigate(`/searchcontent?data=${searchinput}&type=${"user"}`);
//   };

//   return (
//     <>
//       <NavbarOwn />
      
//       <div id="homeFeedMain" className="container">
//         <div class="container">
//           <input
//             className="Search input-box-white"
//             type="text"
//             placeholder="Search"
//             onChange={(e) => {
//               setSearchInput(e.target.value);
//             }}
//           />
//           <button
//             className="SearchByUser submit-button"
//             onClick={() => {
//               SearchByUser(searchinput, posts);
//             }}
//           >
//             search by user
//           </button>
//           <button
//             className="SearchByContent submit-button"
//             onClick={() => {
//               SearchByContent(searchinput, posts);
//             }}
//           >
//             search by content
//           </button>
//         </div>

//         <Alert
//         showAlert={showAlert}
//         message={errorMessage}
//         alertType="error"
//         okButtonAction={HandleConfirmBlock}
//         cancelButtonAction={handlecancel}
//       />
//         <div id="homeFeed">
//           {posts.map((post) => {
//             if (!blocklist.includes(post.id)) {
//               if (post.attributes.mediaType === "image") {
//                 return (
//                   <div key={post.id} className="homePost">
//                     <button onClick={() => handleShowAlert(post.id)} className="blockButton">
//                       Block
//                     </button>
//                     <table style={{ margin: "0", borderCollapse: "collapse" }}>
//                       <tr>
//                         <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
//                           {post.author.attributes.profilePicture ? (
//                             <img
//                               src={post.author.attributes.profilePicture}
//                               className="homeFeedProfilePicture"
//                               alt="profile"
//                               style={{ margin: "20px" }}
//                             />
//                           ) : (
//                             <FaUserCircle className="homeFeedProfilePicture" size={40} style={{ margin: "20px" }} />
//                           )}
//                         </td>
//                         <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
//                           <h6>{post.author.attributes.username}</h6>
//                         </td>
//                       </tr>
//                     </table>
//                     <div
//                       style={{
//                         width: "inherit",
//                         height: "inherit",
//                         textAlign: "center",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <img alt="post" src={post.attributes.mediaUrl} className="homePostImage" />
//                     </div>
//                     <br />
//                     <p>
//                       &nbsp;&nbsp;{post.author.attributes.username}: {post.attributes.caption}
//                     </p>
//                     <button className="commentButton" onClick={() => navigate(`/mobilecomment?id=${post.id}`)}>
//                       Comment
//                     </button>
//                   </div>
//                 );
//               } else {
//                 return (
//                   <div key={post.id} className="homePost">
//                     <button onClick={() => handleShowAlert(post.id)} className="blockButton">
//                       Block
//                     </button>
//                     <table style={{ margin: "0", borderCollapse: "collapse" }}>
//                       <tr>
//                         <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
//                           {post.author.attributes.profilePicture ? (
//                             <img
//                               src={post.author.attributes.profilePicture}
//                               className="homeFeedProfilePicture"
//                               alt="profile"
//                               style={{ margin: "20px" }}
//                             />
//                           ) : (
//                             <FaUserCircle className="homeFeedProfilePicture" size={40} style={{ margin: "20px" }} />
//                           )}
//                         </td>
//                         <td style={{ textAlign: "center", verticalAlign: "middle", height: "5px" }}>
//                           <h6>{post.author.attributes.username}</h6>
//                         </td>
//                       </tr>
//                     </table>
//                     <div
//                       style={{
//                         width: "inherit",
//                         height: "inherit",
//                         textAlign: "center",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <video controls className="HomePostVideo" width="100%" height="0">
//                         <source src={post.attributes.mediaUrl} type="video/mp4" />
//                       </video>
//                     </div>
//                     <p>&nbsp;&nbsp;{post.attributes.caption}</p>
//                     <button className="commentButton" onClick={() => navigate(`/mobilecomment?id=${post.id}`)}>
//                       Comment
//                     </button>
//                   </div>
//                 );
//               }
//             }
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
