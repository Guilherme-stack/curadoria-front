import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { useAuth } from "./contexts/auth.context";
import { Login } from "./pages/Login";
import { Curadoria } from "./pages/Curadorias";
import { Cadastro } from "./pages/Cadastro";
import type { ReactNode } from "react";
import { CuradoriaDetalhe } from "./pages/CuradoriaDetalhe";
import { Layout } from "./components/Layout";

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
          element={
            <RotaProtegida>
              <Layout />
            </RotaProtegida>
          }
        >
          <Route path="/curadorias" element={<Curadoria />} />
          <Route path="/curadorias/:id" element={<CuradoriaDetalhe />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
