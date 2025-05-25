import React, { useState } from "react";
import api from "../api";

const initialForm = {
  cnpj_cpf_autor: "",
  nome_autor: "",
  rua_numero: "",
  bairro: "",
  cep: "",
  cidade: "",
  estado: "",
  telefone: "",
  email_autor: "",
  advogado_autor: "",
  numero_processo: "",
  abrir_repositorio: false,
  reclamado: "",
  cnpj_cpf_rec: "",
  advogado_rec: "",
  data_audiencia: "",
  local_audiencia: "",
  comentario_processo: "",
  valor_honor: "",
};

const inputStyle = {
  padding: "0.75rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "1rem",
  transition: "all 0.2s ease",
};

const inputFocusStyle = {
  borderColor: "#4f46e5",
  boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)",
};

const Processos = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFocus = (name) => setFocused(name);
  const handleBlur = () => setFocused("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!form.nome_autor || !form.email_autor) {
      setMsg({ type: "error", text: "Nome e email do autor são obrigatórios." });
      return;
    }

    setLoading(true);

    try {
      await api.post("/processos", {
        ...form,
        valor_honor: form.valor_honor === "" ? 0 : Number(form.valor_honor),
        data_audiencia: form.data_audiencia ? new Date(form.data_audiencia) : null,
      });
      setMsg({ type: "success", text: "Processo salvo com sucesso!" });
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setMsg({ type: "error", text: "Erro ao salvar processo." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Cadastro de Processo</h2>

      {msg && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.75rem",
            borderRadius: "6px",
            backgroundColor: msg.type === "error" ? "#fee2e2" : "#d1fae5",
            color: msg.type === "error" ? "#b91c1c" : "#065f46",
          }}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        {Object.entries(initialForm).map(([key, value]) => {
          if (key === "abrir_repositorio") {
            return (
              <label key={key} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="checkbox"
                  name={key}
                  checked={form[key]}
                  onChange={handleChange}
                />
                Abrir repositório
              </label>
            );
          }

          if (key === "comentario_processo") {
            return (
              <textarea
                key={key}
                name={key}
                placeholder="Comentário do processo"
                value={form[key]}
                onChange={handleChange}
                onFocus={() => handleFocus(key)}
                onBlur={handleBlur}
                rows={4}
                style={{
                  ...inputStyle,
                  ...(focused === key ? inputFocusStyle : {}),
                }}
              />
            );
          }

          return (
            <input
              key={key}
              type={
                key === "email_autor"
                  ? "email"
                  : key === "urlsite_tj" || key === "url_agenda"
                  ? "url"
                  : key === "data_audiencia"
                  ? "date"
                  : key === "valor_honor"
                  ? "number"
                  : "text"
              }
              name={key}
              placeholder={key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              value={form[key]}
              onChange={handleChange}
              onFocus={() => handleFocus(key)}
              onBlur={handleBlur}
              style={{
                ...inputStyle,
                ...(focused === key ? inputFocusStyle : {}),
              }}
            />
          );
        })}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.8rem",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = "#4338ca";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#4f46e5";
          }}
        >
          {loading ? "Salvando..." : "Salvar Processo"}
        </button>
      </form>
    </div>
  );
};

export default Processos;
