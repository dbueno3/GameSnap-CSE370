import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarOwn from "../../Component/NavbarOwn.jsx";

import rainbowSeigeImage from "../../assets/rainbowseige.jpeg";
import fortniteImage from "../../assets/fortnite.jpg";
import minecraftImage from "../../assets/minecraft.png";
import modernWarfareImage from "../../assets/modernwarfare.jpg";

const TopGames = () => {
  const [map,setMap] = useState([[],[],[]])
  const [first,setFirst] = useState([])
  const [second,setSecond] = useState([])
  const [third,setThird] = useState([])
  const [sort,setSort] = useState([])
  const [options,setOption] = useState([])

  useEffect(() => {
    const newMap = new Map();
    fetch(process.env.REACT_APP_API_PATH + `/users`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          for (const _user of res[0]){
            if (_user.attributes.hasOwnProperty('games')){
              for (const _game of _user.attributes.games){
                  const count = newMap.get(_game) || 0;
                  newMap.set(_game, count + 1)   
              }
            }
          }
          const sortedmap = Array.from(newMap.entries()).sort((a,b)=>b[1]-a[1])
          setMap(sortedmap)
        }
      });
  }, []);
    const checkboxOptions = [
    { id: 1, text: "Rainbow Siege", image: rainbowSeigeImage },
    { id: 2, text: "Fortnite", image: fortniteImage },
    { id: 3, text: "Minecraft", image: minecraftImage },
    { id: 4, text: "Modern Warfare", image: modernWarfareImage },
    // Add more checkbox options as needed
    ];
    
    return (
      <>
        <NavbarOwn />
        <br />
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>The Top Ranked Games</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        {checkboxOptions.map((option)=>{
          if(option.text === map[1][0]){
            return( 
              <div className='box_a' style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              marginRight: '10px' }}>
                
              <div style={{ 
                textAlign: 'center', 
                marginTop: 'auto', 
                alignItems: 'center' }}>
                <p style={{ margin: 0 }}>{map[1][0]}</p>
                
              </div>
            
              <div className="secondTopGame" style={{ 
                backgroundImage: `url(${option.image})`,
              }}>
              </div>
  
              
              <div 
                  style={{ 
                  textAlign: 'center', 
                  marginTop: '2px', 
                  alignItems: 'center' }}>
                  <p style={{ margin: 0 }}>{map[1][1]} users like</p>
                </div>
  
            </div>
            )
                
          }
        })}   

        {checkboxOptions.map((option)=>{
          if(option.text === map[0][0]){
            return (
            <div className='box_b' style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              textAlign: 'center', 
              marginTop: '10px', 
              alignItems: 'center' }}>
              <p style={{ margin: 0 }}>{map[0][0]}</p>
            </div>
            <div className="firstTopGame" style={{ 
              backgroundImage: `url(${option.image}`,
            }}>
            </div>
            
            <div 
                  style={{ 
                  textAlign: 'center', 
                  marginTop: '2px', 
                  alignItems: 'center' }}>
                  <p style={{ margin: 0 }}>{map[0][1]} users like</p>
                </div>
            </div>            
            )
          }
        })}        
          {checkboxOptions.map((option)=>{
            if(option.text === map[2][0]){
              return(
                <div className='box_c' style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginLeft: '10px',
  
                }}>
                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '10px', 
                    alignItems: 'center' }}>
                    <p style={{ margin: 0 }}>{map[2][0]}</p>
                  </div>
                  <div className="thirdTopGame" style={{ 
                    backgroundImage: `url(${option.image}`,
                  }}>
                  </div>
                  
                  <div 
                    style={{ 
                    textAlign: 'center', 
                    marginTop: '2px', 
                    alignItems: 'center' }}>
                    <p style={{ margin: 0 }}>{map[2][1]} users like</p>
                  </div>
                </div>
              )
            }
          })}
          
        </div>
      </div>
    </div>
    </>
  );
};

export default TopGames;
