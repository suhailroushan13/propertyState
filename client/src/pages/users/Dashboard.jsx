import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <button
        className="btn bg-red-700 text-white text-center p-2 px-2 py-3  mt-2 ml-2"
        onClick={handleLogout}
      >
        Logout
      </button>
      <button
        className="btn bg-red-700 text-white text-center p-2 px-2 py-3  mt-2 ml-2"
        onClick={() => navigate("/users")}
      >
        Users
      </button>
    </>
  );
};

export default Dashboard;
