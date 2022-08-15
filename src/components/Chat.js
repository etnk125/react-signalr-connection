import React, { Component } from "react";

const Chat = ({ onConnect, url, id }) => {
  return (
    <>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await onConnect(url, id);
        }}
      >
        connect
      </button>
    </>
  );
};

export default Chat;
