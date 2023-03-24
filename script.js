// Coded by Matheus Suzin
// March, 2023

// Import modules
import getData from "./scripts/getData.js";
import calculateSectionTwo from "./scripts/calculateSectionTwo.js";
import addItem from "./scripts/addItem.js";

// Get elements from DOM
// drop-down lists
const dropDownTrucks = document.querySelectorAll('.dropDownTrucks');
const dropDownCities = document.querySelectorAll('.dropDownCities');
const dropDownCities1 = document.getElementById('dropDownCities1');
const dropDownCities2 = document.getElementById('dropDownCities2');
const dropDownTrucks1 = document.getElementById('dropDownTrucks1');

// buttons
const sectionTwoBtnConfirm = document.getElementById('sectionTwoBtnConfirm');
const btnAddCity = document.getElementById('btnAddCity');
const btnResetCities = document.getElementById('btnResetCities');
const btnAddItem = document.getElementById('btnAddItem') ;

// divs
const userAddedCities = document.getElementById('userAddedCities');

// General variables declaration
const truckInfo = [
    'Caminhão Pequeno (1TON Max)',
    'Caminhão Médio (4TON Max)',
    'Caminhão Grande (10TON Max)'
];


// ********* Main Code *********

getData().then(data => {
    // Instantiation of section 2 - Drop-down lists for the cities
    dropDownCities.forEach(list => {
        populateDropDownCities(list, data);
    })

    // Instantiation of section 2 - Drop-down lists for the type of trucks
    dropDownTrucks.forEach(list => {
        populateDropDownTrucks(list)     
    })

    // Event Listeners
    sectionTwoBtnConfirm.addEventListener('click', () => {calculateSectionTwo(dropDownCities1.value, dropDownCities2.value, dropDownTrucks1.value, data)});
    btnAddCity.addEventListener('click', () => {addDropDownCities(data)});
})

function populateDropDownCities(list, data) {
    let option = document.createElement('option');
    option.selected = true;
    option.disabled = true;
    option.value = '';
    option.innerHTML = ' -- escolha uma opção -- ';
    list.appendChild(option);
    for (let i = 0; i < data[0].length; i++) {
        option = document.createElement('option');
        option.value = data[0][i];
        option.innerHTML = data[0][i];
        list.appendChild(option);
    }
}

function populateDropDownTrucks(list) {
    let option = document.createElement('option');
    option.selected = true;
    option.disabled = true;
    option.value = '';
    option.innerHTML = ' -- escolha uma opção -- ';
    list.appendChild(option);
    for (let i = 0; i <= 2; i++) {
        let option = document.createElement('option');
        option.value = truckInfo[i];
        option.innerHTML = truckInfo[i];
        list.appendChild(option);
    }
}

function addDropDownCities(data) {
    let select = document.createElement('select');
    select.name = "city";
    select.id = "dropDownCities3";
    select.class = "dropDownCities";
    userAddedCities.insertAdjacentElement('beforeend', select);
    populateDropDownCities(select, data);
};

function removeDropDownCities() {
    while (userAddedCities.firstChild) {
        userAddedCities.removeChild(userAddedCities.lastChild);
    }
};

// Event Listeners
btnResetCities.addEventListener('click', removeDropDownCities);
btnAddItem.addEventListener('click', () => {
    btnAddItem.disabled = true;
    addItem();
});