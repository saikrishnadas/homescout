import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = true;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
