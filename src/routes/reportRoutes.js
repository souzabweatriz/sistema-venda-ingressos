const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/report/csv", reportController.exportIngressoCSV);
router.get("/report/pdf", reportController.exportIngressoPdf);

module.exports = router;