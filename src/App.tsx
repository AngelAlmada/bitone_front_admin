import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";

import Sidebar from "./components/sidebar";
import Dashboard from "./components/DashBoard";
import AuthScreen from "./components/AuthScreen";
import RegisterRouteWrapper from "./components/RegisterRouteWrapper";
import UsersList from "./components/usersList";
import { UserDetails } from "./components/userDetails";
import DealerList from "./components/dealerList";
import DealerForm from "./components/RegisterDealerForm";
import DealerView from "./components/DealerView";
import Clients from "./pages/ClientsInfo";

interface User {
  email: string;
  rol: string;
  status: string;
}
const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const rol = sessionStorage.getItem("rol");
    const status = sessionStorage.getItem("status");

    if (email && rol && status) {
      setUser({ email, rol, status });
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("status");
    setUser(null);
  };

  if (loading) {
    return <div className="p-4 text-center">Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Ruta pública: Clients */}
        <Route path="/clients" element={<Clients />} />

        {/* ✅ Si el usuario no está autenticado, redirige a AuthScreen */}
        {!user ? (
          <Route
            path="*"
            element={
              <AuthScreen
                onLogin={(userData) => {
                  sessionStorage.setItem("email", userData.email);
                  sessionStorage.setItem("rol", userData.rol);
                  sessionStorage.setItem("status", userData.status);
                  setUser(userData);
                }}
              />
            }
          />
        ) : (
          // ✅ Rutas privadas si hay sesión activa
          <Route
            path="*"
            element={
              <div className="flex h-screen overflow-hidden">
                <Sidebar onLogout={handleLogout} />
                <main className="flex-1 h-screen overflow-y-auto bg-gray-100 p-4">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                      path="/registerUsers"
                      element={<RegisterRouteWrapper />}
                    />
                    <Route
                      path="/RegisterDealerForm"
                      element={<DealerForm />}
                    />
                    <Route
                      path="/RegisterDealerForm/:id"
                      element={<DealerForm />}
                    />
                    <Route path="/DealerView/:id" element={<DealerView />} />
                    <Route
                      path="/registerUsers/:id"
                      element={<RegisterRouteWrapper />}
                    />
                    <Route path="/usersList" element={<UsersList />} />
                    <Route path="/dealerList" element={<DealerList />} />
                    <Route path="/userDetails/:id" element={<UserDetails />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </main>
              </div>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
