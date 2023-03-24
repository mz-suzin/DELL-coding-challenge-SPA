// Coded by Matheus Suzin
// March, 2023

// Get elements from DOM
const userAddedItems = document.getElementById('userAddedItems');

// Adding a form using bootstrap styling
function addItem(btnAddItem) {
    let form = document.createElement('form');
    form.onsubmit = submitForm;
    userAddedItems.insertAdjacentElement('beforeend', form);
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
                break;
            case 1:
                input.placeholder = 'Peso do item (Kg)';
                break;
            case 2:
                input.placeholder = 'Quantidade';
                break;
        }
        div.insertAdjacentElement('afterbegin', input);

        form.appendChild(div);
        userAddedItems.appendChild(form);
    }
    let button = document.createElement('button');
    button.type = "submit";
    button.className = "btn btn-info";
    button.innerHTML = 'Inserir';
    form.insertAdjacentElement('beforeend', button);
}

function submitForm(event) {
    // this function should clean the form and display for the user the information he provided during the form submission.
    // It also has to store this indo somewhere
    console.log('submitted :)');
    event.preventDefault(); // prevent the default form submission behavior
    return false; // prevent the form from submitting normally

}

export default addItem;