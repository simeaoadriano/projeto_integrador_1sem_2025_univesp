// src/models/Processo.js
const mongoose = require("mongoose");

const processoSchema = new mongoose.Schema({
  data_cadastro: { type: Date, default: Date.now },
  cnpj_cpf_autor: String,
  nome_autor: String,
  rua_numero: String,
  bairro: String,
  cep: String,
  cidade: String,
  estado: String,
  telefone: String,
  email_autor: String,
  advogado_autor: String,
  numero_processo: String,
  urlsite_tj: String,
  abrir_repositorio: Boolean,
  reclamado: String,
  cnpj_cpf_rec: String,
  advogado_rec: String,
  url_agenda: String,
  data_audiencia: Date,
  local_audiencia: String,
  comentario_processo: String,
  valor_honor: Number
});

module.exports = mongoose.model("CAD_PROCESSO", processoSchema);
