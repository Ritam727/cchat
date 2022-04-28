import React from "react";
import "./Join.css";
import { useState } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

function sendUser() {
    user = document.getElementById("joinInput").value;
}

let user;

function Join() {
    const [name, setName] = useState("");
    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <img id="logoImg" src={logo} />
                <h1 id="name">C CHAT</h1>
                <input onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
                <Link onClick={(e) => !name ? e.preventDefault() : null} to="/chat"><button className="joinbtn" onClick={sendUser}>Login</button></Link>
            </div>
        </div>
    );
}

export { user };
export default Join;