import React from "react";
import EmptyIMage from "../assets/empty.png";
export default function EmptyChat() {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="flex items-center flex-col md:flex-row">
        <h1 className="font-bold text-xl">Mulai Chat Baru Sekarang</h1>
        <img src={EmptyIMage} className="w-80" />
      </div>
    </div>
  );
}
