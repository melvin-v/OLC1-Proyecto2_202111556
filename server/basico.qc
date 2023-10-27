/*
    ARCHIVO DE PRUEBA
    PROYECTO 2 COMPILADORES 1
    SI SALE COMPI
*/


-- CREAR  TABLAS
CREATE TABLE Cliente (
    ID INT,
    Nombre VARCHAR,
    CorreoElectronico VARCHAR,
    FechaRegistro DATE
);

CREATE TABLE ClienteX (
    ID INT,
    Nombre VARCHAR,
    CorreoElectronico VARCHAR,
    FechaRegistro DATE
);

CREATE TABLE Productos (
    ProductoID INT,
    NombreProducto VARCHAR,
    Precio DOUBLE
);

-- Alter table
ALTER TABLE Cliente
ADD FechaNacimiento DATE;

-- Drop table
DROP TABLE  ClienteX;

-- Insertar datos en la tabal cliente
INSERT INTO Cliente (ID, Nombre, CorreoElectronico, FechaRegistro, FechaNacimiento)
VALUES (1, "Ana García", "ana@example.com", '2023-04-10', '1985-08-20');
INSERT INTO Cliente (ID, Nombre, CorreoElectronico, FechaRegistro, FechaNacimiento)
VALUES (2, "Pedro López", "pedro@example.com", '2023-04-12', '1990-11-15');
INSERT INTO Cliente (ID, Nombre, CorreoElectronico, FechaRegistro, FechaNacimiento)
VALUES (3, "Luisa Rodríguez", "luisa@example.com", '2023-04-14', '1982-03-25');
INSERT INTO Cliente (ID, Nombre, CorreoElectronico, FechaRegistro, FechaNacimiento)
VALUES (4, "Carlos Sánchez", "carlos@example.com", '2023-04-16', '1995-09-03');
INSERT INTO Cliente (ID, Nombre, CorreoElectronico, FechaRegistro, FechaNacimiento)
VALUES (5, "Isabel Martínez", "isabel@example.com", '2023-04-18', '1987-06-12');


-- Insertar datos en la tabal productos
INSERT INTO Productos (ProductoID, NombreProducto, Precio)
VALUES (1, "Widget Inteligente", 49.99),
INSERT INTO Productos (ProductoID, NombreProducto, Precio)
VALUES (2, "Widget Súper Inteligente", 99.99),
INSERT INTO Productos (ProductoID, NombreProducto, Precio)
VALUES (3, "Widget Supremo", 149.99);
INSERT INTO Productos (ProductoID, NombreProducto, Precio)
VALUES (4, "Widget Súper Supremo", 199.99);
INSERT INTO Productos (ProductoID, NombreProducto, Precio)
VALUES (5, "Widget Hiper Supremo", 299.99);

       

-- Seleccionar datos
SELECT * FROM Cliente;
/*
+-----------+-----------------+---------------------+----------------+------------------+
| ID | Nombre   | CorreoElectronico  | FechaRegistro  | FechaNacimiento  |
+-----------+-----------------+---------------------+----------------+------------------+
| 1         | Ana García      | ana@example.com    | 2023-04-10     | 1985-08-20       |
| 2         | Pedro López     | pedro@example.com  | 2023-04-12     | 1990-11-15       |
| 3         | Luisa Rodríguez | luisa@example.com  | 2023-04-14     | 1982-03-25       |
| 4         | Carlos Sánchez  | carlos@example.com | 2023-04-16     | 1995-09-03       |
| 5         | Isabel Martínez | isabel@example.com | 2023-04-18     | 1987-06-12       |
+-----------+-----------------+---------------------+----------------+------------------+
*/

-- Actualizar datos
UPDATE Cliente
SET CorreoElectronico = "anaGar@example.com"
WHERE ID = 1;
SELECT * FROM Cliente WHERE ID = 1;
/*
+-----------+-----------------+--------------------+----------------+------------------+
| ID | Nombre   | CorreoElectronico  | FechaRegistro  | FechaNacimiento  |
+-----------+-----------------+--------------------+----------------+------------------+
| 1         | Ana García      | anaGar@example.com | 2023-04-10     | 1985-08-20       |
+-----------+-----------------+--------------------+----------------+------------------+
*/

-- seleccionar datos
SELECT * FROM Productos;
/*
+-----------+--------------------------+--------+
| ProductoID | NombreProducto          | Precio |
+-----------+--------------------------+--------+
| 1         | Widget Inteligente       | 49.99  |
| 2         | Widget Súper Inteligente | 99.99  |
| 3         | Widget Supremo           | 149.99 |
| 4         | Widget Súper Supremo     | 199.99 |
| 5         | Widget Hiper Supremo     | 299.99 |
+-----------+--------------------------+--------+
*/

-- Truncar tabla
TRUNCATE  TABLE Productos;
SELECT * FROM Productos;
/*
+-----------+--------------------------+--------+
| ProductoID | NombreProducto          | Precio |
+-----------+--------------------------+--------+
*/

-- Borrar datos
DELETE FROM Cliente WHERE FechaRegistro = '2023-04-16';

SELECT * FROM Cliente;
/*
+-----------+-----------------+---------------------+----------------+------------------+
| ID | Nombre   | CorreoElectronico  | FechaRegistro  | FechaNacimiento  |
+-----------+-----------------+---------------------+----------------+------------------+
| 1         | Ana García      | ana@example.com    | 2023-04-10     | 1985-08-20       |
| 2         | Pedro López     | pedro@example.com  | 2023-04-12     | 1990-11-15       |
| 3         | Luisa Rodríguez | luisa@example.com  | 2023-04-14     | 1982-03-25       |
| 5         | Isabel Martínez | isabel@example.com | 2023-04-18     | 1987-06-12       |
+-----------+-----------------+---------------------+----------------+------------------+
*/

-- Bloque condicional
BEGIN
    DECLARE @edad INT DEFAULT 25;
    DECLARE @puntosTalent INT DEFAULT 90;
    DECLARE @resultadoTalent VARCHAR;

    IF @edad > 18 AND @puntosTalent >= 80 THEN
    BEGIN
        SET @resultadoTalent = "Talent Plus";
    END;
    
    IF @edad > 18 AND @puntosTalent < 80 THEN
    BEGIN
        SET @resultadoTalent = "Talent";
    END;

    IF @edad  = 10 THEN
        PRINT "La edad es 10";
    ELSE
        PRINT @edad;
    END IF;
    PRINT "El resultado es (PRINT):";
    PRINT @resultadoTalent;
    SELECT "El resultado es (SELECT):";
    SELECT @resultadoTalent;
END;

-- Bloque de bucle while
BEGIN
    DECLARE @contador INT DEFAULT 1;
    DECLARE @suma INT DEFAULT 0;

    WHILE @contador <= 20
    BEGIN
        IF @contador % 3 = 0 THEN
        BEGIN
            SET @suma = @suma + @contador;
        END;
        SET @contador = @contador + 1;
    END;

    PRINT "La suma de los múltiplos de 3 del 1 al 20 es: " + CAST(@suma AS VARCHAR);
END;
-- Funciones nativas
SELECT LOWER("Hola, Mundo"); -- hola, mundo
SELECT UPPER("hola, mundo"); -- HOLA, MUNDO
SELECT ROUND(123.456789, 2); -- 123.46
SELECT LEN("¡Esto es un texto creativo y largo!"); -- 31 caracteres
SELECT TRUNCATE(8.965, 1); -- 8.9
SELECT TYPEOF("Hola"); -- VARCHAR
