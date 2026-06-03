import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { useAuth } from "./contexts/auth.context";
import { Login } from "./pages/Login";
import { Curadoria } from "./pages/Curadorias";
import { Cadastro } from "./pages/Cadastro";
import type { ReactNode } from "react";
import { CuradoriaDetalhe } from "./pages/CuradoriaDetalhe";
import { Layout } from "./components/Layout";

// Rota protegida — redireciona para login se não autenticado
function RotaProtegida({ children }: { children: ReactNode }) {
  const { estaAutenticado } = useAuth();
  if (!estaAutenticado) return <Navigate to="/login" />;
  return children;
}

// Rota pública — redireciona para curadorias se já autenticado
function RotaPublica({ children }: { children: ReactNode }) {
  const { estaAutenticado } = useAuth();
  if (estaAutenticado) return <Navigate to="/curadorias" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <RotaPublica>
              <Login />
            </RotaPublica>
          }
        />
        <Route
          path="/cadastro"
          element={
            <RotaPublica>
              <Cadastro />
            </RotaPublica>
          }
        />
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
