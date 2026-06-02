import type { ICuradoria } from "../@types/curadoria";
import { api } from "./api";

export const curadoriaService = {
  async listar() {
    const { data } = await api.get("/curadoria");
    return data;
  },
  async buscarPorId(id: string): Promise<ICuradoria> {
    const { data } = await api.get(`/curadoria/${id}`);
    return data;
  },
  async criar(dados: Record<string, unknown>) {
    const { data } = await api.post(`/curadoria`, dados);
    return data;
  },
  async editar(id: string, dados: Record<string, unknown>) {
    const { data } = await api.patch(`/curadoria/${id}`, dados);
    return data;
  },
  async gerarInsight(
    id: string,
    dados: Record<string, unknown>,
  ): Promise<ICuradoria> {
    const { data } = await api.patch(`/curadoria/insight/${id}`, dados);
    return data;
  },
  async deletar(id: string) {
    await api.delete(`/curadoria/${id}`);
  },
};
