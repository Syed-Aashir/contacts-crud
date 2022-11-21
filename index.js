const addForm = document.querySelector('#add-contact-form');
const addFormInputs = document.querySelectorAll('#add-contact-form input');
const contactsRenderList = document.querySelector('#contacts-list');

var formInputs = {
  firstName: '',
  lastName: '',
  phoneNumber: null,
  emailAddress: '',
};
let contactList = [];

window.addEventListener('load', () => {
  const allContacts = JSON.parse(localStorage.getItem('allContacts'));
  if (allContacts) {
    contactList = allContacts.map((contact) => ({
      ...contact,
      phoneNumber: parseInt(contact.phoneNumber),
    }));
  }
  renderList(contactList);
});

addFormInputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    const currentInput = e.target.name;
    formInputs[currentInput] = e.target.value;
  });
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  contactList = [...contactList, { ...formInputs, id: contactList.length }];
  renderList(contactList);
  localStorage.setItem('allContacts', JSON.stringify(contactList));
  addForm.reset();
});

function renderList(list = []) {
  contactsRenderList.innerHTML = ' ';
  list.forEach((contact) => {
    contactsRenderList.insertAdjacentHTML(
      'afterbegin',
      `<h3 id= ${contact.id}>${contact.firstName} - ${contact.lastName}</h3>`
    );
  });
}

contactsRenderList.addEventListener('click', (e) => {
  let contactID = e.target.id;
  localStorage.setItem('allContacts', JSON.stringify(contactList));
  window.location.href = `contact.html?contact=${contactID}`;
});
