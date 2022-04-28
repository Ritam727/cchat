import React from "react";
import "./Message.css";

function Message({ user, message, cl }) {
    return (
        <div className={`messageBox ${cl}`}>
            {`${user}: ${message}`}
        </div>
    );
}

export default Message;