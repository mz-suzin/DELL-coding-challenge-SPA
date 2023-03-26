// Coded by Matheus Suzin
// March, 2023.

// Get elements from DOM
const display_originCity = document.getElementById('display_originCity');
const display_table = document.getElementById('display_table');
const userAddedItems = document.getElementById('userAddedItems');
const userAddedCities = document.getElementById('userAddedCities');
const originCity = document.getElementById('section3_originCity');

// This function will 
// 1 - check if user provided enough information to register transportation
// 2 - build user interface with a summary of the information provided
function generateSummary(items) {
    let cities = getDescendantElements(userAddedCities, 'select');

    if (!checkInput(cities, items, originCity)) return false;

    // removes everything from div
    removeElements(display_originCity);
    removeElements(display_table);

    // First div -> display origin city
    const pTag_Origin = document.createElement('p');
    pTag_Origin.innerHTML = `ORIGEM: ${originCity.value}`;
    const title = document.createElement('h4');
    title.innerHTML = 'RESUMO';
    display_originCity.appendChild(title);
    display_originCity.appendChild(pTag_Origin);

    // Second div -> create table
    const table = createTable(cities, items);
    display_table.appendChild(table);
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
    }
    return true;
}

// get array of descendant elements
function getDescendantElements(parent, tag) {
	return [].slice.call(parent.getElementsByTagName(tag));
}

function removeElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

function createTable(cities, items) {
    const tbl = document.createElement('table');

    // table header = Destino + Carga (carga should be colspan='nº of items')
    // second row = empty cell + ...item names
    // other rows = city + ...input for quantity
    // table rows = nº cities + 1
    // table columns = nº items + 1 
    console.log(cities);

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
            } else if (j === 0){ //destiny city
                let td = tr.insertCell();
                td.appendChild(document.createTextNode(`${cities[i-1].value}`));
            } else { //input cell
                let td = tr.insertCell();
                let input = document.createElement('input');
                input.placeholder = 'Quantidade';
                input.type = 'number';
                input.step = '50';
                td.appendChild(input);
            }
        }
    }
    tbl.insertAdjacentElement("beforeend", tbdy);

    return tbl;
}

export default generateSummary;