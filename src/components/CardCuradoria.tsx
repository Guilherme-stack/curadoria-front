import { useNavigate } from "react-router-dom";
import type { ICuradoria } from "../@types/curadoria";

export function CardCuradoria({ curadoria }: { curadoria: ICuradoria }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/curadorias/${curadoria.id}`)}
      className="cursor-pointer px-3 py-2 rounded-lg transition-colors hover:bg-[#323130] group"
    >
      <p className="text-[#EEECE8] text-md font-medium truncate group-hover:text-white">
        {curadoria.titulo}
      </p>
      <p className="text-[#9B9792] text-xs truncate">{curadoria.autor}</p>
    </div>
  );
}
