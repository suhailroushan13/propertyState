import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerts, setAlerts] = useState({ type: "", msg: "" });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      let payload = { email, password };
      console.log(payload);
      let response = await axios.post("/api/public/login", payload);
      console.log(response.data);
      let token = response.data.token;
      localStorage.setItem("token", token);
      setAlerts({ type: "success", msg: response.data.msg });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.log(error.response.data.msg);
      setAlerts({
        type: "danger",
        msg: error.response.data?.msg || "Something went wrong",
      });
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      {alerts.msg && (
        <div
          className={`
              ${
                alerts.type === "success"
                  ? "bg-green-900 text-white"
                  : "bg-red-900 text-white"
              } 
            px-4 py-2 rounded-lg text-center`}
        >
          {alerts.msg}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-black p-2 m-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-black p-2 m-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn bg-blue-700 text-white text-center px-2 py-3 p-2 ml-2 "
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
