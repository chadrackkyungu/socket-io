import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001"); //backend URL

function App() {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => socket.emit("send_message", { message });

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
      setMessageReceived(data.message);
    });
  }, []);


  return (
    <div className="App">
      <input placeholder="Message..." onChange={(event) => setMessage(event.target.value)} />
      <button onClick={sendMessage}> Send Message</button>

      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
