import { useNavigate } from "react-router-dom";
import type { ICuradoria } from "../@types/curadoria";

export function CardCuradoria({ curadoria }: { curadoria: ICuradoria }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/curadorias/${curadoria.id}`)}>
      <h1>{curadoria.titulo}</h1>
      <h2>{curadoria.autor}</h2>
      <h2>{curadoria.categoria}</h2>
      <p>{curadoria.insight?.slice(0, 150)}...</p>
    </div>
  );
}
