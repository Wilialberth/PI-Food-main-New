import React from "react";
import {Link} from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
    return(
    <div className="landing">
        <div className="containerLanding">
            <h1 className="title">Henry Food</h1>
            <h2 className="subtitle">The best place to start cooking</h2>
            <Link to ="/home">
            <button className="button">Let's Go!</button>
            </Link>
        </div>
    </div>
    )
}

export default LandingPage;

/* export default function LandingPage(){
    return(
    <div className="landing">
        <div className="containerLanding">
        <h1 className="title">Henry Food</h1>
        <h2 className="subtitle">The best place to start cooking</h2>
        <Link to ="/home">
        <button className="button">Let's Go!</button>
        </Link>
        </div>
    </div>
)} */