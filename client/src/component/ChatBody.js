import moment from "moment";
import React from "react";
import { HiPaperAirplane } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { sendMessage } from "../redux/Actions/MessageAction";
import Socket from "../Socket";
import Recaive from "./Sender";
import Sender from "./Recaive";
import TopChatShow from "./TopChatShow";
export default function ChatBody() {
  const auth = useSelector((state) => {
    return state.auth;
  });
  const msg = useSelector((state) => {
    return state.message;
  });
  const [message, setmessage] = React.useState(null);
  const [messages, setmessages] = React.useState(null);
  const handleChange = async (e) => {
    if (e.target.value) {
      if (e.target.value.trim()) {
        setmessage(e.target.value);
      }
    } else {
      setmessage(null);
    }
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message != null) {
      dispatch(
        sendMessage({
          message: message,
          id_pengirim: auth.user._id,
          id_penerima: msg.user_recaive._id,
          date: moment().locale("id").format(),
        })
      );
      document.getElementById("formMSGSubmit").reset();
    }
  };
  Socket.on("messageShow", (data) => {
    const Message = document.getElementById("Message");
    Message.scrollTop = Message.scrollHeight;
    setmessages(data);
  });
  return (
    <div className="w-full h-full">
      <TopChatShow />
      <div
        className="bg-gray-200 heightCHat overflow-y-auto overflow-x-hidden"
        id="Message"
      >
        <div className="md:px-10 py-2">
          <TransitionGroup>
            {messages &&
              messages.map((msg, key) => {
                return msg.id_pengirim === auth.user._id ? (
                  <CSSTransition
                    key={key}
                    timeout={500}
                    classNames="chat_recaive"
                  >
                    <Recaive key={key} msg={msg} />
                  </CSSTransition>
                ) : (
                  <CSSTransition
                    key={key}
                    timeout={500}
                    classNames="chat_sender"
                  >
                    <Sender key={key} msg={msg} />
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
          {/* return<Sender key={key} /> */}
          {/* <Recaive key={key} /> */}
        </div>
      </div>
      <form
        className="h-16 bg-white"
        onSubmit={handleSubmit}
        id="formMSGSubmit"
      >
        <div className="p-2 flex items-center space-x-3 h-full">
          <input
            type="text"
            onKeyPress={() => {
              Socket.emit("ketik", msg.user_recaive._id);
            }}
            onKeyUp={() => {
              Socket.emit("endketik", msg.user_recaive._id);
            }}
            onChange={handleChange}
            placeholder="Ketik pesan"
            className="outline-none w-full text-gray-600 bg-gray-200 p-3 rounded text-sm placeholder:text-gray-600 placeholder:text-sm"
          />
          <CSSTransition
            in={message != null}
            timeout={300}
            unmountOnExit
            classNames="showButton"
          >
            <button className="h-10 w-10 flex justify-center items-center rotate-90">
              <HiPaperAirplane className="h-7 w-7" />
            </button>
          </CSSTransition>
        </div>
      </form>
    </div>
  );
}
