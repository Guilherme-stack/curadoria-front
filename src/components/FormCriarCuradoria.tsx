import { useState } from "react";
import { curadoriaService } from "../services/curadoria.service";
import type { ICuradoria } from "../@types/curadoria";

export function FormCriarCuradoria({
  aoCriar,
}: {
  aoCriar: (novaCuradoria: ICuradoria) => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fonte, setFonte] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [carregando, setCarregando] = useState<boolean>(false);

  const aoCriarCuradoria = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      setCarregando(true);
      const criarCuradoria = await curadoriaService.criar({
        titulo: titulo,
        autor: autor,
        conteudo: conteudo,
        categoria: categoria,
      });
      aoCriar(criarCuradoria);
    } catch (error) {
      console.log(error);
    } finally {
      setCarregando(false);
      setTitulo("");
      setAutor("");
      setCategoria("");
      setFonte("");
      setConteudo("");
    }
  };
  return (
    <div>
      <form
        onSubmit={aoCriarCuradoria}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="titulo">Titulo</label>
        <input
          type="text"
          name="titulo"
          placeholder="ex: Musica de Caetano Veloso"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label htmlFor="autor">Autor</label>
        <input
          type="text"
          name="autor"
          placeholder="ex: Caetano Veloso"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <label htmlFor="categoria">Categoria</label>
        <input
          type="text"
          name="categoria"
          placeholder="ex: Musica"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <label htmlFor="fonte">Fonte</label>
        <input
          type="text"
          name="fonte"
          placeholder="ex: http://letras.com.br"
          value={fonte}
          onChange={(e) => setFonte(e.target.value)}
        />
        <label htmlFor="conteudo">Conteudo</label>
        <input
          type="text"
          name="conteudo"
          placeholder="ex: as vezes no silêncio da noite..."
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        />
        <button type="submit">
          {carregando ? "Carregando" : "Criar Curadoria"}
        </button>
      </form>
    </div>
  );
}
