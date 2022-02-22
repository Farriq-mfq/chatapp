import React from "react";
import { HiArrowDown } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";

export default function Recaive(props) {
  const [show, setshow] = React.useState(false);
  return (
    <span className="chat_recaive relative">
      <span
        className="bg-white p-3 rounded-lg relative flex space-x-1 items-center group"
        onBlur={(e) => setshow(false)}
      >
        <span className="text-gray-800 font-md text-sm break-all">
          {props.msg.message}
        </span>
        <button
          className="text-sm text-gray-400 hidden group-hover:block"
          onClick={(e) => {
            e.preventDefault();
            setshow(true);
          }}
        >
          <HiArrowDown />
        </button>
        <CSSTransition
          in={show}
          timeout={300}
          unmountOnExit
          classNames="showOpsi"
        >
          <ul className="absolute rounded bg-white -right-32 p-4 top-12 shadow-xl z-10 text-sm flex flex-col space-y-4 text-gray-500">
            <li>
              <a className="hover:bg-gray-200 w-full rounded p-2">
                Arsipkan Chat
              </a>
            </li>
            <li>
              <a className="hover:bg-gray-200 w-full rounded p-2">
                Tandai sudah di baca
              </a>
            </li>
            <li>
              <a className="hover:bg-gray-200 w-full rounded p-2">Blokir</a>
            </li>
          </ul>
        </CSSTransition>
      </span>
    </span>
  );
}
