import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();


  
  // Set auth token in axios headers and fetch user
  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     if (token) {
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //       try {
  //         await fetchUser();
  //       } catch (err) {
  //         logout();
  //       }
  //     }
  //     setLoading(false);
  //   };

  //   initializeAuth();
  // }, [token]);

  // const fetchUser = async () => {
  //   const res = await axios.get('http://localhost:8000/auth/me'); // Update with your endpoint
  //   setUser(res.data);
  // };

  const register = async (userData) => {
    try {
      const res = await axios.post('https://evalcore-server.onrender.com/auth/register', userData);
      setToken(res.data.token);
      navigate('/login');
    } catch (err) {
      throw err.response?.data?.error || 'Registration failed';
    }
  };

  const login = async (credentials) => {
    try {
      const res = await axios.post('https://evalcore-server.onrender.com/auth/login', credentials);
         localStorage.setItem('token', res.data.data.token);
    localStorage.setItem('user', JSON.stringify({
      email: res.data.email,
      name: res.data.name,
      role: res.data.role,
      _id: res.data._id
    }));

   

      // Store token immediately
      setToken(res.data.token);
      setUser(res.data || null);
      localStorage.setItem('user', JSON.stringify(res.data));
      
    } catch (err) {
      throw err.response?.data?.error || 'Login failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);