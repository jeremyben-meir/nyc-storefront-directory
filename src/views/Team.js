import React, { useState, useEffect } from "react";  
import ignacio from '../assets/team/ignacio.png';
import willie from '../assets/team/willie.png';
import jeremy from '../assets/team/jeremy.png';

export default function Map() {

    var memberList = {
        "Jeremy": {
            "lastname": "Ben-Meir",
            "img": jeremy,
            "uni": "Cornell University",
        },
        "Ignacio": {
            "lastname": "Lopez Gaffney",
            "img": ignacio,
            "uni": "Columbia University",
        },
        "Willie": {
            "lastname": "Swett",
            "img": willie,
            "uni": "Harvard University",
        },
    };

    const member = (name) => (
        <div style={{width:"200px",height:"100%",flexFlow: "column", backgroundColor:"white",textAlign:"center"}}>
            <div style={{width:"100%",height:"200px",overflow: "hidden"}}>
                <img src={memberList[name]["img"]} alt={name} style={{borderRadius:"50%", width:"100%",height:"100%"}}/>
            </div>
            <div style={{marginTop:"20px"}}>
                <a>{name + " " + memberList[name]['lastname']}</a><br/>
                <a>{memberList[name]['uni']}</a>
            </div>
        </div>
    )

    return (
        <div style={{width: "100%", height:"100%"}}>
            <div style={{width: "75%", height:"300px", display: "flex", justifyContent: "space-evenly",margin:"auto",position:"absolute",top:0,bottom:0,left:0,right:0, backgroundColor:"white"}}>
                {Object.entries(memberList).map((link, index) => ( member(link[0]) ))}
            </div>
        </div>
    );
}
