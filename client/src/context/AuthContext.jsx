import { createContext, useContext, useEffect, useState } from "react";
import   api    from "../api/axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // user tekshirish
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // logout
  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      toast.info("Logged out");
    } catch {
      toast.error("Internal Server Error");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};