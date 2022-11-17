

const addForm = document.querySelector('#add-contact-form');
// console.log(addForm);
const addFormInputs = document.querySelectorAll('#add-contact-form input');
// console.log(addFormInputs);
const contactsList = document.querySelector('#contacts-list')


var formInputs = {
    firstName : '',
    lastName : '',
    phoneNumber : '',
    emailAddress : ''
}


let contactList = []

addFormInputs.forEach((input, index) => {
    // console.log(input)
    input.addEventListener('input', (e) =>{
        // console.log(e.target.name, e.target.value)
        const currentInput = e.target.name;
        formInputs[currentInput] = e.target.value;
    })
})

addForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    // console.log(formInputs)
    contactList = [...contactList, {...formInputs, id : contactList.length}]
    renderList(contactList)
})

function renderList(list=[]){
    contactList.innerHTML = ' ';
    list.forEach((contact) =>{
        contactsList.insertAdjacentHTML('afterbegin', `<h3 id= ${contact.id}>${contact.firstName} - ${contact.lastName}</h3>`)
    })
}

contactsList.addEventListener('click', (e) =>{
    console.log(e.target.id)
    let contactID = e.target.id;
    window.location.href = `addContact.html?contact=${contactID}`
})