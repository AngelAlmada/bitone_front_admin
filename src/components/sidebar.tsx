import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="md:hidden p-4 absolute top-4 left-4 z-50 text-gray-700 bg-white rounded shadow"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-gray-800 text-white transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          My App
        </div>
        <nav className="flex flex-col gap-4 p-6 flex-grow">
          <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/usersList" className="hover:bg-gray-700 p-2 rounded">
            Usuarios
          </Link>
        </nav>
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 justify-center bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
}
