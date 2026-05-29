export interface ICuradoriaInput {
  titulo: string;
  autor: string;
  categoria: string;
  conteudo: string;
  tags: string[];
  fonte: string;
  usuarioId: string;
}

export interface ICuradoria extends ICuradoriaInput {
  id: string;
  createdAt: Date;
  insight: string | null;
}

export type ICuradoriaCreate = ICuradoriaInput;
