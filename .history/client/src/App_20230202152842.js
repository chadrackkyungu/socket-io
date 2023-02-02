// import logo from './logo.svg';
import './App.css';

import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001"); //backend URL

function App() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    // = > emit :  means perform an action
    socket.emit("send_message", { message, room });
  };

  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("join_room", room);
  //   }
  // };


  //when this function get executed, it will send the notification back to the backend
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
      // setMessageReceived(data.message);
    });
  }, []);


  return (
    <div className="App">
      {/* <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button> */}


      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}


    </div>
  );
}

export default App;
