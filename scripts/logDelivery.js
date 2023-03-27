// Coded by Matheus Suzin
// March, 2023.

// get DOM elements

function logDelivery(tableInputs, cities, originCity, items) {
    // dividing tableInputs.length by cities.length I'll have nº of item types
    let itemTypes = tableInputs.length/cities.length;

    // tableInputs = ARRAY
    // cities = ARRAY
    // originCity = STRING
    // items = OBJECT - {description, quantity, weight}

    checkTableInputs(tableInputs, items, itemTypes, cities);
}

function checkTableInputs(inputs, items, n, cities) {
    let sumQuantity = Array(n).fill(0);
    for (let i = 0; i <items.length; i++) {
        const userInputPerItem = document.querySelectorAll(`#${items[i].description}`);
        for (let j = 0; j < cities.length; j++)
        sumQuantity[i] += Number(userInputPerItem[j].value);
    }
    console.log(sumQuantity);

    // 
    // let aux = [];
    // // iterate through cities
    // for (let i = 0; i < cities.length; i++){
    //     aux = inputs.splice(-n);
    //     // iterate through items and adds up same items quantities
    //     for (let j = 0; j < n; j++) {
    //         sumQuantity[j] += Number(aux[j]);
    //     }
    // }
    // checks if the final value matches
}


export default logDelivery;