const express = require("express");
const router = express.Router();
const processoController = require("../controllers/processoController");
const auth = require("../middlewares/auth");

router.post("/", auth, processoController.create);
router.get("/", auth, processoController.getAll);
router.get("/:id", auth, processoController.getById);
router.put("/:id", auth, processoController.update);
router.delete("/:id", auth, processoController.delete);

module.exports = router;
