import { useState } from "react";
import { useAuth } from "../contexts/auth.context";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Criar Conta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && <p>{erro}</p>}
        <button type="submit">{carregando ? "Carregando" : "Criar"}</button>
      </form>
    </div>
  );
}
