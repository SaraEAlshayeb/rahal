import React from 'react';

function Home() {
    return (
        <div style={{height:"130vh", width: '100vw', backgroundImage:"url('/background.png')", backgroundSize:"cover"}} >
           <div style={{height:"100vh",display: "flex", justifyContent: "center", alignItems: "center"}}>
               <div style={{width:"75vh",display: "flex", justifyContent: "center", alignItems: "center",flexDirection: 'column', gap:"0px"}}>
                   <h1 style={{marginBottom: "0px",fontFamily:"Roboto"}}>ABOUT US.</h1>
                   <p align="center" style={{fontFamily:"Roboto"}}>We connect drivers and passengers for long-distance trips, offering a reliable alternative when trains or buses are unavailable. It's a flexible and community-driven way to travel between cities.</p>
               </div>
           </div>
        </div>

    );
}

export default Home;
