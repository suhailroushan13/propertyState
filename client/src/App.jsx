import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Register from "./pages/public/Register";
import Login from "./pages/public/Login";
import Dashboard from "./pages/users/Dashboard";
import PrivateOutlet from "./PrivateOutlet";
import Users from "./pages/users/Users";
import UserId from "./pages/users/UserId";
import EditUser from "./pages/users/EditUser";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateOutlet />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userid" element={<UserId />} />
            <Route path="/edituser" element={<EditUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
