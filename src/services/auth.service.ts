import type { IUsuario } from "../contexts/auth.context";
import { api } from "./api";

export const authService = {
  async login(email: string, senha: string) {
    const { data } = await api.post("usuario/auth/login", { email, senha });
    return data;
  },
  async criar(email: string, senha: string, nome: string): Promise<IUsuario> {
    const { data } = await api.post("/usuario", { email, senha, nome });
    return data;
  },
};
