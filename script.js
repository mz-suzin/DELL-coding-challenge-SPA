// Coded by Matheus Suzin
// March, 2023

import getData from "./scripts/getData.js";

// ********* Main Code *********

getData().then(data => {

    let dropDownCities = document.getElementById('dropDownCities');

    for (let i = 0; i < data[0].length; i++) {
        let option = document.createElement('option');
        option.value = data[0][i];
        option.innerHTML = data[0][i];
        console.log(data[0][i]);
        dropDownCities.appendChild(option);
    }
})