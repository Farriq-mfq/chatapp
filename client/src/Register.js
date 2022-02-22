import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatImg from "./assets/login.png";
import { RegisterAction } from "./redux/Actions/AuthAction";
import { Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";
export default function Register() {
  const [data, setdata] = React.useState({
    email: null,
    password: null,
  });
  const auth = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(RegisterAction(data));
  };
  const handleChange = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="bg-gray-200 p-2 min-h-screen w-full flex justify-center items-center">
      <form
        className="bg-white p-2 min-w-full md:min-w-[450px] rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="border-b py-5 relative border-gray-300">
          <div className="flex justify-center items-center mb-3">
            <img src={ChatImg} className="w-28" />
          </div>
          <CSSTransition
            in={auth.successRegister}
            unmountOnExit
            timeout={300}
            classNames="showSuccess"
          >
            <span className="absolute text-green-500 -bottom-4 left-0 right-0 m-auto w-fit text-center text-4xl font-bold bg-white">
              <HiCheckCircle />
            </span>
          </CSSTransition>
          {!auth.successRegister && (
            <span className="absolute text-gray-500 -bottom-4 left-0 right-0 m-auto w-fit text-center text-4xl font-bold bg-white">
              Daftar akun
            </span>
          )}
        </div>
        <div className="pt-3 px-3">
          <div className="my-3">
            <input
              type="text"
              name="name"
              placeholder="Masukan Nama..."
              className="outline-none w-full text-gray-600 bg-gray-200 text-sm p-3 rounded-md placeholder:text-gray-600 placeholder:text-sm"
              onChange={handleChange}
              required
            />
            {auth.error &&
              !auth.error.errLogin &&
              auth.error.map((val, idx) => {
                return (
                  val.param == "name" && (
                    <span key={idx} className="text-sm text-red-500">
                      {val.msg}
                    </span>
                  )
                );
              })}
          </div>
          <div className="my-3">
            <input
              type="email"
              name="email"
              placeholder="Masukan Email..."
              className="outline-none w-full text-gray-600 bg-gray-200 text-sm p-3 rounded-md placeholder:text-gray-600 placeholder:text-sm"
              onChange={handleChange}
              required
            />
            {auth.error &&
              !auth.error.errLogin &&
              auth.error.map((val, idx) => {
                return (
                  val.param == "email" && (
                    <span key={idx} className="text-sm text-red-500">
                      {val.msg}
                    </span>
                  )
                );
              })}
          </div>
          <div className="my-3">
            <input
              type="password"
              name="password"
              placeholder="Masukan Password..."
              className="outline-none w-full text-gray-600 bg-gray-200 text-sm p-3 rounded-md placeholder:text-gray-600 placeholder:text-sm"
              onChange={handleChange}
              required
            />
            {auth.error &&
              !auth.error.errLogin &&
              auth.error.map((val, idx) => {
                return (
                  val.param == "password" && (
                    <span key={idx} className="text-sm text-red-500">
                      {val.msg}
                    </span>
                  )
                );
              })}
          </div>
          <div className="my-3">
            <button className="p-3 bg-gray-900 w-full text-white rounded-md font-semibold">
              Daftar
            </button>
          </div>
          <div className="my-3 text-center text-sm text-blue-500">
            <Link to="/login">sudah punya akun silahkan Masuk ? </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
