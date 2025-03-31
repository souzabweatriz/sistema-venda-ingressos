const ingressosModel = require("../models/ingressosModel");

const getAllIngressos = async (req, res) =>{
    try {
        const ingressos = await ingressosModel.getIngressos();
        res.status(200).json(ingressos)
    } catch (error) {
        res.status(404).json({message: "Erro ao buscar ingressos"});
    }
};
const createIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const newIngresso = await ingressosModel.createIngresso(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar Ingresso" });
    }
};
const getIngressoById = async (req, res) => {
    try {
        const ingresso = await ingressosModel.getIngressobyId(req.params.id);
        if(!ingresso){
            return res.status(404).json({message: "Ingresso não encontrado"});
        }
        res.json(ingresso);
    } catch (error) {
        res.status(400).json({ message: "Erro ao buscar Ingresso." });
    }
};

const updateIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const updatedIngresso = await ingressosModel.updateIngresso(req.params.id, evento, local, data_evento, categoria, preco, quantidade_disponivel);
        if (!updatedIngresso) {
            return res.status(404).json({ message: "Esse Ingresso não foi encontrado" });
        }
        res.json(updatedIngresso);
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar Ingresso." });
    }
};
const deleteIngresso  = async (req, res) => {
    try {
        const message = await ingressosModel.deleteIngresso(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(400).json({ message: "Erro ao deletar ingresso." });
    }
};


const vendaIngressos = async (req, res) => {
    try {
        const { id, quantidade } = req.body;
        if (!id || !quantidade || quantidade <= 0) {
            return res.status(404).json({ error: "Não foi possível comprar ingresso, quanridade inválida!" });
        }
        const ingresso = await ingressosModel.getIngressobyId(req.params.id);
        
        if(!ingresso){
            return res.status(404).json({error: "Ingresso não encontrado"})
        }

        if(ingresso.quantidade_disponivel < quantidade){
        return res.status(200).json({ error: "Ingressos insuficientes"});
        }

        const novaQuantidade = ingresso.quantidade_disponivel - quantidade;
        await ingressosModel.atualizarQuantidade(id, novaQuantidade);

        res.status(200).json({
            mensagem: "Compra realizada com sucesso!",
            evento: ingresso.evento,
            categoria: ingresso.categoria,
            quantidade_comprada: quantidade,
            quantidade_restante: novaQuantidade
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erro ao processar a compra do ingresso" });
    }
};

module.exports = { getAllIngressos, getIngressoById, createIngresso, updateIngresso, deleteIngresso, vendaIngressos};