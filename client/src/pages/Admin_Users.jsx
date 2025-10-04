import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  //*---------------------------------------------->>
  //* Get all users ------------------------------->>
  //*---------------------------------------------->>
  const getAllUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      console.log("Users data: ", data);
      setUsers(data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  //*---------------------------------------------->>
  //* Delete user --------------------------------->>
  //*---------------------------------------------->>
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      const data = await res.json().catch(() => null);

      if (res.ok) {
        toast.success(data?.message || "User deleted successfully");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }

      console.log(`User with ID ${id} deleted successfully`);
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <section
      className="min-h-screen p-5 m-0"
      style={{
        background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)",
      }}
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-white">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              {index + 1}. {user.username}
            </h2>
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
            <div className="mt-4 flex space-x-3">
              <Link
                to={`/admin/users/${user._id}/edit`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Update
              </Link>

              <button
                onClick={() => handleDelete(user._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
