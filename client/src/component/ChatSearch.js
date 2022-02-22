import React, { useRef } from "react";
import { HiSearch, HiArrowNarrowLeft } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";

export default function ChatSearch(props) {
  const [isFocus, setIsfocus] = React.useState(false);
  const [search, setsearch] = React.useState("");
  const input = useRef();
  const Focus = () => {
    setIsfocus(true);
  };
  const Blur = (e) => {
    if (!e.target.value) {
      setIsfocus(false);
    }
  };
  const handleChange = (e) => {
    if (e.target.value.trim()) {
      setsearch(e.target.value);
      setIsfocus(true);
    } else {
      setIsfocus(false);
    }
  };
  return (
    <div className="w-full bg-white border-b h-14 flex items-center px-2 text-gray-600 shadow">
      <div className="bg-gray-100 w-full p-2 rounded-lg flex items-center overflow-hidden">
        <button
          className="h-6 w-6 flex"
          onClick={(e) => {
            e.preventDefault();
            if (Focus) {
              input.current.value = null;
              setIsfocus(false);
            } else {
              input.current.focus();
            }
          }}
        >
          <CSSTransition
            in={isFocus}
            timeout={300}
            classNames="showButtonSearch"
            unmountOnExit
          >
            <HiArrowNarrowLeft className="w-full h-full" />
          </CSSTransition>
          <CSSTransition
            in={!isFocus}
            timeout={300}
            classNames="showSearchIcon"
            unmountOnExit
          >
            <HiSearch className="w-full h-full" />
          </CSSTransition>
        </button>
        <input
          onFocus={Focus}
          onBlur={Blur}
          onChange={handleChange}
          ref={input}
          type="search"
          placeholder="Cari chat"
          className="outline-none w-full text-gray-600 bg-transparent text-sm ml-3 placeholder:text-gray-600 placeholder:text-sm"
        />
      </div>
    </div>
  );
}
