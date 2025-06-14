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
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed p-3 top-4 left-4 z-50 text-gray-700 bg-white rounded-full shadow-lg transition-transform hover:scale-105"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white z-40 md:static md:z-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col h-screen`} // usa h-screen en lugar de h-[100vh]
      >
        {/* Header - sticky */}
        <div className="p-6 text-xl font-bold border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
          My App
        </div>

        {/* Scrollable nav content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-1 p-4">
            <Link
              to="/dashboard"
              className="hover:bg-gray-700 p-3 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/usersList"
              className="hover:bg-gray-700 p-3 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Usuarios
            </Link>
            <Link
              to="/dealerList"
              className="hover:bg-gray-700 p-3 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Repartidores
            </Link>
          </nav>
        </div>

        {/* Footer - sticky */}
        <div className="p-4 border-t border-gray-700 sticky bottom-0 bg-gray-800">
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
}
