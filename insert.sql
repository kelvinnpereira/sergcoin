DROP DATABASE IF EXISTS myapp;
CREATE DATABASE myapp;
USE myapp;

SELECT 
    user.nome,
    COUNT(winner) as vitoria
FROM
    user 
    INNER JOIN
    partida
        ON user.id = partida.winner
GROUP BY user.id
ORDER BY vitoria DESC
;