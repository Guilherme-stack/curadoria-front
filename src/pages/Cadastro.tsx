import { useState } from "react";
import { useAuth } from "../contexts/auth.context";
import { authService } from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { BookMarked, Loader2 } from "lucide-react";
export function Cadastro() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  const [erro, setErro] = useState<null | string>(null);
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();
  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setCarregando(true);
    try {
      await authService.criar(email, senha, nome);
      await login(email, senha);
      navigate("/curadorias");
    } catch {
      setErro("Erro ao tentar criar conta!");
    } finally {
      setCarregando(false);
    }
  }
  return (
    <div className="min-h-screen bg-[#1C1B1A] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <BookMarked className="text-[#CC785C]" size={24} />
          <span className="text-[#EEECE8] font-semibold text-xl">
            Curadoria
          </span>
        </div>

        {/* Card */}
        <div className="bg-[#2B2A28] border border-[#3D3B38] rounded-xl p-8">
          <h1 className="text-[#EEECE8] text-xl font-semibold mb-1">
            Cadastro
          </h1>
          <p className="text-[#9B9792] text-sm mb-6">
            Preencha os campos para criar conta
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-[#9B9792] text-xs uppercase tracking-wider">
                Nome
              </Label>
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Guilherme"
                className="bg-[#323130] border-[#3D3B38] text-[#EEECE8] placeholder:text-[#9B9792] focus-visible:ring-[#CC785C]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#9B9792] text-xs uppercase tracking-wider">
                Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="bg-[#323130] border-[#3D3B38] text-[#EEECE8] placeholder:text-[#9B9792] focus-visible:ring-[#CC785C]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-[#9B9792] text-xs uppercase tracking-wider">
                Senha
              </Label>
              <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="bg-[#323130] border-[#3D3B38] text-[#EEECE8] placeholder:text-[#9B9792] focus-visible:ring-[#CC785C]"
              />
            </div>

            {erro && <p className="text-red-400 text-sm">{erro}</p>}

            <Button
              type="submit"
              disabled={carregando || !email || !senha || !nome}
              className="w-full bg-[#CC785C] hover:bg-[#b8684d] text-white h-11 mt-2 disabled:opacity-40"
            >
              {carregando ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>
          </form>
        </div>

        {/* Link para cadastro */}
        <p className="text-center text-[#9B9792] text-sm mt-6">
          Já tem conta?{" "}
          <Link to="/login" className="text-[#CC785C] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
