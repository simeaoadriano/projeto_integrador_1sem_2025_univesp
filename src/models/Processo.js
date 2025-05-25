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

// Serialização customizada para garantir datas ISO e campos obrigatórios
processoSchema.method("toJSON", function () {
  const obj = this.toObject();
  obj.data_cadastro = obj.data_cadastro ? obj.data_cadastro.toISOString() : "";
  obj.data_audiencia = obj.data_audiencia ? obj.data_audiencia.toISOString() : "";
  obj.valor_honor = obj.valor_honor != null ? obj.valor_honor : 0;
  obj.estado = obj.estado || "";
  obj.cidade = obj.cidade || "";
  obj.numero_processo = obj.numero_processo || "";
  obj.nome_autor = obj.nome_autor || "";
  return obj;
});

module.exports = mongoose.model("CAD_PROCESSO", processoSchema);