require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // ajuste o caminho correto

async function createUser() {
  console.log("Este script não é mais necessário. O usuário padrão é criado ao iniciar o servidor.");
  process.exit();
}

createUser().catch((err) => {
  console.error(err);
  process.exit(1);
});
