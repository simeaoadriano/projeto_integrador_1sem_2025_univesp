import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, senha: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Usuário ou senha inválidos.");
        return;
      }

      // Login bem-sucedido
      localStorage.setItem("token", data.token);
      setUser({ username });
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  form: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "6px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "300px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.8rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.8rem",
    background: "#007BFF",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
