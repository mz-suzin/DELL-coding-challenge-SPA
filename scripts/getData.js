// Programa IT Academy – Processo Seletivo – Edição #18
// Coded by Matheus Suzin
// March, 2023

// ********* Data Extraction Section *********

async function getData() {
    try {
        // Usando fetch para ler os valores do arquivo CSV
        // O arquivo CSV deve sempre estar junto com o resto dos arquivos do programa.
        const response = await fetch('./scripts/DNIT-Distancias.csv');
        const data = await response.text();
        return Papa.parse(data, { header: false, delimiter: ';'}).data;
    } catch (error) {
        console.log('error when reading .csv file:', error);
    }
}

export default getData;