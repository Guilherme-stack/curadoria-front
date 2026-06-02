import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authService } from "../services/auth.service";

export interface IUsuario {
  nome: string;
  email: string;
  senha: string;
}

interface IAuthContext {
  usuario: IUsuario | null;
  token: string | null;
  login: (email: string, senha: string) => void;
  logout: () => void;
  estaAutenticado: boolean;
}

const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<IUsuario | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  async function login(email: string, senha: string) {
    const { token, usuario } = await authService.login(email, senha);
    localStorage.setItem("token", token);
    setUsuario(usuario);
    setToken(token);
  }

  useEffect(() => {
    async function recuperarSessao() {
      const usuario = await authService.me();
      setUsuario(usuario);
    }

    recuperarSessao();
  }, []);

  async function logout() {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        login,
        logout,
        estaAutenticado: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
