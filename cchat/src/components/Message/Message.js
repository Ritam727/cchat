import React from "react";
import "./Message.css";

function Message({ user, message, cl }) {
    if(user === "Admin") {
        return (
            <div className={`messageBox notif`}>
                {`${message}`}
            </div>
        );
    } else {
        return (
            <div className={`messageBox ${cl}`}>
                {`${user}: ${message}`}
            </div>
        );
    }
}

export default Message;