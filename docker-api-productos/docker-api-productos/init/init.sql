CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    precio DOUBLE PRECISION
);

INSERT INTO productos(nombre, precio) VALUES 
('Galletas',20.00 ),('CocaCola', 35.00),('Tortillas', 23.50)