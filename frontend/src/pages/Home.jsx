import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Processos from "./Processos";
import { useUser } from "../contexts/UserContext";
import Usuarios from "./Usuarios";

export default function Home() {
  const [active, setActive] = useState("home");
  const { user } = useUser();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar active={active} setActive={setActive} onLogout={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }} />
      <main style={{ flex: 1, padding: "2rem" }}>
        {active === "home" && (
          <h1>Bem-vindo, {user?.username || user?.email || "usuário"}!</h1>
        )}
        {active === "processos" && <Processos />}
        {active === "usuarios" && <Usuarios />}
      </main>
    </div>
  );
}
