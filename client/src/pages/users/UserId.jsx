import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserId = () => {
  const [data, setData] = useState(null);

  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const getUserById = async () => {
    try {
      const response = await axios.get("/api/user/getbyid", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.msg);
      setData(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      let response = await axios.delete("/api/user/deletebyid", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.msg); 
    
      localStorage.clear();

      navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <>
      <h1>User By Id</h1>
      {data ? (
        <div>
          <p>Name: {data.fullName}</p>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button
        className="btn bg-red-500 py-2 px-4 rounded-full text-white mt-4"
        onClick={deleteUser}
      >
        Delete Account
      </button>
    </>
  );
};

export default UserId;
