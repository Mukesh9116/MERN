import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-50 to-cyan-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo / Brand */}
        <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          <NavLink to="/">Thapa Technical</NavLink>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-500 border-b-2 border-cyan-500"
                    : "hover:text-blue-500 transition-colors duration-200"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-500 border-b-2 border-cyan-500"
                    : "hover:text-blue-500 transition-colors duration-200"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-500 border-b-2 border-cyan-500"
                    : "hover:text-blue-500 transition-colors duration-200"
                }
              >
                Service
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-500 border-b-2 border-cyan-500"
                    : "hover:text-blue-500 transition-colors duration-200"
                }
              >
                Contact
              </NavLink>
            </li>

            {isLoggedIn ? (
              <li>
                <NavLink
                  to="/logout"
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-500 border-b-2 border-cyan-500"
                      : "hover:text-blue-500 transition-colors duration-200"
                  }
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-cyan-500 border-b-2 border-cyan-500"
                        : "hover:text-blue-500 transition-colors duration-200"
                    }
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-cyan-500 border-b-2 border-cyan-500"
                        : "hover:text-blue-500 transition-colors duration-200"
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
