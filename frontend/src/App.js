import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Register />}
          ></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          ></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route
            path="/messenger"
            element={user ? <Messenger /> : <Navigate to="/" />}>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
