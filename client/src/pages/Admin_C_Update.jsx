// pages/Admin_Update.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const UpdateContact = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();

  // Initialize state with empty values
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch existing user data
  const fetchContact = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/contacts/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch contact");

      const data = await response.json();

      // Pre-fill the form with existing user data
      setContact({
        username: data?.username || "",
        email: data?.email || "",
        message: data?.message || "",
      });

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  // Update state when inputs change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/contacts/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(contact),
        }
      );

      if (!response.ok) throw new Error("Failed to update contact");

      await response.json();
      toast.success("Contact updated successfully!");
      navigate("/admin/contacts"); // Redirect to contacts list
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Show loading or error messages
  if (loading) return <p>Loading contact data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Render pre-filled form
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Edit Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={contact?.username || ""}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={contact?.email || ""}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Message</label>
          <textarea
            name="message"
            placeholder="Type your message here..."
            rows="4"
            required
            value={contact?.message || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Update Contact
        </button>
      </form>
    </div>
  );
};
