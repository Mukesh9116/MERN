import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const { user , API} = useAuth();
  
  useEffect(() => {
    if (user) {
      setContact({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data);
        toast.success("Send message successfully");
        setContact(defaultContactFormData);
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <div
      className="section-registration min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(90deg, #0700b8 0%, #00ff88 100%)",
      }}
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-2xl shadow-lg overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(0,255,136,0.1))",
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
          <h1 className="text-3xl font-bold mb-6 text-center lg:text-left bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg,#0700b8,#00ff88)" }}
          >
            Contact Form
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
                autoComplete="off"
                required
                value={contact.username}
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
                autoComplete="off"
                required
                value={contact.email}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block mb-1 font-medium">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Type your message here..."
                rows="4"
                required
                value={contact.message}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0700b8] to-[#00ff88] hover:opacity-90 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
