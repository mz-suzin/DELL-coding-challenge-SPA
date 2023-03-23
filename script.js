// Coded by Matheus Suzin
// March, 2023

import getData from "./scripts/getData.js";
import calculateSectionTwo from "./scripts/calculateSectionTwo.js";

// Acquiring variables of elements in DOM
const dropDownTrucks = document.querySelectorAll('.dropDownTrucks');
const dropDownCities = document.querySelectorAll('.dropDownCities');
const sectionTwoBtnConfirm = document.getElementById('sectionTwoBtnConfirm');
const dropDownCities1 = document.getElementById('dropDownCities1');
const dropDownCities2 = document.getElementById('dropDownCities2');
const dropDownTrucks1 = document.getElementById('dropDownTrucks1');


// ********* Main Code *********

getData().then(data => {

    // Finds every drop down list with class='dropDownCities' and fills it with the city's name
    
    dropDownCities.forEach(list => {
        for (let i = 0; i < data[0].length; i++) {
            let option = document.createElement('option');
            option.value = data[0][i];
            option.innerHTML = data[0][i];
            list.appendChild(option);
        }
    })

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
    
    // Event Listeners
    sectionTwoBtnConfirm.addEventListener('click', function() {calculateSectionTwo(dropDownCities1.value, dropDownCities2.value, dropDownTrucks1.value, data)});
})


