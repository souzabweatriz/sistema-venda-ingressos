const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit");

const ingressoModel = require("../models/ingressosModel");

const exportIngressoCSV = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getAllIngressos();
        
        res.setHeader("Content-Disposition", "attachment; filename=ingressos.csv");
        res.setHeader("Content-Type", "text-csv");

        const csvStream = format({ headers: true});
        csvStream.pipe(res);

        ingressos.forEach((ingresso) =>{
            csvStream.write({
                Id: ingresso.id,
                Evento: ingresso.evento,
                Local: ingresso.local, 
                Data: ingresso.data_evento,
                Categoria: ingresso.categoria,
                Preço: ingresso.preco,
                Quantidade: ingresso.quantidade_disponivel
            });
        });
        csvStream.end();

    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o CSV"});
    }
};

const exportIngressoPdf = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getAllIngressos();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=ingressos.pdf")

        const doc = new PDFDocument();
        doc.pipe(res);

        //Titulo
        doc.fontSize(20).text("Relatorio de Ingressos", {align: "center"});
        doc.moveDown();

        //Cabeçalho
        doc.fontSize(15).text("Id | Evento | Local | Data | Categoria | Preço | Quantidade", {underline: true, align: "center"});
        doc.moveDown(0.5);

        ingressos.forEach((ingresso) => {
            doc.fontSize(13).text(
                `${ingresso.id} | ${ingresso.evento} | ${ingresso.local} | ${ingresso.data} | ${ingresso.categoria} | ${ingresso.preco} | ${ingresso.quantidade}`
            );
        });
        doc.end();

    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF"}); 

    }
};

module.exports = {exportIngressoCSV, exportIngressoPdf}