const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", /// front-end URL
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    //* to check if the connection is working properly
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
    });
});

server.listen(3001, () => console.log("SERVER IS RUNNING"));