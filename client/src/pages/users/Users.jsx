import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [alert, sertAlert] = useState({ type: "", msg: "" });
  let token = localStorage.getItem("token");

  const getALl = async () => {
    try {
      const reponse = await axios.get("/api/user/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(reponse.data.msg);
      setUsers(reponse.data.msg);
    } catch (error) {
      console.log(error);
      sertAlert({ type: "danger", msg: error.response.data.msg });
    }
  };

  useEffect(() => {
    getALl();
  }, []);

  return (
    <>
      <h1>Users</h1>
      {users.map((user, index) => {
        return (
          <div key={index}>
            <h1>{user.fullName}</h1>
            <h1>{user.email}</h1>
            <h1>{user.phone}</h1>
            <h1>{user.role}</h1>
          </div>
        );
      })}
    </>
  );
};

export default Users;
