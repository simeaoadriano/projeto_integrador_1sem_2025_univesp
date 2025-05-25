import React from "react";

export default function Sidebar({ active, setActive, onLogout }) {
  return (
    <nav style={styles.sidebar}>
      <h2 style={styles.logo}>Processos</h2>
      <ul style={styles.ul}>
        <li
          style={{
            ...styles.li,
            ...(active === "home" ? styles.active : {}),
          }}
          onClick={() => setActive("home")}
        >
          Bem-vindo
        </li>
        <li
          style={{
            ...styles.li,
            ...(active === "processos" ? styles.active : {}),
          }}
          onClick={() => setActive("processos")}
        >
          Processos
        </li>
        <li
          style={{
            ...styles.li,
            ...(active === "usuarios" ? styles.active : {}),
          }}
          onClick={() => setActive("usuarios")}
        >
          Listagem Processos
        </li>
        <li style={styles.li} onClick={onLogout}>
          Sair
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    background: "#e6f0ff", // Azul bem claro
    color: "#1e3a8a", // Azul escuro para texto
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #c7d2fe",
    boxShadow: "2px 0 8px rgba(0, 0, 0, 0.03)",
    transition: "all 0.3s ease-in-out",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "600",
    padding: "1.5rem",
    borderBottom: "1px solid #c7d2fe",
    color: "#2563eb", // Azul principal (ícone/título)
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flexGrow: 1,
  },
  li: {
    padding: "1rem 1.5rem",
    cursor: "pointer",
    userSelect: "none",
    transition: "background 0.2s, color 0.2s",
    borderRadius: "6px",
    margin: "0.25rem 1rem",
    color: "#1e3a8a",
  },
  active: {
    background: "#c7d2fe",
    color: "#1e40af",
    fontWeight: "600",
  },
};
