// Coded by Matheus Suzin
// March, 2023.

// ********* Data Extraction Section *********
async function getData() {
    try {
        const response = await fetch('./scripts/DNIT-Distancias.csv');
        const data = await response.text();
        return Papa.parse(data, { header: false, delimiter: ';'}).data;
    } catch (error) {
        console.log('error:', error);
    }
}

export default getData;


// export default function dataExtraction() {
//     // const fs = require('fs');

//     // Reads the file DNIT-Distancias.csv and returns an array filled with the cities and the distances
//     // const data = fs.readFileSync('DNIT-Distancias.csv', 'utf8').toString().split(/;|\r\n/);

//     getData().then();

//     return parsedData;
        
    

    // const data = d3.csvParse('DNIT-Distancias.csv')
    // console.log(data);

    // Iterates through all data items and allocates it to cities or distances (converting the distance to type 'number')
    // const cities = [];
    // const distances = [];

    // data.forEach(value => {
    //     if (isNaN(value)) {
    //         cities.push(value);
    //     } else {
    //         distances.push(Number(value));
    //     }
    // })

    // return { cities, distances };
// }