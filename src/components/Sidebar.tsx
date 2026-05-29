import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

export function Sidebar() {
  const { usuario, logout } = useAuth();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", columnGap: "1rem" }}
    >
      <h2>{usuario!.nome}</h2>
      <p>{usuario!.email}</p>
      <Link to="/curadorias">Minhas curadorias</Link>
      <button onClick={async () => await logout()}>LogOut</button>
    </div>
  );
}
