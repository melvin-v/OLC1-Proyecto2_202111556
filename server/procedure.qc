CREATE PROCEDURE DibujarTriangulo 
    @lineas INT
AS
BEGIN
    DECLARE @i INT DEFAULT 1;
    DECLARE @j INT;

    WHILE @i <= @lineas
    BEGIN
        SET @j = 0;
        WHILE @j < @i
        BEGIN
            PRINT '*';
            SET @j = @j + 1;
        END;
        PRINT '';
        SET @i = @i + 1;
    END;
END;


CREATE PROCEDURE DibujarTrianguloInvertido 
    @lineas INT
AS
BEGIN
    DECLARE @i INT = @lineas;
    DECLARE @j INT;

    WHILE @i >= 1
    BEGIN
        SET @j = 0;
        WHILE @j < @i
        BEGIN
            PRINT '*';
            SET @j = @j + 1;
        END;
        PRINT '';
        SET @i = @i - 1;
    END;
END;

-- RECURSIVIDAD
BEGIN
    DECLARE @num1 INT DEFAULT 56;
    DECLARE @num2 INT DEFAULT 48;
    DECLARE @resultado INT;

    SET @resultado = CalcularMCD(@num1, @num2);

    PRINT "El MCD de " + CAST(@num1 AS VARCHAR) + " y " + CAST(@num2 AS VARCHAR) + " es: "+ CAST(@resultado AS VARCHAR);
END;

-- Crear una función recursiva de MCD en SQL
CREATE FUNCTION CalcularMCD(@a INT, @b INT) 
RETURNS INT
BEGIN
    IF @b = 0 THEN
        RETURN @a;
    ELSE
        RETURN CalcularMCD(@b, @a % @b);
    END IF;
END;
