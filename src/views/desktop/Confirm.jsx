import React from 'react'
import { useNavigate } from "react-router-dom";

const modal_styles = {
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    backgroundColor:'#5F6A82',
    padding:'50px',
    borderRadius:'15px',
    zIndex: 1000

}

const overlay_styles={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex:1000
}
const Confirm = ({open, children, onClose, postid}) =>{  
    const navigate = useNavigate();
    const delete_post = (postid) => {
        fetch(process.env.REACT_APP_API_PATH + "/posts/" + postid, {
            method: "DELETE",
            headers: {
              'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
          })
          .then(response => {
            if (!response.ok){
              throw new Error("Failed to delete the post");
            }
            console.log("Post deleted successfully");
            navigate('/user_posts')
          })
          .catch(error => {
            console.error(error);
          })
    }
    

    if (!open) return null
    return (
        <div style={overlay_styles}>
            <div style={modal_styles}>
                {children}
                <button onClick={()=>{onClose();delete_post(postid);}}>Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}

export default Confirm;