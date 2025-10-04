import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storetokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log("Response from server ", res_data.extraDetails);

      if (response.ok) {
        storetokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successfully");
        navigate("/"); 
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.error("register", error);
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
          background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(0,255,136,0.1))",
        }}
      >
        {/* Left: Image */}
        <div className="registration-image hidden lg:block">
          <img
            src="/image/image.png"
            alt="registration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="registration-form flex flex-col justify-center p-8 sm:p-12">
          <h1
            className="text-3xl font-bold mb-6 text-center lg:text-left bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #0700b8, #00ff88)",
            }}
          >
            Registration Form
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-1 font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
                value={user.username}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                value={user.email}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-1 font-medium">
                Mobile Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                required
                value={user.phone}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                required
                value={user.password}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0700b8] to-[#00ff88] hover:opacity-90 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
