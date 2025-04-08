const pool = require("../config/database");

const getAllIngressos = async (local) => {
    if(!local){
        const result = await pool.query("SELECT * FROM ingressos");
        return result.rows;
    }else{
        const result = await pool.query("SELECT * FROM ingressos WHERE local ILIKE $1", [`%${local}%`]);
        return result.rows;
    }
};

const getIngressobyId = async (id) => {
    const result = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id]);
    return result.rows[0];
};

const createIngresso = async (evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query(
        "INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [evento, local, data_evento, categoria, preco, quantidade_disponivel]
    );
    return result.rows[0];
};

const updateIngresso = async (id, evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query(
        "UPDATE ingressos SET evento = $1, local = $2, data_evento = $3, categoria = $4, preco = $5, quantidade_disponivel = $6 WHERE id = $7 RETURNING *",
        [evento, local, data_evento, categoria, preco, quantidade_disponivel, id]
    );
    return result.rows[0];
};

const deleteIngresso = async (id) => {
    const result = await pool.query("DELETE FROM ingressos WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Ingresso não encontrado." };
    }
    return { message: "Ingresso deletado com sucesso." };
};

const atualizarQuantidade = async (id, quantidade) => {
    const result = await pool.query(
        "UPDATE ingressos SET quantidade_disponivel = $1 WHERE id = $2 RETURNING *", [quantidade, id]
    );
    return result.rows[0];
};

module.exports = { getAllIngressos, getIngressobyId, createIngresso, updateIngresso, deleteIngresso, atualizarQuantidade};