import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login-temp";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import Modules from "./pages/Modules";


import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules"
          element={
            <ProtectedRoute>
              <Modules />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
