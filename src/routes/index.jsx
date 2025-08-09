import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Landing from "../pages/landing/Landing";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";



const router = createBrowserRouter([
  { path: "/", element: <App />, 
    children: [
        {path:"/",element:<Landing/>},
        
        { path: "/login",  element:<Login/>},
        {path:"/Register",element:<Register/>},
        {path:"/dashboard", element:<Dashboard/>}
        
    
    
    
    ] },
]);

export default router;
