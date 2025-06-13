import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";

import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";
import AuthScreen from "./components/AuthScreen";
import RegisterRouteWrapper from "./components/RegisterRouteWrapper";
import UsersList from "./components/usersList";
import { UserDetails } from "./components/userDetails";

interface User {
  email: string;
  role: string;
  status: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");
    const status = sessionStorage.getItem("status");
    if (email && role && status) {
      setUser({ email, role, status });
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("status");
    setUser(null);
  };

  if (!user) {
    return (
      <AuthScreen
        onLogin={(userData) => {
          sessionStorage.setItem("email", userData.email);
          sessionStorage.setItem("role", userData.role);
          sessionStorage.setItem("status", userData.status);
          setUser(userData);
        }}
      />
    );
  }

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar onLogout={handleLogout} />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/registerUsers" element={<RegisterRouteWrapper />} />
            <Route path="/registerUsers/:id" element={<RegisterRouteWrapper />} />
            <Route path="/usersList" element={<UsersList />} />
            <Route path="/userDetails/:id" element={<UserDetails />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
