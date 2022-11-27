const addForm = document.querySelector('#add-contact-form');
const addFormInputs = document.querySelectorAll('#add-contact-form input');

var formInputs = {
  firstName: '',
  lastName: '',
  phoneNumber: null,
  emailAddress: '',
};

var allContacts = [];

window.addEventListener('load', () => {
  const contacts = JSON.parse(localStorage.getItem('allContacts'));
  if (contacts) {
    allContacts = contacts.map((contact) => ({
      ...contact,
      phoneNumber: parseInt(contact.phoneNumber),
    }));
  }
});

addFormInputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    const currentInput = e.target.name;
    formInputs[currentInput] = e.target.value;
  });
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!formInputs.firstName || !formInputs.lastName) {
    return;
  }
  allContacts = [...allContacts, { ...formInputs, id: allContacts.length + 1 }];
  localStorage.setItem('allContacts', JSON.stringify(allContacts));
  addForm.reset();
  window.location.href = 'index.html';
});
