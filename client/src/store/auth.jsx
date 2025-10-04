import { useEffect, createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading , setIsLoading] = useState(true);
    const [services, setServices] = useState([]);

    // Admin_Users ki data ko yaha se ham frontent me pass kar rahe hai.
    const authorizationToken = `Bearer ${token}`;

    const API = import.meta.env.VITE_APP_URI_API;

    const storetokenInLS = (servertoken) => {
        setToken(servertoken);
        localStorage.setItem('token', servertoken);
    };

    const isLoggedIn = !!token;
    console.log("isLoggedIn", isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        if(!token) return;
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("User data", data.userData);
                setUser(data.userData);
                setIsLoading(false); 
            }else{
                console.log("Error fetching user data");
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error fetching user data", error);
        }
    };

    const getServices = async () => {
        try {
            const response = await fetch(`${API}/api/data/service`, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                console.log("Services:", data.msg);
                setServices(data.msg);
            }
        } catch (error) {
            console.log("Services frontend error:", error);
        }
    };

    useEffect(() => {
        getServices();
        userAuthentication();
    }, [token]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storetokenInLS, LogoutUser, user, services , authorizationToken , isLoading , API}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue;
};
