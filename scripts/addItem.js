// Coded by Matheus Suzin
// March, 2023

// Get elements from DOM
const userFormAddItem = document.getElementById('userFormAddItem');
const userAddedItems = document.getElementById('userAddedItems');

// globar variables
let items = [];

// Adding a form using bootstrap styling
// when submit button is pressed, will call function submitForm. Event is being passed to avoid screen scrolling and btnAddItem to unlock button after submission
// 1 - creates the form
// 2 - creates text elements of form
// 3 - creates user interface by inserting form into div userFormAddItem
// 4 - creates the submit button and adds it to div userFormAddItem
// 5 - returns an array containing an object with items information ({description, quantity, weight})
function addItem(btnAddItem) {
    let form = document.createElement('form');
    form.onsubmit = (event) => submitForm(event, btnAddItem);
    userFormAddItem.insertAdjacentElement('beforeend', form);

    // creates 3 divs -> type of item, weight of item and quantity of item
    for (let i = 0; i <= 2; i++){
        let div = document.createElement('div');
        div.className = 'form-group';
        let input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.id = `addItem${i}`;
        switch (i) {
            case 0: 
                input.placeholder = 'Descrição';
                input.maxLength = "15";
                // teste
                input.value='Banana'
                break;
            case 1:
                input.placeholder = 'Peso do item (Kg)';
                input.maxLength = "4";
                // teste
                input.value='1'
                break;
            case 2:
                input.placeholder = 'Quantidade (Unidades)';
                input.maxLength = "10";
                // teste
                input.value='500'
                break;
        }
        // insert the input into div
        div.insertAdjacentElement('afterbegin', input);
        // insert div into form tag
        form.appendChild(div);
        // insert form into final div
        userFormAddItem.appendChild(form);
    }

    // creates the button to submit the form
    let button = document.createElement('button');
    button.type = "submit";
    button.className = "btn btn-info";
    button.innerHTML = 'Inserir';
    form.insertAdjacentElement('beforeend', button);

    // returns all items
    return items;
}

// 1 - Checks if user input is correct -> 
// NOT CORRECT: shows an alert and returns false.
// CORRECT:  Clears the form from screen and displays information inside div userAddedItems
// 2 - Enables button to add item
// 3 - Creates the object containing items information and returns it to main function
function submitForm(event, btnAddItem) {
    const itemDescription = document.getElementById('addItem0').value;
    const itemWeight = document.getElementById('addItem1').value;
    const itemQuantity = document.getElementById('addItem2').value;


    // check valid input
    if (isNaN(itemWeight) && isNaN(itemQuantity)) {
        alert("Forneça valores válidos para o peso e a quantidade de itens");
        return false;
    } else if (itemWeight > 1000 || itemWeight < 0.5) {
        alert("O peso do item deve estar entre 0.5Kg e 1000Kg (1TON)");
        return false;
    } else if (itemQuantity*itemWeight > 1000000) { //1000TON
        alert("O peso máximo a ser transportado é de 1000TON");
        return false;
    }

    // Clean form and display information - description, weight, quantity and full weight
    while (userFormAddItem.firstChild) {
        userFormAddItem.removeChild(userFormAddItem.lastChild);
    }

    let pTag = document.createElement('p');
    pTag.innerHTML = `${itemQuantity} x ${itemDescription} = ${itemWeight*itemQuantity}Kg`;
    userAddedItems.appendChild(pTag);

    btnAddItem.disabled = false;

    event.preventDefault(); // prevent the default form submission behavior
    items.push({ 
        description: itemDescription, 
        quantity: itemQuantity, 
        weight: itemWeight
    });
}

export default addItem;