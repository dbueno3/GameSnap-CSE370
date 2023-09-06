// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import EditImagePost from "../views/desktop/EditImagePost.jsx";
// import EditVideoPost from "../views/desktop/EditVideoPost.jsx";

// const UserPosts = (props) => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [posts, setPosts] = useState([]);
//     const [isOpen, setIsOpen] = useState(false)

//     useEffect(() => {
//         fetch(process.env.REACT_APP_API_PATH + `/users/${props.user}`, {
//           method: "get",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + sessionStorage.getItem("token"),
//           },
//         // }
//           .then((res) => res.json())
//           .then((result) => {
//             if (result) {
//               console.log("Username", result);
//               console.log(result.attributes);
//               setUsername(result.attributes.username);
//               setEmail(result.email);
//             }
//           });
//       });
//       useEffect(() => {
//         console.log("Check username", username);
//         if (username !== "") {
//           fetch(process.env.REACT_APP_API_PATH + `/posts`, {
//             method: "get",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + sessionStorage.getItem("token"),
//             },
//           })
//             .then((res) => res.json())
//             .then((res) => {
//               if (res) {
//                 let filteredPosts = res[0].filter((post) => {
//                   return post.author.attributes.username === username;
//                 });
//                 console.log("Filtered Posts", filteredPosts);
//                 setPosts(filteredPosts);
//               }
//             });
//         }
//       }, [username]);

//     return (
    
//       <div id="homeFeedMain">
//         <div className="userPostFeed">
//             <br/>
//           {posts.map((post) => {
//             if (post.attributes.mediaType === "image" && post.author.attributes.username === username) {
//               return (
//                 <EditImagePost
//                 post={post}
//             />
//               );
//             } else {
//               return (
//                 <EditVideoPost
//                 post={post}
//             />
//               );
//             }
//           })}
//         </div>
//       </div>
//     );
// };

// export default UserPosts;