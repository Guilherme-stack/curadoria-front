import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { Button } from "../../@/components/ui/button";
import { LogOut, Plus, BookMarked } from "lucide-react";
import { useEffect, useState } from "react";
import type { ICuradoria } from "../@types/curadoria";
import { curadoriaService } from "../services/curadoria.service";
import { CardCuradoria } from "./CardCuradoria";
interface SidebarProps {
  aoFechar?: () => void;
}
export function Sidebar({ aoFechar }: SidebarProps) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [curadorias, setCuradorias] = useState<ICuradoria[]>([]);

  async function buscarCuradorias() {
    try {
      const curadorias = await curadoriaService.listar();
      setCuradorias(curadorias);
    } catch (error) {
      console.log(error);
    }
  }

  function navegarPara(rota: string) {
    navigate(rota);
    aoFechar?.(); // fecha a sidebar no mobile após navegar
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  useEffect(() => {
    (async () => buscarCuradorias())();
  }, []);

  if (!usuario) return null;
  return (
    <aside className="min-w-64 h-screen flex flex-col bg-[#2B2A28] border-r border-[#3D3B38] p-4">
      <div className="flex items-center gap-2 mb-6">
        <BookMarked className="text-[#CC785C]" size={20} />
        <span className="text-[#EEECE8] font-semibold text-lg">Curadoria</span>
      </div>

      <Button
        onClick={() => navegarPara("/curadorias")}
        className="w-full bg-[#CC785C] hover:bg-[#b8684d] text-white mb-6 cursor-pointer"
      >
        <Plus size={16} className="mr-2" />
        Nova Curadoria
      </Button>

      <div className="flex-1 overflow-y-auto">
        <p className="text-[#9B9792] text-xs uppercase tracking-wider mb-3">
          Suas Curadorias
        </p>
        <div className="flex flex-col gap-3">
          {curadorias.map((c, i) => {
            return (
              <div onClick={() => navegarPara(`/curadorias/${c.id}`)}>
                <CardCuradoria curadoria={c} key={i} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#3D3B38] pt-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[#EEECE8] text-sm font-medium">
            {usuario.nome}
          </span>
          <span className="text-[#9B9792] text-xs">{usuario.email}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-[#9B9792] hover:text-[#EEECE8] hover:bg-[#323130]"
        >
          <LogOut size={16} />
        </Button>
      </div>
    </aside>
  );
}
