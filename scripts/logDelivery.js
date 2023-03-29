// Programa IT Academy – Processo Seletivo – Edição #18
// Coded by Matheus Suzin
// March, 2023

// get DOM elements
const section3_logDelivery = document.getElementById("section3_logDelivery");
const displayLog_stages = document.getElementById("displayLog_stages");
const displayLogs_Costs = document.getElementById("displayLogs_Costs");

// truck decision array - depends on weight
const mapOfTrucks = [
    [1,0,0], // 0 < kg <= 1000
    [2,0,0], // 1001 < kg <= 2000
    [0,1,0], // 2001 < kg <= 4000
    [1,1,0], // 4001 < kg <= 5000
    [2,1,0], // 5001 < kg <= 6000
    [0,2,0], // 6001 < kg <= 8000
    [0,0,1], // 8001 < kg <= 9000
    [0,0,1], // 9001 < kg <= 10000
    [0,0,0]  // kg = 0;
]
const truckPrice = [4.87, 11.92, 27.44];
const truckName = ['PEQUENO', 'MÉDIO', 'GRANDE'];
let cargoInformation = [];
let totalCost = 0;

function logDelivery(tableInputs, cities, originCity, items, data) {
    let itemTypes = [];
    // dividing tableInputs.length by cities.length I'll have nº of item types
    itemTypes = tableInputs.length/cities.length;

    // data validation
    // if(!checkTableInputs(items, itemTypes, cities)) return false;

    // clears previous information
    cargoInformation = [];

    // define truck modalities
    let arrayOfTrucks = defineTrucks(items);
    
    // creates the object with all information
    createCargoObject(arrayOfTrucks, itemTypes, cities, originCity, items, tableInputs, data);

    // displays info for user
    totalCost = displayinfo(cities, tableInputs);

    return [cargoInformation, totalCost];
}

// function will assume cities are in order of proximity
function createCargoObject(trucks, itemTypes, cities, origin, items, tableInputs, data) {
    // initialise variables
    let newOrigin = origin; 
    let newItems = JSON.parse(JSON.stringify(items))
    let itemsToDeliver = [];
    let newTrucks = [...trucks];
    let j = 0;
   
    // iterate through cities
    for (let i = 0; i < cities.length; i++) {
        // get distance
        let indexOrigin = data[0].findIndex(e => e === newOrigin)
        let indexDestination = data[0].findIndex(e => e === cities[i])
        let distance = data[indexOrigin+1][indexDestination];

        // get items to deliver at the current city
        itemsToDeliver = tableInputs.slice(j, j + itemTypes); // .slice doesnt includes end index

        // builds up the object with stage information
        const trajectory = new cargoPrototype(newOrigin, cities[i], distance, newItems, itemsToDeliver, newTrucks);

        // saves the trajectory object into array
        cargoInformation.push(trajectory);

        // updates j
        j += itemTypes;
        // update newOrigin
        newOrigin = cities[i];
        // update items
        // doing some nasty things here. I believe the JIT compiler was creating some shortcuts and changing the value of newItems.quantity before it should. Crazy, lost some hours here trying to figure it out.
        // The solution is to create another object, change it, and then clone it back to newItems. Ugly, time and processing consuming, but it works.
        let auxItems = JSON.parse(JSON.stringify(newItems));
        for (let k = 0; k < auxItems.length; k++) {
            auxItems[k].quantity -= itemsToDeliver[k];
        }
        newItems = JSON.parse(JSON.stringify(auxItems));

        // update trucks
        newTrucks = defineTrucks(newItems);
    }
}

// prototype for object
function cargoPrototype(origin2, destination2, distance2, items2, itemsToDeliver2, trucks2) {
    this.origin = origin2;
    this.destination = destination2;
    this.distance = distance2;
    this.items = items2;
    this.itemsToDeliver = itemsToDeliver2;
    this.trucks = trucks2
}

// Based on the array mapOfTrucks, will define how many trucks of each modality is necessary
function defineTrucks(itemsForTrucks) {
    let totalWeight = 0;
    let arrayOfTrucks = [];
    
    itemsForTrucks.forEach(item => {totalWeight += (item.weight*item.quantity)});
    let rest = totalWeight%10000;
    // lacking better resolution to this problem, I will brute force my way to it
    if (rest === 0) arrayOfTrucks = [...mapOfTrucks[8]];
    else if (rest <= 1000) arrayOfTrucks = [...mapOfTrucks[0]];
    else if (rest <= 2000) arrayOfTrucks = [...mapOfTrucks[1]];
    else if (rest <= 4000) arrayOfTrucks = [...mapOfTrucks[2]];
    else if (rest <= 5000) arrayOfTrucks = [...mapOfTrucks[3]];
    else if (rest <= 6000) arrayOfTrucks = [...mapOfTrucks[4]];
    else if (rest <= 8000) arrayOfTrucks = [...mapOfTrucks[5]];
    else if (rest <= 9000) arrayOfTrucks = [...mapOfTrucks[6]];
    else if (rest <= 10000) arrayOfTrucks = [...mapOfTrucks[7]];
    arrayOfTrucks[2] += Math.floor(totalWeight/10000);

    return arrayOfTrucks;
}

// DISPLAY FINAL INFORMATION
function displayinfo(cities, tableInputs) {
    // cleans current display
    if (displayLog_stages.innerHTML !== ''){
        removeElements(displayLog_stages);
        removeElements(displayLogs_Costs);
    }

    section3_logDelivery.removeAttribute('hidden');
    // for every city - 1, create a new div

    let totalPrice = 0;
    for (let i = 0; i < cities.length; i++){
        // create div for current stage
        const stage = document.createElement('div');
        stage.className='displayStage';
        stage.id = `stage${i+1}`;

        // title for current stage
        let h4 = document.createElement('h4');
        h4.innerHTML = `Etapa ${i+1}:`
        stage.appendChild(h4);

        // display path
        let p = document.createElement('p');
        p.innerHTML = `Trajeto: ${cargoInformation[i].origin} -> ${cargoInformation[i].destination}`;
        stage.appendChild(p);

        // display distance
        p = document.createElement('p');
        p.innerHTML = `Distância: ${cargoInformation[i].distance}Km`;
        stage.appendChild(p);

        // display all cargo AND cargo to deliver
        let p_cargo = document.createElement('p');
        p_cargo.innerHTML = 'Produtos Transportados:';
        let p_deliver = document.createElement('p');
        p_deliver.innerHTML = 'Produtos a descarregar:';
        for (let j = 0; j < cargoInformation[i].items.length; j++) {
            p_cargo.innerHTML += `<br>${cargoInformation[i].items[j].description} x ${cargoInformation[i].items[j].quantity}`;
            p_deliver.innerHTML += `<br>${cargoInformation[i].items[j].description} x ${cargoInformation[i].itemsToDeliver[j]}`
        }
        stage.appendChild(p_cargo);
        stage.appendChild(p_deliver);

        // display trucks
        p = document.createElement('p');
        p.innerHTML = "Caminhões indo até destino:"
        
        let currentPrice = 0;
        for (let k = 0; k < 3; k++){
            currentPrice = cargoInformation[i].trucks[k]*truckPrice[k]*cargoInformation[i].distance;
            p.innerHTML += `<br>${cargoInformation[i].trucks[k]} x ${truckName[k]} = R$${Intl.NumberFormat('pt-BR').format(currentPrice)}`
            totalPrice += currentPrice;
        }
        stage.insertAdjacentElement("beforeend", p);

        // save it to outer div
        displayLog_stages.insertAdjacentElement("beforeend", stage);
    }

    // FINAL COSTS

    let stage = document.createElement('div');
    stage.className='displayStage';

    let h4 = document.createElement('h4');
    h4.innerHTML = `CUSTO TOTAL DO TRANSPORTE: R$${Intl.NumberFormat('pt-BR').format(totalPrice)}`
    stage.insertAdjacentElement("beforeend", h4);
    let p = document.createElement('p');
    let aux = tableInputs.map(Number);
    p.innerHTML = `CUSTO UNITARIO MÉDIO: R$${Intl.NumberFormat('pt-BR').format(totalPrice/(aux.reduce((a,b) => a + b, 0).toFixed(2)))}`
    stage.insertAdjacentElement("beforeend", p);

    displayLogs_Costs.insertAdjacentElement(('afterbegin'), stage);

    return totalPrice;
}

// aux function to clean divs
function removeElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

// function that returns false in case user input is wrong and true if it's right
// 1. adding to variable sumQuantity the values of every column (related to same item, but different destinations)
// 2. checking if final value is the same as the total input by user
function checkTableInputs(items, n, cities) {
    let isCorrect = true; 

    if (n === 0) return false;

    let sumQuantity = Array(n).fill(0);
    
    // iterate through all items
    for (let i = 0; i < items.length; i++) {
        const userInputPerItem = document.querySelectorAll(`#${items[i].description}`);
        // iterate through all cities
        for (let j = 0; j < cities.length; j++)
        sumQuantity[i] += Number(userInputPerItem[j].value);
    }

    for (let i = 0; i < sumQuantity.length; i++) {
        const userInputPerItem = document.querySelectorAll(`#${items[i].description}`);
        if (sumQuantity[i] !== items[i].quantity) {
            userInputPerItem.forEach(x => x.style.backgroundColor = '#F0706A');
            isCorrect = false;
        } else {
            userInputPerItem.forEach(x => x.style.backgroundColor = 'white');
            isCorrect = true;
        }
    }

    return isCorrect;
}

export { logDelivery, checkTableInputs };