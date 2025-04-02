const express = require("express");
const router = express.Router();
const ingressosController = require("../controllers/ingressosController");

router.get("/ingressos", ingressosController.getAllIngressos);
router.get("/ingressos/:id", ingressosController.getIngressoById);
router.put("/ingressos/:id", ingressosController.updateIngresso);
router.delete("/ingressos/:id", ingressosController.deleteIngresso);
router.post("/ingressos", ingressosController.createIngresso);
router.post("/venda", ingressosController.vendaIngressos);

module.exports = router;