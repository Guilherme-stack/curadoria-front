import { useState } from "react";
import { useAuth } from "../contexts/auth.context";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const navigate = useNavigate();
  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    try {
      await login(email, senha);
      navigate("/curadorias");
    } catch {
      setErro("Email ou senha inválidos");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {erro && <p>{erro}</p>}
        <button type="submit" disabled={carregando}>
          {carregando ? "Carregando..." : "Entrar"}
        </button>
      </form>

      <Link to={"/cadastro"}>Não tem conta? Cadastre-se</Link>
    </div>
  );
}
