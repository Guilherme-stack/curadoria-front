import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { curadoriaService } from "../services/curadoria.service";
import { FormCriarCuradoria } from "../components/FormCriarCuradoria";
import { CardCuradoria } from "../components/CardCuradoria";
import type { ICuradoria } from "../@types/curadoria";

export function Curadoria() {
  const [curadorias, setCuradorias] = useState<ICuradoria[]>([]);

  async function buscarCuradorias() {
    try {
      const curadorias = await curadoriaService.listar();
      setCuradorias(curadorias);
    } catch (error) {
      console.log(error);
    }
  }

  function aoCriarCuradoria(novaCuradoria: ICuradoria) {
    setCuradorias((e) => [novaCuradoria, ...e]);
  }

  useEffect(() => {
    (async () => buscarCuradorias())();
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <FormCriarCuradoria aoCriar={aoCriarCuradoria} />
        {curadorias.map((c, i) => {
          return <CardCuradoria curadoria={c} key={i} />;
        })}
      </div>
    </div>
  );
}
