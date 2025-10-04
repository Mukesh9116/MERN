// pages/EditUser.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const UpdateUser = () => {
  const { id } = useParams(); // get user ID from URL
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": authorizationToken, // JWT if used
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };


  // Fetch user data
  useEffect(() => {
    fetchUser();
  }, [id]);



  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/update/${id}`, {
        method: "PATCH", // PATCH method for update
        headers: {
          "Content-Type": "application/json",
          "Authorization": authorizationToken, // JWT
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Failed to update user");
      const updatedUser = await response.json();
      console.log("Updated user:", updatedUser);
      toast.success("User updated successfully!");
      navigate("/admin/users"); // redirect back to users list
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isAdmin"
            checked={user.isAdmin}
            onChange={handleChange}
          />
          <label>Is Admin?</label>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Update User
        </button>
      </form>
    </div>
  );
};
