import logo from "./logo.svg";
import "./App.css";
import Chat from "./components/Chat";
import React, { useState } from "react";
import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const onConnect = async (url, id) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`ws://${url}`, {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .build();
      connection.on("ReceiveMessage", (message) => {
        console.log("message");
      });
      await connection.start();
      await connection
        .invoke("SubscribeToConversationEvents", `${id}`)
        .catch(console.error);
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <Chat onConnect={onConnect} url="localhost:5000/chat" id="1234" />
    </div>
  );
};

export default App;
