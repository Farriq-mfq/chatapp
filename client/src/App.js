import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Chating from "./Chating";
import Login from "./Login";
import { GetUserBYID } from "./redux/Actions/AuthAction";
import Register from "./Register";
function App() {
  const dispatch = useDispatch();
  dispatch(GetUserBYID());
  const auth = useSelector((state) => {
    return state.auth;
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          auth.user != null ? <Chating /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/login"
        element={auth.user == null ? <Login /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={auth.user == null ? <Register /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
