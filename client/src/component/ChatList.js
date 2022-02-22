import moment from "moment";
import React from "react";
import { HiArrowDown } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { getID } from "../redux/Actions/MessageAction";
import Socket from "../Socket";
export default function ChatList(props) {
  const { name, _id, status, last_online } = props.data;
  const [show, setshow] = React.useState(false);
  const dispatch = useDispatch();
  const HandleClick = (e) => {
    if (window.matchMedia("(max-width:768px)").matches) {
      document.querySelector(".CHAT__").classList.add("CHAT__MOBILE");
    }
    e.preventDefault();
    dispatch(getID(_id));
  };
  const message = useSelector((state) => {
    return state.message;
  });
  React.useEffect(() => {
    if (message.id_recaive != null) {
      document.querySelector(".CHAT__").classList.add("CHAT__MOBILE");
    } else {
      document.querySelector(".CHAT__").classList.remove("CHAT__MOBILE");
    }
  }, []);
  return (
    <li>
      <a
        href="/link"
        className="flex h-16 border-b bg-white hover:bg-gray-100 items-center justify-between group relative"
        onBlur={(e) => setshow(false)}
        onClick={HandleClick}
      >
        <div className="flex space-x-4 items-center">
          {status == "online" ? (
            <span className="absolute rounded-full top-3  left-12 z-10 h-3 w-3 bg-green-500"></span>
          ) : (
            <span className="absolute rounded-full top-3  left-12 z-10 h-3 w-3 bg-red-500"></span>
          )}
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white cursor-pointer">
            <img
              className="absolute left-0 top-0"
              src="https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-sm text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">Chat terakhir</p>
          </div>
        </div>
        <div className="flex flex-col space-y-1 justify-center items-center ">
          <span className="text-sm text-gray-500">
            {moment(last_online).locale("id").fromNow()}
          </span>
          <button
            className="h-3 w-3 text-gray-500 hidden group-hover:block"
            onClick={(e) => {
              e.preventDefault();
              setshow(true);
            }}
          >
            <HiArrowDown className="w-full h-full" />
          </button>
        </div>
        <CSSTransition
          in={show}
          timeout={300}
          unmountOnExit
          classNames="showOpsi"
        >
          <ul className="absolute rounded bg-white right-0 p-4 -top-3 shadow z-10 text-sm flex flex-col space-y-4 text-gray-500">
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
      </a>
    </li>
  );
}
