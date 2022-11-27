// get selected contact id from Url string
const params = new URL(window.location.href).searchParams;
const contactId = parseInt(params.get('contact'));

const contactWraper = document.querySelector('#contact-details-wrapper');
const editContactButton = document.querySelector('#edit-contact-button');

var selectedContact = null;
window.addEventListener('load', () => {
  const allContacts = JSON.parse(localStorage.getItem('allContacts'));
  selectedContact = allContacts.find((contact) => contact.id === contactId);
  renderContactDetails(selectedContact);
});

// render initial values of contact
const renderContactDetails = (contactData) => {
  if (!contactData) return;
  Object.entries(contactData).forEach(([key, value]) => {
    if (key === 'id') return;
    contactWraper.insertAdjacentHTML(
      'beforeend',
      `<p class='contact-${key}'>${value}</p>`
    );
  });
};

editContactButton.addEventListener('click', () => {
  window.location.href = `editContact.html?contact=${contactId}`;
});
