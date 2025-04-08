require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ingressosRoutes = require("./src/routes/ingressosRoutes");
const reportRoutes = require("./src/routes/reportRoutes")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", ingressosRoutes);
app.use("/api", reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
