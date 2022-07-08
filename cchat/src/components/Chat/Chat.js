import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

const ENDPOINT = "https://cchat-backend.herokuapp.com/";
let socket;

function Chat() {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
    const send = () => {
        const message = document.getElementById("chatInput").value;
        socket.emit("message", { message, id });
        document.getElementById("chatInput").value = "";
    }
    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ["websocket"] });
        socket.emit('joined', { user: user });
        return () => {
            socket.disconnect();
        }
    }, []);
    useEffect(() => {
        socket.on("connect", function () {
            setId(socket.id);
        });
        socket.on("sendMessage", function (data) {
            setMessages([...messages, data]);
        });
        socket.on("welcome", (data) => {
            setMessages([...messages, data]);
        });
        socket.on("userJoined", (data) => {
            setMessages([...messages, data]);
        });
        socket.on("userLeft", (data) => {
            setMessages([...messages, data]);
        });
        return () => {
            socket.off();
        }
    }, [messages]);
    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>C Chat</h2>
                    <a href="/"><img src={closeIcon} /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message key={i} message={item.message} user={item.id === id ? "You" : item.user} cl={item.id === id ? "right" : "left"} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} /></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;