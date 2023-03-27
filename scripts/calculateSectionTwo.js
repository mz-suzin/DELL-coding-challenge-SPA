// Coded by Matheus Suzin
// March, 2023.


// Get elements from DOM
const section2_originText = document.getElementById('section2_originText');
const section2_destinationText = document.getElementById('section2_destinationText');
const section2_truckType = document.getElementById('section2_truckType');
const section2_distance = document.getElementById('section2_distance');
const section2_cost = document.getElementById('section2_cost');

// Calculate distance and price for section 2
function calculateSectionTwo(origin, destination, truck, data) {
    let indexOrigin = data[0].findIndex(e => e === origin)
    let indexDestination = data[0].findIndex(e => e === destination)
    let distance = data[indexOrigin+1][indexDestination];

    let cost = 0;
    if (truck === 'Caminhão Pequeno (1TON Max)') cost = 4.87;
        else if (truck === 'Caminhão Médio (4TON Max)') cost = 11.92;
            else cost = 27.44;

    section2_originText.textContent = `Origem: ${origin}`;
    section2_destinationText.textContent = `Destino: ${destination}`;
    section2_truckType.textContent = `Modalidade: ${truck}`;
    section2_distance.textContent = `Distância a ser percorrida:: ${distance}Km`;
    section2_cost.textContent = `Custo: R$${Intl.NumberFormat('pt-BR').format(cost*distance)}`;
}

export default calculateSectionTwo;