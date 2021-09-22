import React, { useState, useEffect } from "react";  
import ignacio from '../assets/team/ignacio.png';
import willie from '../assets/team/willie.png';
import jeremy from '../assets/team/jeremy.png';

export default function Map() {

    return (
        <div style={{width: "100%", height:"100%"}}>
            <div style={{width: "75%", height:"200px", display: "flex", justifyContent: "space-evenly",margin:"auto",position:"absolute",top:0,bottom:0,left:0,right:0}}>
                <div style={{width:"200px",height:"100%",overflow: "hidden",backgroundSize : "contain",objectFit:"contain"}}>
                    <img src={jeremy} alt="Jeremy" style={{borderRadius:"50%", width:"100%",height:"100%"}}/>
                </div>
                <div style={{width:"200px",height:"100%",overflow: "hidden"}}>
                    <img src={ignacio} alt="Ignacio" style={{borderRadius:"50%", width:"100%",height:"100%"}} />
                </div>
                <div style={{width:"200px",height:"100%",overflow: "hidden"}}>
                    <img src={willie} alt="Willie"  style={{borderRadius: "50%", width:"100%",height:"100%"}}/>
                </div>
            </div>
        </div>
    );
}
