const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = [{}];

app.get("/", function (req, res) {
    res.send("HELL ITS WORKING!");
});

io.on("connection", function (socket) {
    socket.on("joined", function ({ user }) {
        users[socket.id] = user;
        socket.emit("welcome", { user: "Admin", message: `Welcome to the chat, ${users[socket.id]}` });
        socket.broadcast.emit("userJoined", { user: "Admin", message: `${users[socket.id]} has joined` });
    });
    socket.on("message", function ({ message, id }) {
        io.emit("sendMessage", { user: users[id], message: message, id: id });
    });
    socket.on("disconnect", function () {
        socket.broadcast.emit("userLeft", { user: "Admin", message: `${users[socket.id]} has left the chat` });
    });
});

server.listen(4000, function () {
    console.log("Server running at port 4000");
});