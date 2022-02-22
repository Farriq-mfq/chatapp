import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { LogoutAction } from "../redux/Actions/AuthAction";
export default function TopChat() {
  const [show, setshow] = React.useState(false);

  const auth = useSelector((state) => {
    return state.auth.user;
  });
  const dispatch = useDispatch();
  return (
    <div
      className="flex h-24 bg-gray-900  flex justify-between items-center px-4  text-white relative"
      onBlur={() => setshow(false)}
    >
      <div className="flex items-center space-x-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white cursor-pointer">
          <img
            className="absolute left-0 top-0"
            src="https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
          />
        </div>
        <div className="flex flex-col justify-center space-y-1">
          <span className="text-md font-semibold">{auth.name}</span>
          <div className="text-sm font-semibold text-gray-200 flex items-center space-x-1">
            <span
              className={`${
                auth.status == "online" ? "bg-green-400" : "bg-red-400"
              } h-2 w-2 rounded-full inline-block`}
            ></span>
            <span>{auth.status}</span>
          </div>
        </div>
      </div>
      <button
        className="h-5 w-5 font-bold"
        onClick={(e) => {
          e.preventDefault();
          show ? setshow(false) : setshow(true);
        }}
      >
        <HiOutlineDotsVertical className="w-full h-full" />
      </button>
      <CSSTransition
        in={show}
        timeout={300}
        unmountOnExit
        classNames="showOpsi"
      >
        <ul className="absolute rounded bg-white right-5 p-3 -bottom-3 shadow-xl z-10 text-sm flex flex-col space-y-4 text-gray-500">
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(LogoutAction());
              }}
              className="w-full rounded"
            >
              Keluar
            </button>
          </li>
        </ul>
      </CSSTransition>
    </div>
  );
}
