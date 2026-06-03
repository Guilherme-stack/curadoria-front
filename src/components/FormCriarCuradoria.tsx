import { useState } from "react";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { Textarea } from "../../@/components/ui/textarea";
import { curadoriaService } from "../services/curadoria.service";
import type { ICuradoria } from "../@types/curadoria";
import { Sparkles, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export function FormCriarCuradoria({
  aoCriarCuradoria,
}: {
  aoCriarCuradoria: (nova: ICuradoria) => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fonte, setFonte] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setCarregando(true);

    try {
      const nova = await curadoriaService.criar({
        titulo,
        autor,
        conteudo,
        categoria,
        fonte,
        tags: [],
      });
      setTitulo("");
      setAutor("");
      setCategoria("");
      setFonte("");
      setConteudo("");

      navigate(`/curadorias/${nova.id}`);
      aoCriarCuradoria(nova);
      toast.success("Curadoria criada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar curadoria.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 lg:mt-20">
      <div className="text-center mb-10">
        <h1 className="text-[#EEECE8] text-3xl font-semibold mb-2">
          O que você quer curar hoje?
        </h1>
        <p className="text-[#9B9792] text-sm">
          Cole um trecho de música, livro ou fala e descubra o que há nas
          entrelinhas.
        </p>
      </div>

      <div className="bg-[#2B2A28] border border-[#3D3B38] rounded-xl p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-[#9B9792] text-xs uppercase tracking-wider">
                Título
              </Label>
              <Input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Melhor Lugar"
                className="bg-[#323130] border-[#3D3B38] text-[#EEECE8] placeholder:text-[#9B9792] focus-visible:ring-[#CC785C]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-[#9B9792] text-xs uppercase tracking-wider">
                Autor
              </Label>
              <Input
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder="Jorge Vercilo"
                className="bg-[#323130] border-[#3D3B38] text-[#EEECE8] placeholder:text-[#9B9792] focus-visible:ring-[#CC785C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-[#9B9792] text-xs uppercase tracking-wider">
                Categoria
              </Label>
              <Select onValueChange={setCategoria} value={categoria}>
                <SelectTrigger className="bg-[#323130] border-[#3D3B38] text-[#EEECE8] focus:ring-[#CC785C]">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent className="bg-[#2B2A28] border-[#3D3B38]">
                  <SelectItem
                    value="Música"
                    className="text-[#EEECE8] focus:bg-[#323130]"
                  >
                    Música
                  </SelectItem>
                  <SelectItem
                    value="Literatura"
                    className="text-[#EEECE8] focus:bg-[#323130]"
                  >
                    Literatura
                  </SelectItem>
                  <SelectItem
                    value="Cinema"
                    className="text-[#EEECE8] focus:bg-[#323130]"
                  >
                    Cinema
                  </SelectItem>
                  <SelectItem
                    value="Fala"
                    className="text-[#EEECE8] focus:bg-[#323130]"
                  >
                    Fala
                  </SelectItem>
                  <SelectItem
                    value="Filosofia"
                    className="text-[#EEECE8] focus:bg-[#323130]"
                  >
                    Filosofia
                  </SelectItem>
                  <SelectItem
                    value="Poesia"
                    className="text-[#EEECE8] focus:bg-[#323130]"
                  >
                    Poesia
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-[#9B9792] text-xs uppercase tracking-wider">
                Fonte
                <span className="ml-1 normal-case text-[#9B9792]">
                  (opcional)
                </span>
              </Label>
              <Input
                value={fonte}
                onChange={(e) => setFonte(e.target.value)}
                placeholder="URL ou referência"
                className="bg-[#323130] border-[#3D3B38] text-[#EEECE8] placeholder:text-[#9B9792] focus-visible:ring-[#CC785C]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[#9B9792] text-xs uppercase tracking-wider">
              Conteúdo
            </Label>
            <Textarea
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              placeholder="Cole aqui o trecho que deseja curar..."
              className="bg-[#323130] border-[#3D3B38] text-[#EEECE8] placeholder:text-[#9B9792] focus-visible:ring-[#CC785C] min-h-32 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={
              carregando || !titulo || !autor || !categoria || !conteudo
            }
            className="w-full bg-[#CC785C] hover:bg-[#b8684d] text-white h-11 mt-2 disabled:opacity-40"
          >
            {carregando ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Gerando insight...
              </>
            ) : (
              <>
                <Sparkles size={16} className="mr-2" />
                Curar Fragmento
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
