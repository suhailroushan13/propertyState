import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link
        className="btn bg-blue-700 text-white text-center p-2 px-2 py-3  mt-2 ml-2 "
        to="/register"
      >
        Register
      </Link>
      <Link
        className="btn bg-blue-700 text-white text-center px-2 py-3 p-2 ml-2 "
        to="/login"
      >
        Login
      </Link>
    </>
  );
};

export default Home;
