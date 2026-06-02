import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

export function Layout() {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <div className="flex h-screen bg-[#1C1B1A]">
      {/* Overlay escuro ao abrir sidebar no mobile */}
      {sidebarAberta && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarAberta(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform transition-transform duration-300
        ${sidebarAberta ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <Sidebar aoFechar={() => setSidebarAberta(false)} />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header mobile */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#3D3B38]">
          <button
            onClick={() => setSidebarAberta(true)}
            className="text-[#9B9792] hover:text-[#EEECE8] transition-colors"
          >
            <Menu size={20} />
          </button>
          <span className="text-[#EEECE8] font-semibold">Curadoria</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
