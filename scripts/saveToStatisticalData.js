// Coded by Matheus Suzin
// March, 2023

// Get elements from DOM
const section4_showData = document.getElementById('section4_showData');
const section4_totalCost = document.getElementById('section4_totalCost');
const section4_stageCost = document.getElementById('section4_stageCost');
const section4_averageCostPerKm = document.getElementById('section4_averageCostPerKm');
const section4_averageCostPerItem = document.getElementById('section4_averageCostPerItem');
const section4_costPerTruck = document.getElementById('section4_costPerTruck');
const section4_numberOfTrucks = document.getElementById('section4_numberOfTrucks');
const section4_totalItems = document.getElementById('section4_totalItems');

const section4_reset = document.getElementById('section4_reset');

// global variables
let allData = {
    totalCost: 0,
    stageCost: {},
    totalDistance: 0,
    averageCostPerKm: 0,
    averageCostPerItem: {},
    costPerTruck: [],
    numberOfTrucks: 0,
    totalItems: 0
};

// custo total
// custo por trecho
// custo medio por km
// custo medio por tipo de produto
// custo total por trecho
// custo para cada modalidade de transporte
// numero total de veiculos deslocados
// total de itens transportados

function saveToStatisticalData(cargoInformation, totalCost) {
    section4_showData.removeAttribute('hidden');

    console.log(totalCost);
    // straight through information
    allData.totalCost += totalCost;
    allData.numberOfTrucks += cargoInformation[0].trucks.reduce((a, b) => a + b, 0);

    // variables
    // aux_distance = 0;

    for (let i = 0; i < cargoInformation.length; i++){

        // calculate average cost per stage
        // aux_distance = Number(cargoInformation[i].distance);
        // if (allData.hasOwnProperty(`${cargoInformation[i].items[i].description}`)){
        //     averageCostPerItem.push({`${cargoInformation[i].items[i].description}`: cargoInformation[i].items[i].description })
        // }
        // aux_item
        // averageCostPerItem.push({item: cargoInformation[i].items[i].description})

        allData.totalItems += Number(cargoInformation[i].itemsToDeliver[i])

        allData.totalDistance += Number(cargoInformation[i].distance);
    }
    allData.averageCostPerKm = allData.totalCost/allData.totalDistance;

    showInfo();
}

function showInfo() {
    section4_totalCost.innerHTML = `Custo Total: R$${Intl.NumberFormat('pt-BR').format(allData.totalCost)}`;
    section4_totalItems.innerHTML = `Total de itens Transportados: ${allData.totalItems}`;
    section4_numberOfTrucks.innerHTML = `Número total de caminhões: ${allData.numberOfTrucks}`;
    section4_averageCostPerKm.innerHTML = `Custo médio por Km: R$${Intl.NumberFormat('pt-BR').format(allData.averageCostPerKm)}`;
}

section4_reset.addEventListener('click', () => {
    allData = {
        totalCost: 0,
        stageCost: {},
        totalDistance: 0,
        averageCostPerKm: 0,
        averageCostPerItem: {},
        costPerTruck: [],
        numberOfTrucks: 0,
        totalItems: 0
    };
    showInfo();
})

export default saveToStatisticalData;