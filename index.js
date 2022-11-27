const contactsRenderList = document.querySelector('#contacts-list');
const searchInput = document.querySelector('#search-contact');
const orderSelectInput = document.querySelector('#order-select');
const filterSelectInput = document.querySelector('#filter-select');
const paginationWrapper = document.querySelector('#pagination-wrapper');

var paginationButtons = [];
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

    if (totalContacts > 5) {
      contactList = allContacts.slice(currentPage, pageSize);
      showPagination();
    } else {
      contactList = [...allContacts];
    }
  }
  renderList(contactList);
});

function renderList(list = []) {
  contactsRenderList.innerHTML = ' ';
  list.forEach((contact) => {
    contactsRenderList.insertAdjacentHTML(
      'beforeend',
      `<ul><li id='contactItem-${contact.id}'>${contact.firstName} - ${contact.lastName}</li></ul>`
    );
  });
}

// search Contact
searchInput.addEventListener('keyup', (e) => {
  const searchValue = e.target.value.toLowerCase();
  const filteredContacts = contactList.filter((contact) => {
    const firstName = contact.firstName.toLowerCase();
    const lastName = contact.lastName.toLowerCase();
    return firstName.includes(searchValue) || lastName.includes(searchValue);
  });
  renderList(filteredContacts);
});

// order Contacts
orderSelectInput.addEventListener('change', (e) => {
  const orderBy = Number(e.target.value);
  if (!orderBy) return;
  const sorted = contactList.sort(function (a, b) {
    if (a.firstName < b.firstName) {
      return orderBy * -1;
    } else if (a.firstName > b.firstName) {
      return orderBy;
    }
    return 0;
  });
  renderList(sorted);
});

// filter Contacts
filterSelectInput.addEventListener('change', (e) => {
  const attributeName = e.target.value;
  if (!attributeName) {
    renderList(contactList);
    return;
  }
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
  contactList = [...paginatedContacts];
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
