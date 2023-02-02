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

// [on] => this listening to an event

//This means when the user just connect to this URL<http://localhost:3000> this function will get executed!!
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});