CREATE DATABASE venda_ingressos;

\c venda_ingressos;

CREATE TABLE ingressos(
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    local VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES 
('Anavitoria - Turne Das Esquinas', 'Arena Opus', '2025-08-25', 'Pista', 200.00, 1000),
('Anavitoria - Turne Das Esquinas', 'Arena Opus', '2025-08-25', 'Pista VIP', 350.00, 500),
('Anavitoria - Turne Das Esquinas', 'Arena Opus', '2025-08-25', 'Camarote', 550.00, 100),
('Anavitoria - Turne Das Esquinas', 'Arena Opus', '2025-08-25', 'Arquibancada', 130, 200),
('Olivia Rodrigo', 'Lollapalooza', '2025-03-28', 'Pista', 420.00, 2000),
('Olivia Rodrigo', 'Lollapalooza', '2025-03-28', 'Pista VIP', 950.00, 300),
('Olivia Rodrigo', 'Lollapalooza', '2025-03-28', 'Camarote', 590.00, 6000),
('Olivia Rodrigo', 'Lollapalooza', '2025-03-28', 'Arquibancada', 210.00, 6000),
('Girl in Red + Inhaler', 'Lollapalooza', '2025-03-27', 'Pista', 250.00, 780),
('Girl in Red + Inhaler', 'Lollapalooza', '2025-03-27', 'Pista VIP', 500.00, 970),
('Girl in Red + Inhaler', 'Lollapalooza', '2025-03-27', 'Camarote', 700.00, 500),
('Girl in Red + Inhaler', 'Lollapalooza', '2025-03-27', 'Arquibancada', 200.00, 1000);

SELECT * FROM ingressos;
