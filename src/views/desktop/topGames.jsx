import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarOwn from "../../Component/NavbarOwn.jsx";

const TopGames = () => {
  return (
    <>
      <NavbarOwn />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1 style={{ marginBottom: '20px' }}>The Top Ranked Games</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
            <div style={{ 
              height: '300px', 
              width: '300px', 
              marginTop: 'auto', 
              marginBottom: 'auto',
              backgroundImage: "url('https://via.placeholder.com/300x300.png?text=Example+Image')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>The #2 Game</p>
          </div>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            <div style={{ 
              height: '400px', 
              width: '400px', 
              marginRight: '10px', 
              backgroundImage: "url('https://via.placeholder.com/400x400.png?text=Example+Image')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>The #1 Game</p>
          </div>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            marginLeft: '10px'
          }}>
            <div style={{ 
              height: '200px', 
              width: '200px', 
              marginTop: 'auto', 
              marginBottom: 'auto',
              backgroundImage: "url('https://via.placeholder.com/200x200.png?text=Example+Image')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <p style={{ textAlign: 'center', marginTop: '-10px' }}>The #3 Game</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopGames;
