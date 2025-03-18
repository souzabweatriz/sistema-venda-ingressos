const pool = require("../config/database");

const getIngressos = async () => {
    const result = await pool.query("SELECT * FROM ingressos");
    return result.rows;
}

const getIngressobyId = async (id) => {
    const result = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id]);
    return result.row[0];
};

const createIngresso = async (evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query(
        "INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [evento, local, data_evento, categoria, preco, quantidade_disponivel]
    );
    return result.rows[0];
};

const updateIngresso = async (evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query(
        "UPDATE ingressos SET evento = $1, local = $2, data_evento = $3, categoria = $4, preco = $5, quatidade_disponivel = $6 RETURNING *",
        [evento, local, data_evento, categoria, preco, quantidade_disponivel]
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

const vendaIngresso = async (quantidade_disponivel, id) => {
    const idIngresso = await getIngressoById(id);
    const quantidadeCompra = 1; 
    if (idIngresso.quantidade_disponivel >= quantidadeCompra) {
        const novaQuantidade = quantidade_disponivel = idIngresso - quantidadeCompra;
        const result = await pool.query("UPDATE ingressos SET quantidade_disponivel = $1 WHERE id = $2 RETURNING *", [novaQuantidade, id]);
        return result.rows[0];
    } else {
        return { message: "Não há essa quantidade de ingressos disponíveis" };
    }
};
module.exports = { getIngressos, getIngressobyId, createIngresso, updateIngresso, deleteIngresso, vendaIngressos};