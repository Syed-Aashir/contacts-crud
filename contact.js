// get selected contact id from Url string
const params = new URL(window.location.href).searchParams;
const contactId = parseInt(params.get('contact'));

const contactDetailsForm = document.querySelector('.contactDetailsForm');
const detailsFormInputs = document.querySelectorAll(
  '.contactDetailsForm input'
);
const contactEditButton = document.querySelector('#contact-edit-btn');
const contactDeleteButton = document.querySelector('#delete-contact-btn');

var selectedContact = null;
var allContacts = [];
// get contact data from local storage
window.addEventListener('load', () => {
  allContacts = JSON.parse(localStorage.getItem('allContacts'));
  selectedContact = allContacts.find((contact) => contact.id === contactId);
  renderContactDetails(selectedContact);
});

// render initial values of contact
const renderContactDetails = (contactData) => {
  if (!contactData) return;
  detailsFormInputs.forEach((contactDetail, index) => {
    const detailName = contactDetail.getAttribute('name');
    contactDetail.setAttribute('value', contactData[detailName]);
  });
};

// listen to input change
detailsFormInputs.forEach((input, index) => {
  input.addEventListener('input', (e) => {
    const currentInput = e.target.name;
    selectedContact[currentInput] = e.target.value;
  });
});

// update contact
contactEditButton.addEventListener('click', (e) => {
  e.preventDefault();
  allContacts = allContacts.map((contact) =>
    contact.id === contactId ? { ...selectedContact } : contact
  );
  localStorage.setItem('allContacts', JSON.stringify(allContacts));
});

// delete contact
contactDeleteButton.addEventListener('click', (e) => {
  e.preventDefault();
  allContacts = allContacts.filter((contact) => contact.id !== contactId);
  localStorage.setItem('allContacts', JSON.stringify(allContacts));
  window.location.href = `index.html`;
});
