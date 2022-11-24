const addForm = document.querySelector('#add-contact-form');
const addFormInputs = document.querySelectorAll('#add-contact-form input');
const contactsRenderList = document.querySelector('#contacts-list');
const searchInput = document.querySelector('#search-contact');
const orderSelectInput = document.querySelector('#order-select');
const filterSelectInput = document.querySelector('#filter-select');
const paginationWrapper = document.querySelector('#pagination-wrapper');

var paginationButtons = [];

var formInputs = {
  firstName: '',
  lastName: '',
  phoneNumber: null,
  emailAddress: '',
};
var allContacts = [];
var contactList = [];
var totalContacts = 0;
const pageSize = 5;
var currentPage = 0;

window.addEventListener('load', () => {
  const contacts = JSON.parse(localStorage.getItem('allContacts'));
  if (contacts) {
    allContacts = contacts.map((contact) => ({
      ...contact,
      phoneNumber: parseInt(contact.phoneNumber),
    }));
    totalContacts = allContacts.length;
    contactList = allContacts.slice(currentPage, pageSize);
    if (totalContacts > 5) {
      showPagination();
    }
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
  allContacts = [...allContacts, { ...formInputs, id: totalContacts + 1 }];
  localStorage.setItem('allContacts', JSON.stringify(allContacts));
  totalContacts = totalContacts + 1;
  if (totalContacts > 5) {
    contactList = allContacts.slice(0, pageSize);
    showPagination();
  } else {
    contactList = [...allContacts];
  }
  renderList(contactList);
  addForm.reset();
});

function renderList(list = []) {
  contactsRenderList.innerHTML = ' ';
  list.forEach((contact) => {
    contactsRenderList.insertAdjacentHTML(
      'beforeend',
      `<h3 id='contactItem-${contact.id}'>${contact.firstName} - ${contact.lastName}</h3>`
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

// pagination
function showPagination() {
  const pages = Math.ceil(totalContacts / pageSize);
  paginationWrapper.innerHTML = ' ';
  for (let p = 0; p < pages; p++) {
    paginationWrapper.insertAdjacentHTML(
      'beforeend',
      `<button id='page-${p + 1}'>${p + 1}</button>`
    );
  }
  paginationWrapper.classList.add('show');

  paginationButtons = document.querySelectorAll('#pagination-wrapper button');
  paginationButtons.forEach((pageButton) => {
    pageButton.addEventListener('click', handlePageChange);
  });
}

function handlePageChange(e) {
  const buttonId = e.target.id.split('-')[1];
  const page = Number(buttonId);
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  const paginatedContacts = allContacts.slice(start, end);
  renderList(paginatedContacts);
}

contactsRenderList.addEventListener('click', (e) => {
  let contactID = e.target.id;
  if (contactID.includes('contactItem')) {
    const id = contactID.split('-')[1];
    window.location.href = `contact.html?contact=${id}`;
  }
  // localStorage.setItem('allContacts', JSON.stringify(allContacts));
});
