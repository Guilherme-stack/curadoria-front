import { useOutletContext } from "react-router-dom";
import { FormCriarCuradoria } from "../components/FormCriarCuradoria";
import type { OutletContext } from "../components/Layout";

export function Curadoria() {
  const { aocriarCuradoria } = useOutletContext<OutletContext>();

  return (
    <div className="p-4 lg:p-10">
      <FormCriarCuradoria aoCriarCuradoria={aocriarCuradoria} />
    </div>
  );
}
