import React, { useEffect, useState } from "react";
import api from "../api";

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "1rem",
};

const thTdStyle = {
  padding: "0.75rem",
  border: "1px solid #ddd",
  textAlign: "left",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalBox = {
  background: "#fff",
  borderRadius: "10px",
  padding: "2rem",
  minWidth: 400,
  maxWidth: 600,
  boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
};

const inputStyle = {
  padding: "0.75rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "1rem",
  marginBottom: "1rem",
  width: "100%",
};

const Usuarios = () => {
  const [processos, setProcessos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProcessos, setTotalProcessos] = useState(0);
  const [editModal, setEditModal] = useState(null); // processo em edição ou null
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    fetchProcessos();
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchProcessos = async () => {
    try {
      const response = await api.get("/processos", {
        params: { page: currentPage, limit },
      });
      setProcessos(response.data.data);
      setTotalProcessos(response.data.total);
    } catch (err) {
      console.error("Erro ao buscar processos:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este processo?")) return;
    try {
      await api.delete(`/processos/${id}`);
      fetchProcessos();
    } catch (err) {
      alert("Erro ao excluir processo.");
    }
  };

  const openEdit = (proc) => {
    setEditForm(proc);
    setEditModal(proc);
  };

  const closeEdit = () => {
    setEditModal(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((f) => ({ ...f, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/processos/${editForm._id}`, editForm);
      closeEdit();
      fetchProcessos();
    } catch (err) {
      alert("Erro ao salvar edição.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalProcessos / limit);

  return (
    <div style={{ maxWidth: 1100, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Lista de Processos</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Nº Processo</th>
            <th style={thTdStyle}>Autor</th>
            <th style={thTdStyle}>Reclamado</th>
            <th style={thTdStyle}>Data Cadastro</th>
            <th style={thTdStyle}>Valor Honorário</th>
            <th style={thTdStyle}>Status</th>
            <th style={thTdStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {processos.map((proc) => (
            <tr key={proc._id}>
              <td style={thTdStyle}>{proc.numero_processo || "—"}</td>
              <td style={thTdStyle}>{proc.nome_autor || "—"}</td>
              <td style={thTdStyle}>{proc.reclamado || "—"}</td>
              <td style={thTdStyle}>{proc.data_cadastro ? new Date(proc.data_cadastro).toLocaleDateString("pt-BR") : "—"}</td>
              <td style={thTdStyle}>{proc.valor_honor != null ? `R$ ${proc.valor_honor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "—"}</td>
              <td style={thTdStyle}>{proc.comentario_processo || "—"}</td>
              <td style={thTdStyle}>
                <button onClick={() => openEdit(proc)} style={{ marginRight: 8, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 0.8rem', cursor: 'pointer' }}>Editar</button>
                <button onClick={() => handleDelete(proc._id)} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 0.8rem', cursor: 'pointer' }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#f3f4f6",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Anterior
        </button>
        <span style={{ alignSelf: "center" }}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#f3f4f6",
            cursor: currentPage === totalPages || totalPages === 0 ? "not-allowed" : "pointer",
          }}
        >
          Próxima
        </button>
      </div>
      {editModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3 style={{ marginBottom: 16 }}>Editar Processo</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                style={inputStyle}
                name="numero_processo"
                value={editForm.numero_processo || ""}
                onChange={handleEditChange}
                placeholder="Número do Processo"
              />
              <input
                style={inputStyle}
                name="nome_autor"
                value={editForm.nome_autor || ""}
                onChange={handleEditChange}
                placeholder="Nome do Autor"
              />
              <input
                style={inputStyle}
                name="reclamado"
                value={editForm.reclamado || ""}
                onChange={handleEditChange}
                placeholder="Reclamado"
              />
              <input
                style={inputStyle}
                name="valor_honor"
                value={editForm.valor_honor || ""}
                onChange={handleEditChange}
                placeholder="Valor Honorário"
                type="number"
              />
              <textarea
                style={{ ...inputStyle, minHeight: 60 }}
                name="comentario_processo"
                value={editForm.comentario_processo || ""}
                onChange={handleEditChange}
                placeholder="Comentário do Processo"
              />
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button type="button" onClick={closeEdit} style={{ background: '#ddd', color: '#222', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" disabled={loading} style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Salvando...' : 'Salvar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
