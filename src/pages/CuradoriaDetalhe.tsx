import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { curadoriaService } from "../services/curadoria.service";
import { useEffect, useState } from "react";
import type { ICuradoria } from "../@types/curadoria";
import { Button } from "../../@/components/ui/button";
import { Sparkles, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SkeletonDetalhe } from "../components/skeletons/SkeletonDetalhe";
import type { OutletContext } from "../components/Layout";

export function CuradoriaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curadoria, setCuradoria] = useState<ICuradoria | null>(null);
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [deletando, setDeletando] = useState(false);
  const [gerandoInsight, setGerandoInsight] = useState(false);
  const { aoDeletarCuradoria } = useOutletContext<OutletContext>();

  useEffect(() => {
    async function buscarPorId() {
      setCarregando(true);
      try {
        if (!id) throw new Error("ID não encontrado");
        const response = await curadoriaService.buscarPorId(id);
        setCuradoria(response);
      } catch {
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    buscarPorId();
  }, [id]);

  async function handleDeletar() {
    if (!id) return;
    setDeletando(true);
    try {
      await curadoriaService.deletar(id);
      aoDeletarCuradoria(id);
      toast.success("Curadoria deletada.");
      navigate("/curadorias");
    } catch {
      console.error("Erro ao deletar");
      setDeletando(false);
      toast.error("Erro ao deletar curadoria.");
    }
  }

  async function gerarInsight() {
    if (!id || !curadoria) return;
    setGerandoInsight(true);
    try {
      const curadoriaAtt = await curadoriaService.gerarInsight(id, {
        autor: curadoria.autor,
        categoria: curadoria.categoria,
        conteudo: curadoria?.categoria,
        titulo: curadoria?.titulo,
        usuarioId: curadoria?.usuarioId,
        id: curadoria?.id,
        fonte: curadoria?.fonte,
      });

      setCuradoria(curadoriaAtt);
      toast.success("Insight gerado com sucesso.");
    } catch {
      console.error("Erro ao gerar insight.");
      setGerandoInsight(false);
      toast.error("Erro ao gerar insight.");
    }
  }

  return (
    <div className="p-4 lg:p-10">
      <main className="flex-1 overflow-y-auto p-3 lg:p-10">
        {carregando && <SkeletonDetalhe />}

        {erro && (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#9B9792]">Curadoria não encontrada.</p>
          </div>
        )}

        {curadoria && (
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => navigate("/curadorias")}
                className="flex items-center gap-2 text-[#9B9792] hover:text-[#EEECE8] transition-colors text-sm"
              >
                <ArrowLeft size={16} />
                Voltar
              </button>

              <Button
                variant="ghost"
                onClick={handleDeletar}
                disabled={deletando}
                className="text-[#9B9792] hover:text-red-400 hover:bg-transparent"
              >
                <Trash2 size={16} className="mr-2" />
                {deletando ? "Deletando..." : "Deletar"}
              </Button>
            </div>
            {!curadoria.insight && (
              <Button
                onClick={gerarInsight}
                disabled={
                  gerandoInsight ||
                  !curadoria.titulo ||
                  !curadoria.autor ||
                  !curadoria.categoria ||
                  !curadoria.conteudo
                }
                className="w-full bg-[#CC785C] hover:bg-[#b8684d] text-white h-11 mt-2 disabled:opacity-40"
              >
                {gerandoInsight ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Gerando insight...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} className="mr-2" />
                    Gerar insight
                  </>
                )}
              </Button>
            )}

            {/* Dados do fragmento */}
            <div className="bg-[#2B2A28] border border-[#3D3B38] rounded-xl p-8 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-[#CC785C] uppercase tracking-wider font-medium">
                  {curadoria.categoria}
                </span>
              </div>

              <h1 className="text-[#EEECE8] text-2xl font-semibold mb-1">
                {curadoria.titulo}
              </h1>
              <p className="text-[#9B9792] text-sm mb-6">{curadoria.autor}</p>

              <div className="border-t border-[#3D3B38] pt-6">
                <p className="text-[#EEECE8] leading-relaxed whitespace-pre-wrap">
                  {curadoria.conteudo}
                </p>
              </div>

              {curadoria.fonte && (
                <p className="text-[#9B9792] text-xs mt-4 break-all">
                  Fonte: {curadoria.fonte}
                </p>
              )}
            </div>

            {/* Insight */}
            {curadoria.insight && (
              <div className="bg-[#2B2A28] border border-[#3D3B38] rounded-xl p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-[#CC785C]" />
                  <span className="text-[#CC785C] text-sm font-medium uppercase tracking-wider">
                    Insight
                  </span>
                </div>
                <p className="text-[#EEECE8] leading-[1.8] italic">
                  {curadoria.insight}
                </p>
                <p className="text-[#9B9792] text-xs mt-4">Gerado por IA</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
