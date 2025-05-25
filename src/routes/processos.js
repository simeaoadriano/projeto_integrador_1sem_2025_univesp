const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const processoController = require("../controllers/processoController");

// Todas as rotas protegidas por JWT
router.get("/", auth, processoController.getAll);
router.post("/", auth, processoController.create);
router.get("/:id", auth, processoController.getById);
router.put("/:id", auth, processoController.update);
router.delete("/:id", auth, processoController.delete);

module.exports = router;