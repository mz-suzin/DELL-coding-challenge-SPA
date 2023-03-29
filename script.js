// Coded by Matheus Suzin
// March, 2023

// Import modules
import getData from "./scripts/getData.js";
import calculateSectionTwo from "./scripts/calculateSectionTwo.js";
import addItem from "./scripts/addItem.js";
import {generateRevision, getTableInputs} from "./scripts/generateRevision.js";
import {logDelivery, checkTableInputs} from "./scripts/logDelivery.js";
import saveToStatisticalData from "./scripts/saveToStatisticalData.js";

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
const btnAddItem = document.getElementById('btnAddItem');
const btnResetItems = document.getElementById('btnResetItems');
const btnGenerateRevision = document.getElementById('btnGenerateRevision');
const display_btnReset = document.getElementById('display_btnReset');
const display_btnConfirm = document.getElementById('display_btnConfirm');
const displayLog_btnSave = document.getElementById('displayLog_btnSave');

// divs
const userAddedCities = document.getElementById('userAddedCities');
const userAddedItems = document.getElementById('userAddedItems');
const section3_revision = document.querySelector('.section3_revision');

// section 3 table inputs
let section3_tableInputs = [];

// General variables declaration
const truckInfo = [
    'Caminhão Pequeno (Máx: 1 t.)',
    'Caminhão Médio (Máx: 4 t.)',
    'Caminhão Grande (Máx: 10 t.)'
];
let items = [];
let cities = [];
let originCity = '';
let tableInputsCleanedFlag = false;
let lastCargoInfo = [];
let totalCost = 0;



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

    // first the function cleans the table input data, only sending the .value.
    // flag checks if the cleaning action has already been performed, in case user clicks twice on btnConfirm
    display_btnConfirm.addEventListener('click', () => {
        section3_tableInputs = getTableInputs();
        if(!section3_tableInputs.length){
            alert('Quantidade de itens inválida');
            return false;
        }

        let n = section3_tableInputs.length/cities.length;
        if(!checkTableInputs(items, n, cities)){
            alert('Quantidade de itens inválida');
            return false;
        }

        [lastCargoInfo, totalCost] = logDelivery(section3_tableInputs, cities, originCity, items, data);
    })

    displayLog_btnSave.addEventListener('click', () => {
        saveToStatisticalData(lastCargoInfo, totalCost);
    })
})

// Populate city's drop-down list with cities names
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

// Populate truck's drop-down list with trucks modalities
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

// Create a drop-down element and then calls populateDropDownCities
function addDropDownCities(data) {
    let select = document.createElement('select');
    select.name = "city";
    select.id = "dropDownCities3";
    select.class = "dropDownCities";
    userAddedCities.insertAdjacentElement('beforeend', select);
    populateDropDownCities(select, data);
};

// Create a drop-down element and then calls populateDropDownTrucks
function removeDropDownCities() {
    while (userAddedCities.firstChild) {
        userAddedCities.removeChild(userAddedCities.lastChild);
    }
};

// Remove every item added to user's list and from items array
function removeItems() {
    while (userAddedItems.firstChild) {
        userAddedItems.removeChild(userAddedItems.lastChild);
        items.pop();
    }
}

// Event Listeners
btnResetCities.addEventListener('click', removeDropDownCities);
btnResetItems.addEventListener('click', removeItems);

// ADD ITEMS
btnAddItem.addEventListener('click', () => {
    btnAddItem.disabled = true;
    items = addItem(btnAddItem);
});

// will generate the table for revision and return an array with item quantity per city and every destination city
btnGenerateRevision.addEventListener('click', () => {
    tableInputsCleanedFlag = false;
    section3_revision.removeAttribute('hidden');
    [cities, originCity] = generateRevision(items);
});

// clears user input inside table
display_btnReset.addEventListener('click', () => {
    section3_tableInputs.forEach(x => {x.value = ''});
})
