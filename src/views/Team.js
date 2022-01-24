import React, { useState, useEffect } from "react";  
import ignacio from '../assets/team/ignacio.png';
import william from '../assets/team/temp/willie.png';
import jeremy from '../assets/team/jeremy.png';
import linkedin from '../assets/team/linkedin.png';
import { Route, Switch, Link } from "react-router-dom";

export default function Map() {

    var memberList = {
        "Jeremy": {
            "lastname": "Ben-Meir",
            "img": jeremy,
            "uni": "Cornell University",
            "linkedin": "https://www.linkedin.com/in/jeremy-ben-meir/",
            "email": "jsb459@cornell.edu",
        },
        "Ignacio": {
            "lastname": "Lopez Gaffney",
            "img": ignacio,
            "uni": "Columbia University",
            "linkedin": "https://www.linkedin.com/in/ignacio-l-a4a05618a/",
            "email": "iml2114@columbia.edu",
        },
        "William": {
            "lastname": "Swett",
            "img": william,
            "uni": "Harvard University",
            "linkedin": null,
            "email": "wswett@college.harvard.edu",
        },
    };

    const member = (name,index) => (
        <div key={"team".concat("",index)} style={{width:"200px",height:"100%",flexFlow: "column", backgroundColor:"white",textAlign:"center"}}>
            <div style={{width:"100%",height:"200px",overflow: "hidden"}}>
                <img src={memberList[name]["img"]} alt={name} style={{borderRadius:"50%", width:"100%",height:"100%"}}/>
            </div>
            <div style={{marginTop:"20px"}}>
                <a style={{fontWeight: "bold"}}>{name + " " + memberList[name]['lastname']}</a><br/>
                <a>{memberList[name]['uni']}</a><br/>
                <a>{memberList[name]['email']}</a>
            </div>
            { memberList[name]['linkedin'] != null && <a href={memberList[name]['linkedin']} target="_blank" rel="noopener noreferrer">
                <div style={{width:"30px",height:"30px",overflow: "hidden",marginTop:"10px",marginLeft:"auto",marginRight:"auto"}}>
                    <img src={linkedin} alt={name} style={{width:"100%",height:"100%"}}/>
                </div>
            </a>}
        </div>
    )

    return (
        <div style={{width: "100%", height:"100%"}}>
            <div style={{width: "75%", height:"300px", display: "flex", justifyContent: "space-evenly",margin:"auto",position:"absolute",top:0,bottom:0,left:0,right:0, backgroundColor:"white"}}>
                {Object.entries(memberList).map((link, index) => ( member(link[0],index) ))}
            </div>
        </div>
    );
}
