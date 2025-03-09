import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("buyer");
  const [alerts, setAlerts] = useState({ type: "", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const user = { fullName, email, password, phone, role };

      // Simplified URL if using Vite proxy
      const response = await axios.post(
        "http://localhost:5001/api/public/register",
        user
      );
      console.log(response.data);

      setAlerts({ type: "success", message: "Registration successful!" });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      setAlerts({
        type: "error",
        message: error.response?.data?.msg || "Registration failed!",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        {alerts.message && (
          <div
            className={`
              ${
                alerts.type === "success"
                  ? "bg-green-900 text-white"
                  : "bg-red-900 text-white"
              } 
            px-4 py-2 rounded-lg text-center`}
          >
            {alerts.message}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        <input
          type="text"
          placeholder="Phone Number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              required
              value="buyer"
              checked={role === "buyer"}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            Buyer
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              required
              name="role"
              value="seller"
              checked={role === "seller"}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            Seller
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              required
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            Admin
          </label>
        </div>

        <button
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
