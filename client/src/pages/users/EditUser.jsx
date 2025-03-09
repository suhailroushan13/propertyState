import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  let token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    navigate("/login");
  }

  const getUserById = async () => {
    try {
      const response = await axios.get("/api/user/getbyid", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.msg);
      setFormData(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      let { fullName, email, password, phone } = formData;
      let response = await axios.put("/api/user/editbyid", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Update api called");
      console.log(response.data.msg);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>Edit User</h1>
      <form>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button onClick={handleUpdate}>Update </button>
      </form>
    </>
  );
};

export default EditUser;
