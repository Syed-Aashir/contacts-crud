const addForm = document.querySelector('#add-contact-form');
const addFormInputs = document.querySelectorAll('#add-contact-form input');
const contactsRenderList = document.querySelector('#contacts-list');
const searchInput = document.querySelector('#search-contact');
const orderSelectInput = document.querySelector('#order-select');
const filterSelectInput = document.querySelector('#filter-select');

var formInputs = {
  firstName: '',
  lastName: '',
  phoneNumber: null,
  emailAddress: '',
};
var contactList = [];

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
      `<h3 id= ${contact.id}>${contact.firstName} ${contact.lastName}</h3>`
    );
  });
}

// search Contact
searchInput.addEventListener('keyup', (e) => {
  const searchValue = e.target.value.toLowerCase();
  const filteredContacts = contactList.filter((contact) => {
    const firstName = contact.firstName?.toLowerCase();
    const lastName = contact.lastName?.toLowerCase();
    return firstName?.includes(searchValue) || lastName?.includes(searchValue);
  });
  renderList(filteredContacts);
});

// order Contacts
orderSelectInput.addEventListener('change', (e) => {
  const orderBy = Number(e.target.value);
  if (!orderBy) return;
  const sorted = contactList.sort(function (a, b) {
    if (a.firstName < b.firstName) {
      return orderBy;
    } else if (a.firstName > b.firstName) {
      return -1 * orderBy;
    }
    return 0;
  });
  renderList(sorted);
});

// filter Contacts
filterSelectInput.addEventListener('change', (e) => {
  const attributeName = e.target.value;
  if (!attributeName) return;
  const filteredContacts = contactList.filter((contact) => {
    const value = contact[attributeName];
    return (
      value !== null &&
      value !== '' &&
      !Number.isNaN(value) &&
      value !== undefined
    );
  });
  renderList(filteredContacts);
});

contactsRenderList.addEventListener('click', (e) => {
  let contactID = e.target.id;
  localStorage.setItem('allContacts', JSON.stringify(contactList));
  window.location.href = `contact.html?contact=${contactID}`;
});
