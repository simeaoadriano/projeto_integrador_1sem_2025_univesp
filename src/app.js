const express = require("express");
const cors = require("cors");
const processosRoutes = require("./routes/processos");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/processos", processosRoutes);

module.exports = app;