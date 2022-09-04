const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const updateContactsFile = async (data) => { await fs.writeFile(contactsPath, JSON.stringify(data));};

const listContacts = async () => { 
  const data = await fs.readFile(contactsPath);
  const parseData = JSON.parse(data);
  console.table(parseData);
  return parseData;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const parseData = JSON.parse(data);
  const selectedContact = parseData.find((contact) => contact.id == contactId);
  console.table(selectedContact);
  return selectedContact;
}

const removeContact = async (contactId) => {
  const data = await listContacts();
  const updatedContacts = data.filter((contact) => contact.id != contactId);
  await updateContactsFile(updatedContacts);
  console.table(updatedContacts);
  return updatedContacts;
}

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const addedContact = {
    id: `${data.length + 1}`,
    name,
    email,
    phone,
  };
  data.push(addedContact);
  await updateContactsFile(data);
  return listContacts();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};