import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { storetokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      if (response.ok) {
        storetokenInLS(res_data.token);
        localStorage.setItem("token", res_data.token);
        setUser({ email: "", password: "" });
        toast.success("Login successful");
        navigate('/');
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.error("login", error);
    }
  };

  return (
    <div
      className="section-registration min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(90deg, #0700b8 0%, #00ff88 100%)",
      }}
    >
      <div
        className="container mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-2xl shadow-lg overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.15)", // semi-transparent form
          backdropFilter: "blur(10px)", // adds glass effect
        }}
      >
        {/* Left: Image */}
        <div className="registration-image hidden lg:block">
          <img
            src="/image/image.png"
            alt="login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="registration-form flex flex-col justify-center p-8 sm:p-12">
          <h1 className="text-3xl font-bold mb-6 text-center lg:text-left text-white">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                autoComplete="off"
                required
                value={user.email}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                autoComplete="off"
                required
                value={user.password}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};