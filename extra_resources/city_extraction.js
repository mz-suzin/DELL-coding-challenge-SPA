// Programado por Matheus Zimmermann Suzin
// 22/03/2023

// UPDATE: Através do email ERRATA enviado algumas horas após o envio do desafio, agora as informações devem ser extraidas de um arquivo CSV, facilitando o processo.
// Vou deixar essa função aqui pois ela fez parte (mesmo não sendo utilizada) do desenvolvimento da solução do projeto.

// Código para ler as informações extraidas do arquivo XLS fornecido
const fs = require('fs');

const data = fs.readFileSync('distanciasCidades.txt', 'utf-8').toString().trim().split('\r\n');

fs.writeFile('./cidades', JSON.stringify(data), function(err) {
        if (err) {
            console.log(err)
        }
    }
);
