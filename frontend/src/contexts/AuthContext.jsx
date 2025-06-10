import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "https://cyfuture-ai-srever.onrender.com/api";

const AuthContext = createContext();
//axios.defaults.baseURL = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.get("/farmers/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => setCurrentUser(res.data))
        .catch((err) => {
          if (err.response?.status === 404) {
            // Profile not yet created — that's fine
            console.log("No farmer profile yet.");
          } else {
            // Actual token issue — log out
            setToken(null);
            localStorage.removeItem("token");
          }
        });
    }
  }, [token]);
  
  

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setCurrentUser(res.data.user);
    console.log("Login response:", res.data);

  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);


    navigate("/signin");
  };

  const updateUserProfile = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
  
    try {
      await axios.put("/farmers/me", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      if (err.response?.status === 404) {
        console.log("Profile not found, creating new one...");
        await axios.post("/farmers/", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        console.error("Profile update error:", err);
        throw err;
      }
    }
  };
  
  

  const updateFarmInfo = async (data) => {
    const token = localStorage.getItem("token");
  
    try {
      await axios.put("/farminfo/me", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      if (err.response?.status === 404) {
        await axios.post("/farminfo", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        throw err;
      }
    }
  };
  
  
  const signup = async (email, password, name) => {
    const res = await axios.post("/auth/signup", {
      email,
      password,
      name
    });
  
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setCurrentUser(res.data.user);
    console.log("Login response:", res.data);

  };
  
  return (
    <AuthContext.Provider value={{ currentUser, signup , token, login, logout, updateUserProfile, updateFarmInfo }}>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
