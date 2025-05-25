// src/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

dotenv.config();

connectDB().then(async () => {
  // Criação automática do usuário padrão se não existir
  const email = "admin@admin.com";
  const senha = "123456";
  const userExists = await User.findOne({ email });
  if (!userExists) {
    const hashedPassword = await bcrypt.hash(senha, 10);
    await new User({ email, senha: hashedPassword }).save();
    console.log("Usuário padrão criado: admin@admin.com / 123456");
  } else {
    console.log("Usuário padrão já existe.");
  }

  // Inicialização do servidor
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/processos", require("./routes/processos"));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
