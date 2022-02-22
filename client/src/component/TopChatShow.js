import React from "react";
import { HiOutlineDotsVertical, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Socket from "../Socket";
export default function TopChatShow() {
  const [show, setshow] = React.useState(false);
  const [mengetik, setMengetik] = React.useState(false);
  const message = useSelector((state) => {
    return state.message;
  });
  const auth = useSelector((state) => {
    return state.auth;
  });
  Socket.on("ketik", (id) => {
    setMengetik(id == auth.user._id);
  });
  Socket.on("endketik", () => {
    setTimeout(() => {
      setMengetik(false);
    }, 1000);
  });
  return (
    <div
      className="flex h-24 bg-gray-900  flex justify-between items-center px-4  text-white md:border-l relative"
      onBlur={() => setshow(false)}
    >
      <div className="flex items-center space-x-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white cursor-pointer">
          <img
            className="absolute left-0 top-0"
            src="https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-md font-semibold">
            {message.user_recaive.name}
          </span>
          <span className="text-sm font-semibold text-gray-200 flex space-x-1 items-center">
            {mengetik ? (
              <span className="text-green-500">mengetik...</span>
            ) : (
              <>
                <span
                  className={`${
                    message.user_recaive.status == "online"
                      ? "bg-green-400"
                      : "bg-red-400"
                  } h-2 w-2 rounded-full inline-block`}
                ></span>
                <span>{message.user_recaive.status}</span>
              </>
            )}
          </span>
        </div>
      </div>
      <div>
        <button
          className="h-5 w-5 font-bold rounded-full md:hidden"
          onClick={(e) => {
            e.preventDefault();
            if (window.matchMedia("(max-width:768px)").matches) {
              document
                .querySelector(".CHAT__")
                .classList.remove("CHAT__MOBILE");
            }
          }}
        >
          <HiX className="w-full h-full" />
        </button>
        <button
          className="h-5 w-5 font-bold"
          onClick={(e) => {
            e.preventDefault();
            show ? setshow(false) : setshow(true);
          }}
        >
          <HiOutlineDotsVertical className="w-full h-full" />
        </button>
      </div>
      <CSSTransition
        in={show}
        timeout={300}
        unmountOnExit
        classNames="showOpsi"
      >
        <ul className="absolute rounded bg-white right-5 p-4 -bottom-28 shadow-xl z-10 text-sm flex flex-col space-y-4 text-gray-500">
          <li>
            <a className="hover:bg-gray-200 w-full rounded p-2">Cari pesan</a>
          </li>
          <li>
            <a className="hover:bg-gray-200 w-full rounded p-2">Tutup Chat</a>
          </li>
          <li>
            <a className="hover:bg-gray-200 w-full rounded p-2">Hapus Chat</a>
          </li>
        </ul>
      </CSSTransition>
    </div>
  );
}
