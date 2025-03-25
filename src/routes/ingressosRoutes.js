const express = require("express");
const router = express.Router();
const ingressosController = require("../controllers/ingressosController");

router.get("/ingressos/:id", ingressosController.getIngressoById);
router.get("/ingressos", ingressosController.getAllIngressos);
router.put("/ingressos/:id", ingressosController.updateIngresso);
router.delete("/ingressos/:id", ingressosController.deleteIngresso);
router.post("/ingressos", ingressosController.createIngresso);
//router.put("/venda/:id", ingressosController.vendaIngressos);

module.exports = router;