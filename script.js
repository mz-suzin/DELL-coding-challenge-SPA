// Coded by Matheus Suzin
// March, 2023

import getData from "./scripts/getData.js";

// ********* Main Code *********

getData().then(data => {

    // Finds every drop down list with class='dropDownCities' and fills it with the city's name
    let dropDownCities = document.querySelectorAll('.dropDownCities');
    dropDownCities.forEach(list => {
        for (let i = 0; i < data[0].length; i++) {
            let option = document.createElement('option');
            option.value = data[0][i];
            option.innerHTML = data[0][i];
            list.appendChild(option);
        }
    })

    let dropDownTrucks = document.querySelectorAll('.dropDownTrucks');
    let truckInfo = [
        'Caminhão Pequeno (1TON Max)',
        'Caminhão Médio (4TON Max)',
        'Caminhão Grande (10TON Max'
    ]
    dropDownTrucks.forEach(list => {
        for (let i = 0; i <= 2; i++) {
            let option = document.createElement('option');
            option.value = truckInfo[i];
            option.innerHTML = truckInfo[i];
            list.appendChild(option);
        }
    })
    
})