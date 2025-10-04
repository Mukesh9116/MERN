import { NavLink, Outlet , Navigate} from "react-router-dom";
import { FaUsers, FaEnvelope, FaCogs, FaHome } from "react-icons/fa"; // react-icons
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const {user , isLoading} = useAuth();
  console.log("Admin Layout : ",user);

  if(isLoading){
    return <h1>Loading.....</h1>
  }

  if(!user.isAdmin){
    return <Navigate to="/" />
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col">
        <div className="p-4 text-center text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition ${
                    isActive ? "bg-gray-700 text-white" : ""
                  }`
                }
              >
                <FaUsers className="mr-3 text-lg" />
                Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/contacts"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition ${
                    isActive ? "bg-gray-700 text-white" : ""
                  }`
                }
              >
                <FaEnvelope className="mr-3 text-lg" />
                Contacts
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition ${
                    isActive ? "bg-gray-700 text-white" : ""
                  }`
                }
              >
                <FaCogs className="mr-3 text-lg" />
                Services
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition ${
                    isActive ? "bg-gray-700 text-white" : ""
                  }`
                }
              >
                <FaHome className="mr-3 text-lg" />
                Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
