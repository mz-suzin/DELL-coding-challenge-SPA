// Programa IT Academy – Processo Seletivo – Edição #18
// Coded by Matheus Suzin
// March, 2023

// Get elements from DOM
const display_originCity = document.getElementById('display_originCity');
const display_table = document.getElementById('display_table');
const userAddedCities = document.getElementById('userAddedCities');
const originCity = document.getElementById('section3_originCity');
const tableInputs = document.getElementsByClassName('tableInputs');

// This function will 
// 1 - check if user provided enough information to register transportation
// 2 - build user interface with a summary of the information provided
function generateRevision(items) {
    let cities = getDescendantElements(userAddedCities, 'select');

    if (!checkInput(cities, items, originCity)) return false;

    // removes everything from div
    removeElements(display_originCity);
    removeElements(display_table);

    // First div -> display origin city
    const title = document.createElement('h4');
    title.innerHTML = 'REVISÃO DE DADOS';
    const pTag_Origin = document.createElement('p');
    pTag_Origin.innerHTML = `ORIGEM: ${originCity.value}`;
    display_originCity.appendChild(title);
    display_originCity.appendChild(pTag_Origin);

    // Second div -> create table
    const table = createTable(cities, items);
    display_table.appendChild(table);

    return [cities, originCity.value];
}

// Checks if user provided enough information to register transportation
function checkInput(cities, items, origin) {
    if (!cities.length) {
        alert('Você deve fornecer pelo menos uma cidade de destino');
        return false;
    } else if (!items.length) {
        alert('Você deve fornecer pelo menos um item para transporte');
        return false
    } else if (!origin.value) {
        alert('Você deve fornecer a cidade de origem');
        return false;
    } else {
        for (let i = 0; i < cities.length; i++) {
            if (origin.value === cities[i]) {
                alert('A cidade de origem não pode ser a cidade de destino');
                return false;
            } else if (hasDuplicates(cities)) {
                alert('Você deve forncer cidades de destino distintas');
                return false;
            }
        }
    }
    return true;
}

// get array of descendant elements
function getDescendantElements(parent, tag) {
	let aux = [].slice.call(parent.getElementsByTagName(tag));
    let cities = [];
    for (let i = 0; i < aux.length; i++) {
        cities.push(aux[i].value);
    }
    return cities;
}

// check if destination array has the same city more than once;
// Set object stores unique values, so if the size of the object is different from length of array = duplicate
function hasDuplicates(arr) {
    return (new Set(arr)).size !== arr.length;
}

// aux function to clean divs
function removeElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

// MAIN FUNCTION FOR TABLE
// lots of DOM manipulations...
function createTable(cities, items) {
    const tbl = document.createElement('table');

    // table header = Destino + Carga (carga should be colspan='nº of items')
    // second row = empty cell + ...item names
    // other rows = city + ...input for quantity
    // table rows = nº cities + 1
    // table columns = nº items + 1 

    // HEADER
    const thd = document.createElement('thead')
    const tr = thd.insertRow();
    let th = document.createElement('th');
    th.appendChild(document.createTextNode('DESTINO'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.setAttribute('colSpan', `${items.length}`);
    th.appendChild(document.createTextNode('CARGA'));
    tr.appendChild(th);
    tbl.insertAdjacentElement("afterbegin", thd);

    // BODY
    const tbdy = document.createElement('tbody');
    for (let i = 0; i < cities.length + 1; i++){
        const tr = tbdy.insertRow();
        for (let j = 0; j < items.length + 1; j++) {
            if (i === 0 && j === 0) { //empty cell
                let td = tr.insertCell();
                td.appendChild(document.createTextNode(''));
                tr.appendChild(td)
            } else if (i === 0) { //item description row
                let td = tr.insertCell();
                td.appendChild(document.createTextNode(`${items[j-1].description} (Quant. ${items[j-1].quantity})`));
            } else if (j === 0){ //destination city
                let td = tr.insertCell();
                td.appendChild(document.createTextNode(`${cities[i-1]}`));
            } else { //input cell
                let td = tr.insertCell();
                let input = document.createElement('input');
                input.setAttribute('onclick', 'this.select()');
                input.className = 'tableInputs form-control';
                input.id = `${items[j-1].description}`
                input.value = 0;
                input.type = 'number';
                input.step = Math.ceil((items[j-1].quantity)/100);
                td.appendChild(input);
            }
        }
    }
    tbl.insertAdjacentElement("beforeend", tbdy);

    return tbl;
}

// get every element with class tableInputs and stores inside section3_tableInputs only the .values of those elements.
function getTableInputs() {
    let section3_tableInputs = document.querySelectorAll('.tableInputs');
    let aux = [];
    for (let i = 0; i < section3_tableInputs.length; i++) {
        aux.push(section3_tableInputs[i].value);
    }
    section3_tableInputs = aux;
    return section3_tableInputs;
}

export {generateRevision, getTableInputs};