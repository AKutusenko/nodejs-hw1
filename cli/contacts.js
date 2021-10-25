const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const PATH = path.join(__dirname, "db/contacts.json");

const readData = async () => {
  const result = await fs.readFile(PATH, "utf-8");
  return JSON.parse(result);
};
const writeData = async (data) => {
  const result = await fs.writeFile(PATH, JSON.stringify(data, null, 2));
  return JSON.stringify(result);
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const contacts = await readData();
  const result = contacts.filter((contact) => contact.id == contactId);
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await readData();
  const newContacts = contacts.filter((contact) => contact.id != contactId);
  await writeData(newContacts);
  return newContacts;
};

const addContact = async (name, email, phone) => {
  const contacts = await readData();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await writeData(contacts);
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
