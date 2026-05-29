import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { useAuth } from "./contexts/auth.context";
import { Login } from "./pages/Login";
import { Curadoria } from "./pages/Curadorias";
import { Cadastro } from "./pages/Cadastro";
import type { ReactNode } from "react";
import { CuradoriaDetalhe } from "./pages/CuradoriaDetalhe";

function RotaProtegida({ children }: { children: ReactNode }) {
  const { estaAutenticado } = useAuth();
  if (!estaAutenticado) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/curadorias"
          element={
            <RotaProtegida>
              <Curadoria />
            </RotaProtegida>
          }
        />
        <Route
          path="/curadorias/:id"
          element={
            <RotaProtegida>
              <CuradoriaDetalhe />
            </RotaProtegida>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
