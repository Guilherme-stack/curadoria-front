import { useParams } from "react-router-dom";
import { curadoriaService } from "../services/curadoria.service";
import { useEffect, useState } from "react";
import type { ICuradoria } from "../@types/curadoria";

export function CuradoriaDetalhe() {
  const params = useParams();
  const [curadoria, setCuradoria] = useState<ICuradoria | null>();
  const [erro, setErro] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(false);

  useEffect(() => {
    async function buscarPorId() {
      setCarregando(true);
      try {
        if (!params.id) {
          throw new Error("Erro ao tentar buscar curadoria");
        }
        const response = await curadoriaService.buscarPorId(params.id);
        if (response) {
          setCuradoria(response);
        }
      } catch {
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    buscarPorId();
  }, [params.id]);

  return (
    <div>
      {curadoria && (
        <div>
          <h1>{curadoria.titulo}</h1>
          <h2>{curadoria.autor}</h2>
          <h2>{curadoria.categoria}</h2>
          <p>{curadoria.insight}</p>
        </div>
      )}
      {erro && <p>Ocorreu um erro</p>}
      {carregando && <p>Carregando</p>}
    </div>
  );
}
