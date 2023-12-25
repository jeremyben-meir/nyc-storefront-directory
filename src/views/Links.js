import React, { useState, useEffect } from "react";  
import linkedin from '../assets/team/linkedin.png';
import HMUI from '../assets/team/harvard.png';
import whitepaper from '../assets/team/whitepaper.png';
import interviews_file from '../assets/docs/interviews_hmui.pdf';
import whitepaper_file from "../assets/docs/whitepaper.pdf";
// import methodology_file from "../assets/docs/methodology.pdf";
// import class_report from "../assets/docs/class_report.pdf";

export default function Links() {

    var linkList = {
        "White paper": {
            "link": whitepaper_file,
            "img": whitepaper,
        },
        // "Data Collection Methodology": {
        //     "link": methodology_file,
        //     "img": whitepaper,
        // },
        // "report": {
        //     "link": class_report,
        //     "img": whitepaper,
        // },
        "Harvard Mellon Urban Initiative": {
            "link": "https://mellonurbanism.harvard.edu/open-storefront-directory",
            "img": HMUI,
        },
        "Interviews": {
            "link": interviews_file,
            "img": whitepaper,
        },
        "LinkedIn": {
            "link": "https://www.linkedin.com/company/open-storefront-directory/",
            "img": linkedin,
        },
    };

    const member = (name,index) => (
        <div key={"link".concat("",index)} style={{display:"flex", width:"100%",height:"60px", border:"1px solid black", borderRadius:"10px"}}>
            <div style={{height:"100%", aspectRatio:"1/1", padding:"5px"}}>
                <img src={linkList[name]["img"]} alt={name} style={{width:"100%",height:"100%", objectFit:"contain"}}/>
            </div>
            <a href={linkList[name]["link"]} target="_blank" rel="noopener noreferrer" style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <a style={{fontWeight: "bold", textAlign:"center"}}>{name}</a>
            </a>
        </div>

        // <div key={"team".concat("",index)} style={{width:"200px",height:"100%",flexFlow: "column", backgroundColor:"white",textAlign:"center"}}>
        //     <div style={{width:"100%",height:"200px",overflow: "hidden"}}>
        //         <img src={linkList[name]["img"]} alt={name} style={{borderRadius:"50%", width:"100%",height:"100%"}}/>
        //     </div>
        //     <div style={{marginTop:"20px"}}>
        //         <a style={{fontWeight: "bold"}}>{name + " " + linkList[name]['lastname']}</a><br/>
        //         <a>{linkList[name]['uni']}</a><br/>
        //         <a>{linkList[name]['email']}</a>
        //     </div>
        //     { linkList[name]['linkedin'] != null && <a href={linkList[name]['linkedin']} target="_blank" rel="noopener noreferrer">
        //         <div style={{width:"30px",height:"30px",overflow: "hidden",marginTop:"10px",marginLeft:"auto",marginRight:"auto"}}>
        //             <img src={linkedin} alt={name} style={{width:"100%",height:"100%"}}/>
        //         </div>
        //     </a>}
        // </div>
    )

    return (
        <div style={{width: "100%", height:"100%", display:"flex", alignItems:"center",justifyContent:"center",position:"absolute"}}>
            <div style={{maxWidth:"600px", width:"100%", padding:"0px 30px 0px 30px", margin:"auto"}}>
            <div style={{width:"100%", height:"100%", display: "flex", flexDirection:"column", justifyContent: "space-evenly", gap:"10px"}}>
                {Object.entries(linkList).map((link, index) => ( member(link[0],index) ))}
            </div>
            </div>
        </div>
    );
}
