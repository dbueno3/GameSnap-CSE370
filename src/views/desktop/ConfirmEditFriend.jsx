import React from 'react'
import { useNavigate } from "react-router-dom";
import {AiOutlineCloseCircle} from "react-icons/ai"
const modal_styles = {
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    backgroundColor:'#5F6A82',
    paddingTop:'50px',
    paddingBottom:'50px',
    paddingRight: '100px',
    paddingLeft:'100px',
    borderRadius:'25px',
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
const ConfirmEditFriend = ({open, children, onClose, profileimage, username}) =>{  
    const navigate = useNavigate();
    
    if (!open) return null
    return (
        <div style={overlay_styles}>
            <div style={modal_styles}>
                <AiOutlineCloseCircle className="close" onClick={()=>{onClose()}}/>
                <div style={{marginBottom:"20px"}}>
                    <img src={profileimage} style={{verticalAlign: "middle", height:"35px",width:"35px",borderRadius:"100%"}} alt="edit_friend"/>
                    <span style={{marginLeft:'20px',textAlign: "center", verticalAlign: "middle"}}>{username}</span>
                </div>
                <div>
                    <button className="Unfollow" onClick={()=>{onClose()}}>Unfollow</button>
                    <button className="Block" onClick={()=>{onClose()}}>Block</button>  
                </div>
            </div>
        </div>
    )
}

export default ConfirmEditFriend;