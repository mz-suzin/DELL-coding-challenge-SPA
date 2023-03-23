// Coded by Matheus Suzin
// March, 2023.

// Calculate distance, ... for section 2

const section2_originText = document.getElementById('section2_originText');
const section2_destinyText = document.getElementById('section2_destinyText');
const section2_truckType = document.getElementById('section2_truckType');
const section2_distance = document.getElementById('section2_distance');
const section2_cost = document.getElementById('section2_cost');


function calculateSectionTwo(origin, destiny, truck, data) {
    let indexOrigin = data[0].findIndex(e => e === origin)
    let indexDestiny = data[0].findIndex(e => e === destiny)

    let cost = 0;
    if (truck === 'Caminhão Pequeno (1TON Max)') cost = 4.87;
    else if (truck === 'Caminhão Médio (4TON Max)') cost = 11.92;
    else cost = 27.44;

    let distance = data[indexOrigin+1][indexDestiny];

    section2_originText.textContent = `Origem: ${origin}`;
    section2_destinyText.textContent = `Destino: ${destiny}`;
    section2_truckType.textContent = `Modalidade: ${truck}`;
    section2_distance.textContent = `Distância a ser percorrida:: ${distance}Km`;
    section2_cost.textContent = `Custo: R$${Intl.NumberFormat('pt-BR').format(cost*distance)}`;
    
}

export default calculateSectionTwo;