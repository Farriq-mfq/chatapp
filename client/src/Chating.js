import React from "react";
import Chat from "./component/Chat";
import ShowChat from "./component/ShowChat";
export default function Chating() {
  return (
    <div className="flex min-h-screen">
      <Chat />
      <ShowChat />
    </div>
  );
}
