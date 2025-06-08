import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
axios.defaults.baseURL = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/api/farmers/me", {
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
    const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
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

  // const updateUserProfile = async (data) => {
  //   const token = localStorage.getItem("token");
  
  //   try {
  //     await axios.put("http://localhost:5000/api/farmers/me", data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
          
  //       },
        
  //     });
  //     console.log("Using token:", token);
  //   } catch (err) {
  //     if (err.response?.status === 404) {
  //       // If not found, create a new profile
  //       await axios.post("http://localhost:5000/api/farmers", data, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //     } else {
  //       throw err;
  //     }
  //   }
  // };

  // const updateUserProfile = async (profileData) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) throw new Error("No token found");
  
  //     const res = await axios.put("http://localhost:5000/api/farmers/me", profileData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  
  //     return res.data;
  //   } catch (err) {
  //     console.error("Profile update error:", err);
  //     throw err;
  //   }
  // };
  const updateUserProfile = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
  
    try {
      await axios.put("http://localhost:5000/api/farmers/me", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      if (err.response?.status === 404) {
        console.log("Profile not found, creating new one...");
        await axios.post("http://localhost:5000/api/farmers/", data, {
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
      await axios.put("http://localhost:5000/api/farminfo/me", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      if (err.response?.status === 404) {
        await axios.post("http://localhost:5000/api/farminfo", data, {
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
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
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
