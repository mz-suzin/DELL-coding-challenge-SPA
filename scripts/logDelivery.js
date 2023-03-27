// Coded by Matheus Suzin
// March, 2023.

// get DOM elements

// truck decision array - depends on weight
const mapTrucks = [
    [1,0,0], // 0 < kg <= 1000
    [2,0,0], // 1001 < kg <= 2000
    [0,1,0], // 2001 < kg <= 3000
    [0,1,0], // 3001 < kg <= 4000
    [1,1,0], // 4001 < kg <= 5000
    [2,1,0], // 5001 < kg <= 6000
    [0,2,0], // 6001 < kg <= 7000
    [0,2,0], // 7001 < kg <= 8000
    [0,0,1], // 8001 < kg <= 9000
    [0,0,1]  // 9001 < kg <= 10000
]

function logDelivery(tableInputs, cities, originCity, items) {
    // dividing tableInputs.length by cities.length I'll have nº of item types
    let itemTypes = tableInputs.length/cities.length;

    // tableInputs = ARRAY
    // cities = ARRAY
    // originCity = STRING
    // items = OBJECT - {description, quantity, weight}

    if(!checkTableInputs(tableInputs, items, itemTypes, cities)) return false;

    // define truck modalities
    let totalWeight = 0;
    let totalTrucks = [];
    

    items.forEach(item => {totalWeight += (item.weight*item.quantity)});
    let rest = totalWeight%10000;
    // lacking better resolution to this problem, I will brute force my way to it
    if (rest <= 1000) totalTrucks = [...mapTrucks[0]];
    else if (rest <= 2000) totalTrucks = [...mapTrucks[1]];
    else if (rest <= 3000) totalTrucks = [...mapTrucks[2]];
    else if (rest <= 4000) totalTrucks = [...mapTrucks[3]];
    else if (rest <= 5000) totalTrucks = [...mapTrucks[4]];
    else if (rest <= 6000) totalTrucks = [...mapTrucks[5]];
    else if (rest <= 7000) totalTrucks = [...mapTrucks[6]];
    else if (rest <= 8000) totalTrucks = [...mapTrucks[7]];
    else if (rest <= 9000) totalTrucks = [...mapTrucks[8]];
    else if (rest <= 10000) totalTrucks = [...mapTrucks[9]];

    console.log('rest',rest);
    console.log('total weigth', totalWeight, 'get truck', mapTrucks[rest]);
    totalTrucks[2] += Math.floor(totalWeight/10000);
    console.log(totalTrucks);
}

// function that returns false in case user input is wrong and true if it's right
// 1. adding to variable sumQuantity the values of every column (related to same item, but different destinations)
// 2. checking if final value is the same as the total input by user
function checkTableInputs(inputs, items, n, cities) {
    let isCorrect = true; 
    let sumQuantity = Array(n).fill(0);
    for (let i = 0; i < items.length; i++) {
        const userInputPerItem = document.querySelectorAll(`#${items[i].description}`);
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


export default logDelivery;