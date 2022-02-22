import React from "react";

import EmptyChat from "./EmptyChat";

import ChatBody from "./ChatBody";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
export default function ShowChat() {
  const message = useSelector((state) => {
    return state.message;
  });
  return (
    <div className="w-full min-h-screen fixed right-0 bottom-0 top-0 md:w-[60%] lg:w-[70%]">
      <CSSTransition
        in={message.user_recaive != null}
        timeout={300}
        classNames="showOpsi"
        unmountOnExit
      >
        <ChatBody />
      </CSSTransition>
      {message.user_recaive == null && <EmptyChat />}
    </div>
  );
}
