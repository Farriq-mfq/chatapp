import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Getuser, SearchUser } from "../redux/Actions/MessageAction";
import "./chat.css";
import ChatList from "./ChatList";
import ChatSearch from "./ChatSearch";
import TopChat from "./TopChat";
const Loading = () => {
  return (
    <div className="h-12 bg-gray-200 rounded w-full p-2 flex items-center space-x-2 animate-pulse">
      <div className="h-7 w-7 rounded-full bg-gray-300 "></div>
      <div className="h-7 bg-gray-300 rounded w-full "></div>
    </div>
  );
};
export default function Chat() {
  const dispatch = useDispatch();
  dispatch(Getuser());
  let users = useSelector((state) => {
    return state.message.users;
  });
  const [search, setsearch] = React.useState("");

  return (
    <div className="bg-white shadow-xl w-full fixed left-0 bottom-0 top-0 min-h-screen z-20 md:w-[40%] lg:w-[30%] CHAT__ ">
      <TopChat />
      <ChatSearch />
      <ul className="p-2 flex flex-col space-y-5 overflow-y-auto heightCHat">
        {users ? (
          users.length ? (
            users.map((val, idx) => {
              return <ChatList key={idx} data={val} />;
            })
          ) : (
            <h1>User empty!!!</h1>
          )
        ) : (
          <>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </>
        )}
      </ul>
    </div>
  );
}
